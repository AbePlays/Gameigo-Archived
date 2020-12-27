import React, { ReactElement } from "react";
import { useQuery } from "react-query";

import GameCard from "./GameCard";

export interface Game {
  name: string;
  playtime: number;
  released: string;
  background_image: string;
  rating: number;
  id: number;
  parent_platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
  genres: {
    id: number;
    name: string;
  }[];
  short_screenshots: {
    id: number;
    image: string;
  }[];
}

export default function Trending(): ReactElement {
  const getData = async () => {
    const res = await fetch(
      "https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added"
    );
    return res.json();
  };

  const { isLoading, error, data } = useQuery("games", getData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load data</p>;
  }

  const results: Game[] = [];
  for (const obj of data.results) {
    const game: Game = {
      name: obj.name,
      playtime: obj.playtime,
      released: obj.released,
      background_image: obj.background_image,
      rating: obj.rating,
      id: obj.id,
      parent_platforms: obj.parent_platforms,
      genres: obj.genres,
      short_screenshots: obj.short_screenshots,
    };
    results.push(game);
  }

  return (
    <div className="dark:bg-black dark:text-white min-h-screen">
      <div className="max-w-screen-lg mx-auto py-6 px-4">
        <h1 className="font-bold text-6xl">New and trending</h1>
        <p className="font-normal my-3">
          Based on player counts and release date
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((game: Game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
