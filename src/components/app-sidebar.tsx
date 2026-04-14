/**
 * The sidebar for the browse view. useMemo is used for the filtering logic because it seemed like the most appropriate hook to use that would ensure rendering took place at appropriate intervals. Sets were used for unique values due to their definition of only permitting unique entries. Handlers are defined to help with filtering logic. All of the state setters are called here when they get interacted with. One of the larger components, but actually much smaller than the example component which is was built from. 
 */

import * as React from "react"
import { ChevronRightIcon } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TableData } from "@/types/types"
import { useMemo } from "react"

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  data: TableData[]
  titleSearch: string
  setTitleSearch: (artist: string) => void
  selectedArtists: string[]
  setSelectedArtists: (artists: string[]) => void
  selectedGenres: string[]
  setSelectedGenres: (genres: string[]) => void
  yearMin: number | undefined 
  setYearMin: (year: number | undefined) => void
  yearMax: number | undefined 
  setYearMax: (year: number | undefined) => void
}

export function AppSidebar({ data, titleSearch, setTitleSearch, selectedArtists, setSelectedArtists, selectedGenres, setSelectedGenres, yearMin, setYearMin, yearMax, setYearMax, ...props }: AppSidebarProps) {

  // sets remove dups and spread op converts to array
  const uniqueArtists = useMemo(() => {
    return [...new Set(data.map(e => e.artist_name))].sort();
  }, [data]);

  const uniqueGenres = useMemo(() => {
    return [...new Set(data.map(e => e.genre_name))].sort();
  }, [data]);

  const uniqueYears = useMemo(() => {
    return [...new Set(data.map(e => e.year))].sort();
  }, [data])

  const handleArtistFiltering = (artist: string, checked: boolean) => {
    setSelectedArtists(checked
      ? [...selectedArtists, artist]
      : selectedArtists.filter((e) => e !== artist))
  }

  const handleGenreFiltering = (genre: string, checked: boolean) => {
    setSelectedGenres(checked
      ? [...selectedGenres, genre]
      : selectedGenres.filter((e) => e !== genre))
  }

  return (
    <Sidebar {...props} className="top-16 h-[calc(100svh-4rem)]">
      <SidebarHeader className="px-4 py-3 font-semibold text-base">
        Filters
      </SidebarHeader>
      <SidebarContent className="gap-0">

        {/* Title Search */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <CollapsibleTrigger>
                Title
                <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 pb-2">
                <Input
                  type="text"
                  placeholder="Search by Song Title"
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Year Range */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <CollapsibleTrigger>
                Year
                <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 pb-2">
                <div className="flex gap-2">
                  {/* min year */}
                  <Select value={yearMin !== undefined ? String(yearMin) : ""}
                  onValueChange={(e) => setYearMin(e ? Number(e) : undefined)}>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueYears.filter(e => yearMax === undefined || e <= yearMax).map(year => (
                        <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* max year */}
                  <Select disabled={yearMin === undefined} 
                  value={yearMax !== undefined ? String(yearMax) : ""} 
                  onValueChange={(e) => setYearMax(e ? Number(e) : undefined)}>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueYears.filter(e => yearMin === undefined || e >= yearMin).map(year => (
                        <SelectItem key={year} value={String(year)}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {/* Don't really like this option but keeping the code for now if I want to switch back or something */}
                {/* <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder={yearRange[0].toString()}
                    value={yearMin ?? ""}
                    onChange={(e) => setYearMin(e.target.value ? Number(e.target.value) : undefined)}
                    min={yearRange[0]}
                    max={yearRange[1]}
                    />
                  <Input
                    type="number"
                    placeholder={yearRange[1].toString()}
                    value={yearMax ?? ""}
                    onChange={(e) => setYearMax(e.target.value ? Number(e.target.value) : undefined)}
                    min={yearRange[0]}
                    max={yearRange[1]}
                    />
                </div> */}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* Artist Filter */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <CollapsibleTrigger>
                Artist
                <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 pb-2 flex flex-col gap-2">
                {uniqueArtists.map((artist) => (
                  <div key={artist} className="flex items-center gap-2">
                    <Checkbox
                      id={`artist-${artist}`}
                      checked={selectedArtists.includes(artist)}
                      onCheckedChange={(checked) => handleArtistFiltering(artist, Boolean(checked))}
                    />
                    <Label htmlFor={`artist-${artist}`} className="font-normal truncate">
                      {artist}
                    </Label>
                  </div>
                ))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>


        {/* Genre Filter */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              <CollapsibleTrigger>
                Genre
                <ChevronRightIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent className="px-2 pb-2 flex flex-col gap-2">
                {uniqueGenres.map((genre) => (
                  <div key={genre} className="flex items-center gap-2">
                    <Checkbox
                      id={`genre-${genre}`}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={(checked) => handleGenreFiltering(genre, Boolean(checked))}
                    />
                    <Label htmlFor={`genre-${genre}`} className="font-normal truncate">
                      {genre}
                    </Label>
                  </div>
                ))}
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}