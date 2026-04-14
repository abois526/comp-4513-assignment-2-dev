export interface Artist {
  artist_id: number;
  artist_name: string;
  artist_type_id: number;
  artist_image_url: string;
  spotify_url: string;
  spotify_desc: string;
}

export interface Genre {
  genre_id: number;
  genre_name: string;
}

export interface Playlist {
  id: number;
  playlist_id: number;
  song_id: number;
  playlist_name: string;
}

export interface Song {
  song_id: number;
  title: string;
  artist_id: number;
  genre_id: number;
  year: number;
  bpm: number;
  energy: number;
  danceability: number;
  loudness: number;
  liveness: number;
  valence: number;
  duration: number;
  acousticness: number;
  speechiness: number;
  popularity: number;
  genre_name: string;
  artist_name: string;
  artist_image_url: string;
}

export interface TableData {
  song_title: string;
  song_id: number;
  artist_name: string;
  artist_id: number;
  genre_name: string;
  genre_id: number;
  year: number;
}

export interface SingleArtist {
  artist_name: string;
  artist_image_url: string;
  spotify_desc: string;
  spotify_url: string;
  type_name: string;
}