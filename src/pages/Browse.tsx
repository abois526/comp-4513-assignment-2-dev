/**
 * Page for the Browse view. One of the most important sections of the site that features a sidebar component, a filter section component, and a data table component. The sidebar lists all of the available filters and the data table features all of the songs in the database. When filters are selected in the sidebar component, buttons are created in the filter section that enable users to remove the filters and the data table is updated to reflect the current state of the filters. The data table is a customized shadcn/ui component that uses TanStack Table which offers a lot of really great features such as built-in sorting, etc. I was actually almost able to apply the filter logic using some of the built in functionality but managing state for it was a bit of a nightmare, so after spending a few hours aimlessly wandering down that rabbit-hole I decided to just implement the logic myself. All of the filter state lives in here so that it can be shared between the table and the sidebar component.
 */

import { AppSidebar } from "@/components/app-sidebar";
import CustomSpinner from "@/components/CustomSpinner";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TableData } from "@/types/types";
import { supabase } from "@/utils/supabase";
import { useEffect, useMemo, useState, useContext } from "react";
import { AppContext } from "@/context/appContext";
import { addSongToPlaylist } from "@/utils/crud";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";
import { X } from "lucide-react"

const Browse = () => {
  const { currentPlaylistId, currentPlaylistName, currentPlaylistCount, setCurrentPlaylistCount } = useContext(AppContext)
  const [tableData, setTableData] = useState<TableData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  // filters
  const [titleSearch, setTitleSearch] = useState<string>("")
  const [selectedArtists, setSelectedArtists] = useState<string[]>([])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [yearMin, setYearMin] = useState<number | undefined>(undefined)
  const [yearMax, setYearMax] = useState<number | undefined>(undefined)

  const filteredData = useMemo(() => {
    return tableData.filter((row) => {
      if (titleSearch && !row.song_title.toLowerCase().includes(titleSearch.toLowerCase())) {
        return false;
      }
      if (selectedArtists.length && !selectedArtists.includes(row.artist_name)) {
        return false;
      }
      if (selectedGenres.length && !selectedGenres.includes(row.genre_name)) {
        return false;
      }
      if (yearMin !== undefined && row.year < yearMin) {
        return false;
      }
      if (yearMax !== undefined && row.year > yearMax) {
        return false;
      }
      return true;
    })
  }, [tableData, titleSearch, selectedArtists, selectedGenres, yearMin, yearMax])

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

  const handleAddToPlaylist = async (songId: number) => {
    if (!currentPlaylistId) return
    await addSongToPlaylist(songId, currentPlaylistId, currentPlaylistName, currentPlaylistCount, setCurrentPlaylistCount)
  }

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const artistId = searchParams.get("artist");
    if (artistId) {
      const match = tableData.find(row => row.artist_id === Number(artistId));
      if (match) setSelectedArtists([match.artist_name]);
    }

    const genreId = searchParams.get("genre");
    if (genreId) {
      const match = tableData.find(row => row.genre_id === Number(genreId));
      if (match) setSelectedGenres([match.genre_name]);
    }
  }, [tableData])


  return (
    <>
      <SidebarProvider>
        <AppSidebar data={tableData}
          titleSearch={titleSearch} setTitleSearch={setTitleSearch}
          selectedArtists={selectedArtists} setSelectedArtists={setSelectedArtists}
          selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
          yearMin={yearMin} setYearMin={setYearMin}
          yearMax={yearMax} setYearMax={setYearMax} />
        <SidebarInset className="overflow-x-hidden">
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="mx-auto font-bold">Songs</h1>
          </header>
          {isLoading
            ? <>
              <CustomSpinner />
            </>
            : <>
              <FilterSection titleSearch={titleSearch} setTitleSearch={setTitleSearch}
                selectedArtists={selectedArtists} setSelectedArtists={setSelectedArtists}
                selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres}
                yearMin={yearMin} setYearMin={setYearMin}
                yearMax={yearMax} setYearMax={setYearMax}
              />
              <div className="w-full px-4 pt-6 sm:w-11/12 md:w-[87.5%] mx-auto overflow-x-auto pb-8">
                <DataTable columns={columns(handleAddToPlaylist)} data={filteredData} />
              </div>
            </>
          }
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default Browse;

const FilterSection = (props: any) => {

  if (!(props.titleSearch || props.selectedArtists.length || props.selectedGenres.length || props.yearMin !== undefined || props.yearMax !== undefined)) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 px-4 pt-6">
      {/* Clear all button */}
      <Button variant="outline" size="sm"
        onClick={() => {
          props.setTitleSearch("");
          props.setSelectedArtists([]);
          props.setSelectedGenres([]);
          props.setYearMin(undefined);
          props.setYearMax(undefined);
        }}>
        Clear all <X className="h-4 w-4" />
      </Button>
      {/* Clear search by song title */}
      {props.titleSearch !== ""
        ? (<Button variant="outline" size="sm" onClick={() => props.setTitleSearch("")}>
          Title: {props.titleSearch} <X className="h-4 w-4" />
        </Button>)
        : null
      }
      {/* Clear year(s) selection */}
      {/* welcome to nested ternary hell, enjoy your visit */}
      {/* trivial really, it's just (λp.λq.λr.λi.λj.λk.λl.p(qi(rjk))l) */}

      {/* condition: either year select has been filled */}
      {(props.yearMin !== undefined || props.yearMax !== undefined)
        // then, condition: only the first select has been filled
        ? (props.yearMax === undefined
          // then
          ? (<Button variant="outline" size="sm"
            onClick={() => {
              props.setYearMin(undefined);
            }}>
            Year: {props.yearMin} <X className="h-4 w-4" />
          </Button>)
          // else, condition: the years are the same
          : (props.yearMin === props.yearMax
            // then
            ? (<Button variant="outline" size="sm"
              onClick={() => {
                props.setYearMin(undefined);
                props.setYearMax(undefined);
              }}>
              Year: {props.yearMin} <X className="h-4 w-4" />
            </Button>)
            // else
            : (<Button variant="outline" size="sm"
              onClick={() => {
                props.setYearMin(undefined);
                props.setYearMax(undefined);
              }}>
              Year: {props.yearMin ?? "TBD"} to {props.yearMax ?? "TBD"} <X className="h-4 w-4" />
            </Button>)
          ))
        // else: both selects empty
        : null}
      {/* Clear by artist */}
      {props.selectedArtists.map((artist: string) => (
        <Button key={artist} variant="outline" size="sm"
          onClick={() => props.setSelectedArtists(props.selectedArtists.filter((e: string) => e !== artist))}>
          {artist} <X className="h-4 w-4" />
        </Button>
      ))}
      {/* Clear by genre */}
      {props.selectedGenres.map((genre: string) => (
        <Button key={genre} variant="outline" size="sm"
          onClick={() => props.setSelectedGenres(props.selectedGenres.filter((e: string) => e !== genre))}>
          {genre} <X className="h-4 w-4" />
        </Button>
      ))}
    </div>
  )
}