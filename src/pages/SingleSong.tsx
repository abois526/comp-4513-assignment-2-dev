/**
 * Page for individual songs. The browse view lets you link to this page for every song in the db. Features the artist's photo, information about the song, a radar chart that displays some of the song analytics, as well as a related artists section that displays 4 songs that feature the closest top 3 analytics to the displayed song that exist in the db. I had to utilize an rpc function in supabase to achieve the logic as it was pretty complex and PostgREST doesn't seem to like to let you do anything that is more than trivial, so I detailed what the SQL logic is above the data fetch.
 */

import CustomSpinner from '@/components/CustomSpinner';
import { ChartRadarDefault } from '@/components/radar-chart';
import SongCard from '@/components/SongCard';
import { Song } from '@/types/types';
import { supabase } from '@/utils/supabase';
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { AppContext } from '@/context/appContext';
import { Button } from '@/components/ui/button';
import { addSongToPlaylist } from "@/utils/crud";

const SingleSong = () => {
  const { songId } = useParams() as { songId: string };

  const { currentPlaylistId, currentPlaylistName, currentPlaylistCount, setCurrentPlaylistCount } = useContext(AppContext);
  const [song, setSong] = useState<Song | null>(null);
  const [relatedSongs, setRelatedSongs] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('songs')
      .select(
        `
        *,
        ...genres!inner(
          genre_name
        ),
        ...artists!inner(
          artist_name,
          artist_image_url
        )
        `,
      )
      .eq('song_id', parseInt(songId))
      .single()
      .then(({ data }) => {
        setSong(data);
        setIsLoading(false);
      });
  }, [songId]);

  const chartData = song ? [
    { stat: "danceability", value: song.danceability },
    { stat: "energy", value: song.energy },
    { stat: "speechiness", value: song.speechiness },
    { stat: "acousticness", value: song.acousticness },
    { stat: "liveness", value: song.liveness },
    { stat: "valence", value: song.valence }
  ] : [];


  /* 
  SQL Logic: 
  - basically takes the 3 top stat values for a given song and sums up the 3 absolute values of ((new song's stat val) - (this song's stat val)) to find the songs with the lowest variance of those stats
  - seems to work generally well, better for some songs than others
  - have to filter out same song b/c it always shows up (will have sum of 0), a little hacky but works fine
  */
  useEffect(() => {
    if (!song) return;
    const topStats = [...chartData].sort((a, b) => b.value - a.value);
    supabase
      .rpc(
        'top_songs_by_stats',
        { stat1: topStats[0].stat, stat2: topStats[1].stat, stat3: topStats[2].stat, val1: topStats[0].value, val2: topStats[1].value, val3: topStats[2].value }
      )
      .then(({ data }) => {
        // SQL logic pulls in the same song, this just removes it
        const filtered = data.filter((s: Song) => s.song_id !== parseInt(songId));
        setRelatedSongs(filtered);
      });
  }, [song]);

  const handleAddToPlaylist = async () => {
    if (!currentPlaylistId || !song) return
    await addSongToPlaylist(song.song_id, currentPlaylistId, currentPlaylistName, currentPlaylistCount, setCurrentPlaylistCount)
  }

  console.log(relatedSongs);


  return (
    <>
      {isLoading || !song ?
        <>
          <CustomSpinner />
        </> :
        <>
          <div className="flex flex-col gap-6 p-8">
            <h1 className="text-3xl font-bold text-center">{song.title}</h1>

            <div className="w-full px-4 sm:w-11/12 md:w-[87.5%] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 pl-10">
                  <h2 className="text-xl font-semibold">{song.artist_name}</h2>
                  <p className="text-muted-foreground">{song.year}</p>
                </div>
                <div className="max-w-xl mx-auto">
                  <img className="w-60 h-60 rounded-lg object-cover mx-auto" src={song.artist_image_url} alt={song.artist_name} />
                </div>
              </div>
            </div>

            <div className="w-full px-4 sm:w-11/12 md:w-[87.5%] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 pl-10">
                  <p>Genre: {song.genre_name}</p>
                  <p>BPM: {song.bpm}</p>
                  <p>Popularity: {song.popularity}</p>
                  <p>Loudness: {song.loudness}</p>
                  <span className={!currentPlaylistId ? "cursor-not-allowed w-fit" : "w-fit"}>
                    <Button className="w-fit mt-2" onClick={handleAddToPlaylist} disabled={!currentPlaylistId}>
                      Add to current playlist
                    </Button>
                  </span>
                </div>
                <div className="max-w-xl mx-auto w-full">
                  <ChartRadarDefault chartData={chartData} />
                </div>
              </div>
            </div>

            {/* Related songs */}
            <div className="w-full px-4 pt-6 sm:w-11/12 md:w-[87.5%] mx-auto pb-8">
              <h2 className="text-xl font-semibold my-6 mx-auto text-center">Related Songs</h2>
              <div className="grid grid-cols-4 gap-4">
                {relatedSongs.map((song) => {
                  return <SongCard key={song.song_id} name={song.artist_name} title={song.title} imgSrc={song.artist_image_url} artistId={song.song_id} />
                })}
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default SingleSong;