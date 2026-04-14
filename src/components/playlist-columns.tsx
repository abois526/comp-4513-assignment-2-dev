/**
 * Column definitions for the playlist data tables on the playlists page (all of the other data tables use the definition for displaying song, artist, genre, year, and action info)
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

export interface PlaylistTableData {
  song_title: string;
  song_id: number;
  artist_name: string;
  artist_id: number;
  genre_name: string;
  genre_id: number;
  year: number;
  playlist_id: number;
  playlist_name: string;
}

export interface PlaylistInfo {
  playlist_id: number;
  playlist_name: string;
  song_count: number;
}

export const playlistSongColumns = (
  onPlaylistSongRemove: (playlistId: number, songId: number) => void
): ColumnDef<PlaylistTableData>[] => [
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
            <DropdownMenuItem className="cursor-pointer" 
            onClick={() => {
              onPlaylistSongRemove(row.original.playlist_id, row.original.song_id)
            }}>
              Remove from current playlist
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

export const playlistsColumns = (
  onSetPlaylistAsCurrent: (playlistId: number) => void,
  onDeletePlaylist: (playlistId: number) => void 
): ColumnDef<PlaylistInfo>[] => [
  {
    accessorKey: "playlist_name",
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
        >Playlist Name <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
      )
    },
    cell: ({ row }) => {
      return (
        <span
          className="cursor-pointer hover:underline"
          onClick={() => onSetPlaylistAsCurrent(row.original.playlist_id)}
        >
          {row.getValue("playlist_name")}
        </span>
      )
    },
  },
  {
    accessorKey: "song_count",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting()}
        ># of Songs <ArrowUpDown className="ml-2 h-4 w-4" /></Button>
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
            <DropdownMenuItem className="cursor-pointer" 
            onClick={() => {
              onSetPlaylistAsCurrent(row.original.playlist_id)
            }}>
              Set playlist as current
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" 
            onClick={() => {
              onDeletePlaylist(row.original.playlist_id)
            }}>
              Delete playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]