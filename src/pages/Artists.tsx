/**
 * Page for listing all of the artists. Features a video hero section and then uses ArtistCard components displayed in a grid to link to the Browse page, filtered to feature that particular artist.
 */

import { supabase } from "@/utils/supabase";
import { Artist } from "@/types/types";
import { useEffect, useState } from "react";
import HeroVideo from "@/components/HeroVideo";
import CustomSpinner from "@/components/CustomSpinner";
import ArtistCard from "@/components/ArtistCard";

const Artists = () => {

  const [artists, setArtists] = useState<Artist[]>([]);
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
        setArtists(data ?? []);
        localStorage.setItem("artists", JSON.stringify(data));
        setIsLoading(false);
        console.log(data);
      });
  }, []);

  return (
    <>
      {isLoading ?
        <>
          <HeroVideo videoSrc="https://www.pexels.com/download/video/3895039/" title={"Artists"} subtitle={"The stars behind your favourite songs."} />
          <CustomSpinner />
        </> :
        <>
          <HeroVideo videoSrc="https://www.pexels.com/download/video/3895039/" title={"Artists"} subtitle={"The stars behind your favourite songs."} />
          <div className="px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 py-8">
            {artists.map(artist => {
              return <ArtistCard key={artist.artist_id} 
              name={artist.artist_name} description={artist.spotify_desc} imageSrc={artist.artist_image_url} artistId={artist.artist_id}/>
            })}
          </div>
        </>
      }
    </>
  );
};

export default Artists;


