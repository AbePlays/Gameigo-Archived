import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import { Game } from "./Trending";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props): ReactElement {
  let genres: string[] = [];
  game.genres.forEach((genre) => genres.push(genre.name));

  const formatDate = (releasedDate: string): string => {
    const date = new Date(releasedDate).toDateString();
    let arr = date.split(" ");
    return arr[1] + " " + arr[2] + ", " + arr[3];
  };

  return (
    <Link
      to={{
        pathname: `/${game.id}`,
        state: game.short_screenshots,
      }}
    >
      <div className="shadow-lg rounded-lg cursor-pointer">
        <div className="h-64">
          <img
            className="w-full h-full rounded-t-lg object-cover "
            src={game.background_image}
            alt="game-background"
          />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold">{game.name}</h1>
          <p className="font-light text-sm my-2 tracking-wider">
            Release Date: {formatDate(game.released)}
          </p>
          <p className="font-light text-sm my-2 tracking-wider">
            Genres: {genres.join(", ")}
          </p>
        </div>
      </div>
    </Link>
  );
}
