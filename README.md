# Spotify Playlist Maker React SPA
> A React SPA for a spotify playlist maker

**Live demo:** https://effervescent-pony-2b8fb3.netlify.app/

## Description
This site was built as a single page application which allows you to explore a dataset of top Spotify songs from 2016-2019 in order to create custom playlists.

## Features
- Browse all songs with in-table sorting and filter the songs by title, year, artist, and genre.
- Explore individual artist and genre pages which share filtered song lists.
- View detailed information about individual songs, including a radar chart that provides detailed breakdowns of each song's descriptive metrics.
- Discover related songs based on similarity of each song's descriptive metrics.
- Create and manage playlists.
- Add songs to playlists from any page they are listed.

## Tech Stack
- React, TypeScript, & Vite
- Supabase (PostgreSQL) for database hosting
- shadcn/ui component library & Tailwind CSS
- TanStack React Table
- Spotify iFrame API for artist embeds

## Content Attributions
- The logo for this site was custom designed using [Canva](https://www.canva.com/)
- Artist images were sourced from [Spotify](https://developer.spotify.com/documentation/web-api) via the dataset.
- All other placeholder photos were sourced from [Lorem Picsum](https://picsum.photos/), which utilizes images from [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/) and are licensed to be used for free.
- All placeholder videos were sourced from [Pexels](https://www.pexels.com/) and are licensed to be used for free.

## Roadmap of Future Work
- Implement a genuine user authentication system
- Extend the data table components so that they allow users to select multiple rows to add multiple songs to the playlist / delete multiple songs or playlists
- Add additional filters to the Browse page
- Further experimentation with utilizing iFrame and the Spotify Web API to see if I can source additional data and feature embeds for individual songs given that the playlists on the home view don't necessarily feature songs that are included on the site and is more for experimentation and presentation