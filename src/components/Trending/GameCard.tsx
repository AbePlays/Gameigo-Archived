import React, { ReactElement } from "react";

import { Game } from "./Trending";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props): ReactElement {
  let genres: string[] = [];
  game.genres.forEach((genre) => genres.push(genre.name));

  return (
    <div className="shadow-lg rounded-lg cursor-pointer">
      <div className="h-64">
        <img
          className="w-full h-full rounded-t-lg object-cover "
          src={game.background_image}
          alt="game-background"
        />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-bold">{game.name}</h1>
        <p className="font-light text-sm my-2">Release Date: {game.released}</p>
        <p className="font-light text-sm my-2">Genres: {genres.join(", ")}</p>
      </div>
    </div>
  );
}
