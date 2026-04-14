import './index.css';
import { Routes, Route, useLocation } from 'react-router';
import Home from './pages/Home';
import SingleArtist from './pages/SingleArtist';
import Header from './components/Header';
import Footer from './components/Footer';
import Artists from './pages/Artists';
import Genres from './pages/Genres';
import Browse from './pages/Browse';
import Playlists from './pages/Playlists';
import SingleGenre from './pages/SingleGenre';
import SingleSong from './pages/SingleSong';
import About from './pages/About';
import { useLayoutEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';

// Citation: https://medium.com/@caden0002/fixing-scroll-position-issues-in-react-router-scroll-to-top-on-navigation-86bcfbdfc9db
// ensures window scrolls to top when navigating to a new route 
const Wrapper = ({ children }: any) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return children;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Wrapper>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/browse/songs/:songId" element={<SingleSong />} />
            <Route path="/browse/artists/:artistName" element={<SingleArtist />} />
            <Route path="/browse/genres/:genreName" element={<SingleGenre />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Wrapper>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default App;
