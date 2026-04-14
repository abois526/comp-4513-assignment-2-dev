import CustomSpinner from "@/components/CustomSpinner";
import { DataTable } from "@/components/data-table";
import { PlaylistInfo, playlistsColumns, playlistSongColumns, PlaylistTableData } from "@/components/playlist-columns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppContext } from "@/context/appContext";
import { supabase } from "@/utils/supabase";
import { createPlaylist, deletePlaylist, removeSongFromPlaylist } from "@/utils/crud";
import { useContext, useEffect, useState } from "react";

const Playlists = () => {
  const { currentPlaylistId, setCurrentPlaylistId, currentPlaylistCount, setCurrentPlaylistCount, setCurrentPlaylistName } = useContext(AppContext);
  const [playlists, setPlaylists] = useState<PlaylistInfo[]>([]);
  const [playlistsSongs, setPlaylistsSongs] = useState<PlaylistTableData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(currentPlaylistId);
  const [newPlaylistName, setNewPlaylistName] = useState<string>("");

  useEffect(() => {
    supabase
      .from('asg2playlists')
      .select(`
        playlist_id,
        playlist_name,
        song_id,
        ...songs(
          song_title:title,
          year,
          ...artists(
            artist_name,
            artist_id
          ),
          ...genres(
            genre_name,
            genre_id
          )
        )
      `)
      .then(({ data }) => {
        const rows = data ?? [];
        setPlaylistsSongs(rows.filter(r => r.song_id !== null));

        const uniqueIds = [...new Set(rows.map(r => r.playlist_id))]
        const playlists = uniqueIds.map(id => ({
          playlist_id: id,
          playlist_name: rows.find(row => row.playlist_id === id).playlist_name,
          song_count: rows.filter(row => row.playlist_id === id && row.song_id !== null).length
        }))
        setPlaylists(playlists)
        setIsLoading(false)
      })
  }, [])

  const handleCreatePlaylist = async () => {
    if (!newPlaylistName.trim()) return
    let maxId = 0
    playlists.forEach(p => { if (p.playlist_id > maxId) maxId = p.playlist_id })
    const newId = maxId + 1
    await createPlaylist(newId, newPlaylistName)
    setPlaylists(prev => [...prev, { playlist_id: newId, playlist_name: newPlaylistName, song_count: 0 }])
    setNewPlaylistName("")
  }

  const handleSetCurrent = (playlistId: number) => {
    const playlist = playlists.find(p => p.playlist_id === playlistId)
    setCurrentPlaylistId(playlistId)
    setCurrentPlaylistName(playlist?.playlist_name ?? null)
    setCurrentPlaylistCount(playlist?.song_count ?? 0)
    setSelectedPlaylistId(playlistId)
  }

  const handleDelete = async (playlistId: number) => {
    await deletePlaylist(playlistId)

    setPlaylists(prev => prev.filter(p => p.playlist_id !== playlistId))
    setPlaylistsSongs(prev => prev.filter(s => s.playlist_id !== playlistId))
    if (currentPlaylistId === playlistId) {
      setCurrentPlaylistId(null)
      setCurrentPlaylistCount(0)
    }
    if (selectedPlaylistId === playlistId) {
      setSelectedPlaylistId(null)
    }
  }

  const handleRemoveSong = async (playlistId: number, songId: number) => {
    await removeSongFromPlaylist(playlistId, songId)

    setPlaylistsSongs(prev => prev.filter(s => !(s.playlist_id === playlistId && s.song_id === songId)))
    setPlaylists(prev => prev.map(p => p.playlist_id === playlistId ? { ...p, song_count: p.song_count - 1 } : p))
    if (currentPlaylistId === playlistId) {
      setCurrentPlaylistCount(currentPlaylistCount - 1)
    }
  }

  return (
    <>
      {isLoading
        ? <>
          <CustomSpinner />
        </>
        : <>
          <div className="w-full px-4 pt-6 sm:w-11/12 md:w-[87.5%] mx-auto pb-8">
            <h1 className="text-2xl font-bold mb-6">Playlists</h1>
            <div className="flex items-center gap-3 mb-6">
              <Label htmlFor="playlist-name">Playlist Name</Label>
              <Input
                id="playlist-name"
                type="text"
                placeholder="Enter playlist name"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-64"
              />
              <Button onClick={handleCreatePlaylist}>Create Playlist</Button>
            </div>
            <DataTable
              columns={playlistsColumns(handleSetCurrent, handleDelete)}
              data={playlists}
            />
            {selectedPlaylistId ? (
              <>
                <h2 className="text-xl font-bold mt-8 mb-4">
                  Songs in {playlists.find(p => p.playlist_id === selectedPlaylistId)?.playlist_name}
                </h2>
                <DataTable
                  columns={playlistSongColumns(handleRemoveSong)}
                  data={playlistsSongs.filter(s => s.playlist_id === selectedPlaylistId)}
                />
              </>
            ) : null}
          </div>
        </>
      }
    </>
  );
};

export default Playlists;