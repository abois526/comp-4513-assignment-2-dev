/**
 * Home page of the site. Features a slightly larger hero video than the other pages and uses iFrame embeds from the Spotify API to feature top songs from different artists in the database. Unfortunately, not all of the songs here are featured in the database. This was more of an experimental feature because I really wanted to try to utilize the Spotify API somehow and I thought it was visually interesting. I used a popular shuffle algorithm to efficiently shuffle the artists, so it is seemingly random on every reload. 
 */

import HeroVideoLarge from "@/components/HeroVideoLarge";
import { supabase } from "@/utils/supabase";
import { Artist } from "@/types/types";
import { useState, useEffect } from "react";

const Home = () => {

  const [artists, setArtists] = useState<Artist[]>([]);
  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedData = localStorage.getItem("artists");
    if (cachedData) {
      setArtists(JSON.parse(cachedData));
      setIsLoading(false);
      return;
    }
    supabase
      .from("artists")
      .select("*")
      .then(({ data }) => {
        setArtists(data || []);
        localStorage.setItem("artists", JSON.stringify(data));
        setIsLoading(false);
      });
  }, []);

  // using the Fisher-Yates shuffle algorithm 
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  function shuffleArray(array: Artist[]) {
    for (let i = array.length - 1; i >= 1; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    if (artists.length === 0) return;
    const shuffedArtists = shuffleArray([...artists]);
    setFeaturedArtists(shuffedArtists.slice(0, 6));
  }, [artists]);

  return (
    <>
      <HeroVideoLarge videoSrc="https://www.pexels.com/download/video/4043987/" title={"Spotify Playlist Maker"} subtitle={"Create the soundtrack for your next adventure."} />
      <h1 className="text-4xl font-bold text-center py-8">Featured Artists</h1>
      <div className="px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 pb-4">
        {featuredArtists.map(artist => {
          let insertIndex = 25; // index after https://open.spotify.com/
          let embedUrl = artist.spotify_url.slice(0, insertIndex) + "embed/" + artist.spotify_url.slice(insertIndex);
          return <iframe
            title={`Spotify Embed: ${artist.artist_name}`}
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ minHeight: '470px' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        })}
      </div>
    </>
  );
};

export default Home;