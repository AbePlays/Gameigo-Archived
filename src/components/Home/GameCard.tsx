import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

import { Game } from "./index";
import placeholder from "../../assets/placeholder.jpg";

interface Props {
  game: Game;
}

export default function GameCard({ game }: Props): ReactElement {
  let genres: string[] = [];
  game.genres.forEach((genre) => genres.push(genre.name));
  const [imageSource, setImageSource] = useState(placeholder);

  const formatDate = (releasedDate: string): string => {
    const date = new Date(releasedDate).toDateString();
    let arr = date.split(" ");
    return arr[1] + " " + arr[2] + ", " + arr[3];
  };

  return (
    <Link
      to={{
        pathname: `/game/${game.id}`,
        state: {
          game: game,
        },
      }}
    >
      <div className="shadow-lg rounded-xl cursor-pointer h-full overflow-hidden bg-white dark:bg-darkSecondary text-black dark:text-white transition-colors duration-500">
        <div className="h-64">
          <img
            onLoad={() => {
              setImageSource(game.background_image);
            }}
            loading="lazy"
            className="w-full h-full object-cover"
            src={imageSource}
            alt="game-background"
          />
        </div>
        <div className="p-4">
          <h1 className="text-2xl font-bold">{game.name}</h1>
          <div className="flex flex-wrap my-2">
            {game.parent_platforms.map((item) => {
              return (
                <span
                  key={item.platform.id}
                  className="px-2 py-1 my-1 mr-2 ml-0 bg-black dark:bg-white dark:text-black rounded-lg text-sm text-white"
                >
                  {item.platform.name}
                </span>
              );
            })}
          </div>
          <div className="divide-y">
            <p className="font-semibold text-sm py-2 tracking-wider">
              Release Date:
              <span className="font-light ml-2">
                {formatDate(game.released)}
              </span>
            </p>
            <p className="font-semibold text-sm py-2 tracking-wider">
              Genres:
              <span className="font-light ml-2">{genres.join(", ")}</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
