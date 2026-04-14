import { createContext, useState } from "react"

interface AppContext {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentPlaylistCount: number;
  setCurrentPlaylistCount: (value: number) => void;
  currentPlaylistId: number | null;
  setCurrentPlaylistId: (value: number | null) => void;
  currentPlaylistName: string | null;
  setCurrentPlaylistName: (value: string | null) => void;
}

export const AppContext = createContext<AppContext>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  currentPlaylistCount: 0,
  setCurrentPlaylistCount: () => {},
  currentPlaylistId: null,
  setCurrentPlaylistId: () => {},
  currentPlaylistName: null,
  setCurrentPlaylistName: () => {},
});

const AppContextProvider = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPlaylistCount, setCurrentPlaylistCount] = useState(0);
  const [currentPlaylistId, setCurrentPlaylistId] = useState<number | null>(null);
  const [currentPlaylistName, setCurrentPlaylistName] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, currentPlaylistCount, setCurrentPlaylistCount, currentPlaylistId, setCurrentPlaylistId, currentPlaylistName, setCurrentPlaylistName }}>
      {props.children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;