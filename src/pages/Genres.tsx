import { supabase } from "@/utils/supabase";
import { Genre } from "@/types/types";
import { useEffect, useState } from "react";
import HeroVideo from "@/components/HeroVideo";
import CustomSpinner from "@/components/CustomSpinner";
import GenreCard from "@/components/GenreCard";

const Genres = () => {

  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const cachedData = localStorage.getItem("genres");
    if (cachedData) {
      setGenres(JSON.parse(cachedData));
      setIsLoading(false);
      return;
    }
    supabase
      .from("genres")
      .select("*")
      .then(({ data }) => {
        setGenres(data ?? []);
        localStorage.setItem("genres", JSON.stringify(data));
        setIsLoading(false);
        console.log(data);
      });
  }, []);

  return (
    <>
      {isLoading ?
        <>
          <HeroVideo videoSrc="https://www.pexels.com/download/video/31752923/" title={"Genres"} subtitle={"Find your next obsession."} />
          <CustomSpinner />
        </> :
        <>
          <HeroVideo videoSrc="https://www.pexels.com/download/video/31752923/" title={"Genres"} subtitle={"Find your next obsession."} />
          <div className="px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-8 py-8">
            {genres.map(genre => {
              // kind of a hacky way of getting placeholder images, but works for now. maps genre_id to a picsum image id, skipping the first 5 because there was a dead link for one of them
              let url = `https://picsum.photos/id/${genre.genre_id + 5}/600/800`;
              return <GenreCard key={genre.genre_id} imgSrc={url}
              name={genre.genre_name} genreId={genre.genre_id}/>
            })}
          </div>
        </>
      }
    </>
  );
};

export default Genres;