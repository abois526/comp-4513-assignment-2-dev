/**
 * Column definitions for all of the data tables that display song, artist, genre, year, and action info (the playlist data tables have their own definition).
 */

"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router"

export type TableSong = {
  song_title: string
  artist_name: string
  genre_name: string
  year: number
  song_id: number
  artist_id: number
}

export const columns = (onAddToPlaylist: (songId: number) => void): ColumnDef<TableSong>[] => [
  {
    accessorKey: "song_title",
    sortDescFirst: true,
    sortingFn: (rowA, rowB, columnId) => {
      const a = (rowA.getValue(columnId) as string).toLowerCase()
      const b = (rowB.getValue(columnId) as string).toLowerCase()
      return a < b ? -1 : a > b ? 1 : 0
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
        >Song Title <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Link to={`/browse/songs/${row.original.song_id}`} className="cursor-pointer hover:underline">
          {row.getValue("song_title")}
        </Link>
      )
    },
  },
  {
    accessorKey: "artist_name",
    sortingFn: (rowA, rowB, columnId) => {
      const a = (rowA.getValue(columnId) as string).toLowerCase()
      const b = (rowB.getValue(columnId) as string).toLowerCase()
      return a < b ? -1 : a > b ? 1 : 0
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
        >Artist Name <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Link to={`/browse/artists/${row.original.artist_name}`} className="cursor-pointer hover:underline">
          {row.getValue("artist_name")}
        </Link>
      )
    },
  },
  {
    accessorKey: "genre_name",
    sortingFn: (rowA, rowB, columnId) => {
      const a = (rowA.getValue(columnId) as string).toLowerCase()
      const b = (rowB.getValue(columnId) as string).toLowerCase()
      return a < b ? -1 : a > b ? 1 : 0
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
        >Genre Name <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Link to={`/browse/genres/${row.original.genre_name}`} className="cursor-pointer hover:underline">
          {row.getValue("genre_name")}
        </Link>
      )
    },
  },
  {
    accessorKey: "year",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
        >Year <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      )
    }
  },
  {
    id: "actions",
    header: () => {
      return (
        <h1>Actions</h1>
      )
    },
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* saving b/c this is pretty cool and might do something with it later */}
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
              >
              Copy payment ID
              </DropdownMenuItem> */}
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="cursor-pointer" onClick={() => onAddToPlaylist(row.original.song_id)}>
              Add to current playlist
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/browse/songs/${row.original.song_id}`} className="cursor-pointer">View song page</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/browse/artists/${row.original.artist_name}`} className="cursor-pointer">View artist page</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to={`/browse/genres/${row.original.genre_name}`} className="cursor-pointer">View genre page</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]