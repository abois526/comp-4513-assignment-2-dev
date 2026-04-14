import CustomSpinner from '@/components/CustomSpinner';
import { TableData } from '@/types/types';
import { supabase } from '@/utils/supabase';
import { useEffect, useMemo, useState, useContext } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { AppContext } from "@/context/appContext";
import { addSongToPlaylist } from "@/utils/crud";

const SingleGenre = () => {
  const { genreName } = useParams() as { genreName: string };
  const { currentPlaylistId, currentPlaylistName, currentPlaylistCount, setCurrentPlaylistCount } = useContext(AppContext);

  const [tableData, setTableData] = useState<TableData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([genreName])

  useEffect(() => {
    const cachedData = localStorage.getItem("tableData");
    if (cachedData) {
      setTableData(JSON.parse(cachedData));
      setIsLoading(false);
      return;
    }
    supabase
      .from('songs')
      .select(
        `
        song_title:title,
        song_id,
        year,
        ...artists!inner(
          artist_name,
          artist_id
        ),
        ...genres!inner(
          genre_name,
          genre_id  
        )
        `,
      )
      .order('title')
      .then(({ data }) => {
        setTableData(data ?? []);
        localStorage.setItem("tableData", JSON.stringify(data));
        setIsLoading(false);
      });
  }, []);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const genreId = searchParams.get("genre");
    if (genreId) {
      const match = tableData.find(row => row.genre_id === Number(genreId));
      if (match) setSelectedGenres([match.genre_name]);
    }
  }, [tableData])

  const handleAddToPlaylist = async (songId: number) => {
    if (!currentPlaylistId) return
    await addSongToPlaylist(songId, currentPlaylistId, currentPlaylistName, currentPlaylistCount, setCurrentPlaylistCount)
  }

  const filteredData = useMemo(() => {
    return tableData.filter((row) => {
      if (selectedGenres.length && !selectedGenres.includes(row.genre_name)) {
        return false;
      }
      return true;
    })
  }, [tableData, selectedGenres])

  return (
    <>
      {isLoading ? 
        <>
          <CustomSpinner />
        </> :
        <>
          <div className="flex flex-col gap-6 p-8">
            <h1 className="text-3xl font-bold text-center">{genreName}</h1>

            <div className="w-full px-4 pt-6 sm:w-11/12 md:w-[87.5%] mx-auto overflow-x-auto pb-8">
              <DataTable columns={columns(handleAddToPlaylist)} data={filteredData} />
            </div>

          </div>
        </>
      }
    </>
  );
};

export default SingleGenre;