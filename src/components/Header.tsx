import {
  NavigationMenu,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link } from 'react-router';
import trackstackLogo from '@/assets/trackstack-no-bg.png';
import LoginDialog from "@/pages/LoginDialog";
import About from "@/pages/About";
import { AppContext } from "@/context/appContext";
import { useContext } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn, currentPlaylistCount } = useContext(AppContext);

  return (
    <header className="sticky top-0 z-50 bg-gray-400 text-raisin-black font-cinzel text-xl">
      <nav id="top-nav"
        className="grid grid-cols-1 md:grid-cols-[minmax(12rem,auto)_minmax(16rem,auto)_minmax(12rem,auto)] items-center min-h-16 py-2 md:py-0 px-4 md:px-0">
        <div className="flex justify-center">
          <Link to="/">
            <img className="w-auto h-14 cursor-pointer" src={trackstackLogo} alt="Cassette Tape Logo" />
          </Link>
        </div>
        <NavigationMenu className="w-full max-w-full flex-wrap justify-center md:justify-center">
          <NavigationMenuLink asChild><Link to="/">Home</Link></NavigationMenuLink>
          <NavigationMenuLink asChild><Link to="/artists">Artists</Link></NavigationMenuLink>
          <NavigationMenuLink asChild><Link to="/genres">Genres</Link></NavigationMenuLink>
          <NavigationMenuLink asChild><Link to="/browse">Browse</Link></NavigationMenuLink>
          {isLoggedIn
            ? <>
              <NavigationMenuLink asChild><Link to="/playlists">Playlists</Link></NavigationMenuLink>
            </>
            : <>
            </>}
          <About />
        </NavigationMenu>
        <LoginSection isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
        currentPlaylistCount={currentPlaylistCount} />
      </nav>
    </header>
  );
};



const LoginSection = (props: any) => {
  return (
    <div className="flex justify-center items-center gap-20 md:justify-end md:pr-6">
      {props.isLoggedIn ? (
        <>
          <Link to="/playlists" className="flex items-center gap-2 text-sm font-medium">
            Current Playlist
            <Badge>{props.currentPlaylistCount}</Badge>
          </Link>
          <Button variant="outline" onClick={() => props.setIsLoggedIn(false)}>Logout</Button>
        </>
      ) : (
        <LoginDialog />
      )}
    </div>
  );
};

export default Header;