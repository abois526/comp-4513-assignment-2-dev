import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const About = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="navlink">About</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
          <DialogDescription>
            Information about this site.
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4 flex flex-col gap-4">
          <section>
            <h2 className="font-bold text-base mb-1">About This App</h2>
            <p className="leading-normal text-sm text-muted-foreground">
              This site was built as a single page application which allows you to explore a dataset of top Spotify songs from 2016-2019 in order to create custom playlists.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base mb-1">About Me</h2>
            <p className="leading-normal text-sm text-muted-foreground mb-2">
              Built by Andrew Boisvert as an assignment for COMP 4513 - Web III: Advanced Web Development at Mount Royal University.
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <a href="https://github.com/abois526/" target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a>
              <a href="https://www.linkedin.com/in/andrewboisvert/" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            </div>
          </section>

          <section>
            <h2 className="font-bold text-base mb-1">Data</h2>
            <p className="leading-normal text-sm text-muted-foreground">
              The dataset was provided by Randy Connolly for COMP 4513 at Mount Royal University. It includes information about the songs, genres, and artists, listing descriptive metrics for the songs such as those featured in the SPA (BPM, popularity, loudness, danceability, energy, speechiness, acousticness, liveness, and valence).
            </p>
          </section>

          <section>
            <h2 className="font-bold text-base mb-1">Features</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground flex flex-col gap-1">
              <li>Browse all songs with in-table sorting and filter the songs by title, year, artist, and genre.</li>
              <li>Explore individual artist and genre pages which share filtered song lists.</li>
              <li>View detailed information about individual songs, including a radar chart that provides detailed breakdowns of each song's descriptive metrics.</li>
              <li>Discover related songs based on similarity of each song's descriptive metrics.</li>
              <li>Create and manage playlists.</li>
              <li>Add songs to playlists from any page they are listed.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base mb-1">Tech Stack</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground flex flex-col gap-1">
              <li>React, TypeScript, & Vite</li>
              <li>Supabase (PostgreSQL) for database hosting</li>
              <li>shadcn/ui component library & Tailwind CSS</li>
              <li>TanStack React Table</li>
              <li>Spotify iFrame API for artist embeds</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-base mb-1">Development Repository</h2>
            <a href="https://github.com/abois526/comp-4516-assignment-2-dev" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
              github.com/abois526/comp-4516-assignment-2-dev
            </a>
          </section>
          
          <section>
            <h2 className="font-bold text-base mb-1">Content Attributions</h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground flex flex-col gap-1">
              <li>The logo for this site was custom designed using <a href="https://www.canva.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Canva</a></li>
              <li>Artist images were sourced from <a href="https://developer.spotify.com/documentation/web-api" target="_blank" rel="noopener noreferrer" className="hover:underline">Spotify</a> via the dataset.</li>
              <li>All other placeholder photos were sourced from <a href="https://picsum.photos/" target="_blank" rel="noopener noreferrer" className="hover:underline">Lorem Picsum</a>, which utilizes images from <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Unsplash</a> and <a href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Pexels</a> and are licensed to be used for free.</li>
              <li>All placeholder videos were sourced from <a href="https://www.pexels.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Pexels</a> and are licensed to be used for free.</li>
            </ul>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default About;