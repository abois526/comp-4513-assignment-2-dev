import { supabase } from "@/utils/supabase";
import { toast } from "sonner";

export const addSongToPlaylist = async (
  songId: number,
  currentPlaylistId: number,
  currentPlaylistName: string | null,
  currentPlaylistCount: number,
  setCurrentPlaylistCount: (value: number) => void
) => {
  const { error } = await supabase
    .from('asg2playlists')
    .insert({ playlist_id: currentPlaylistId, playlist_name: currentPlaylistName, song_id: songId })

  // avoids duplicate songs, added a constraint to the db
  if (error) return

  setCurrentPlaylistCount(currentPlaylistCount + 1)
  toast.success('Song added to playlist')
}

export const createPlaylist = async (
  playlistId: number,
  playlistName: string
) => {
  return await supabase
    .from('asg2playlists')
    .insert({ playlist_id: playlistId, playlist_name: playlistName, song_id: null })
}

export const deletePlaylist = async (
  playlistId: number
) => {
  return await supabase
    .from('asg2playlists')
    .delete()
    .eq('playlist_id', playlistId)
}

export const removeSongFromPlaylist = async (
  playlistId: number,
  songId: number
) => {
  return await supabase
    .from('asg2playlists')
    .delete()
    .eq('playlist_id', playlistId)
    .eq('song_id', songId)
}
