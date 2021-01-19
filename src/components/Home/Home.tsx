import React, { ReactElement } from "react";
import { useQuery } from "react-query";

import Spinner from "../Spinner";
import Wrapper from "../Wrapper";
import { Game, GameCard } from "./index";

export default function Home(): ReactElement {
  const results: Game[] = [];

  const getData = async () => {
    const day = new Date();
    const [month, date, year] = day.toLocaleDateString("en-US").split("/");

    const endDate = `${year}-${month.length === 1 ? 0 + month : month}-${
      date.length === 1 ? 0 + date : date
    }`;

    day.setMonth(day.getMonth() - 12);
    const [newMonth, newDate, newYear] = day
      .toLocaleDateString("en-US")
      .split("/");

    const startDate = `${newYear}-${
      newMonth.length === 1 ? 0 + newMonth : newMonth
    }-${newDate.length === 1 ? 0 + newDate : newDate}`;

    try {
      const res = await fetch(
        `https://api.rawg.io/api/games?dates=${startDate},${endDate}&ordering=-added`
      );
      return res.json();
    } catch (e) {
      console.log(e);
    }
  };

  const { isLoading, error, data } = useQuery("games", getData);

  if (data) {
    for (const obj of data.results) {
      const game: Game = {
        name: obj.name,
        released: obj.released,
        background_image: obj.background_image,
        id: obj.id,
        parent_platforms: obj.parent_platforms,
        genres: obj.genres,
        short_screenshots: obj.short_screenshots,
      };
      results.push(game);
    }
  }

  return (
    <Wrapper>
      <h1 className="font-bold text-4xl sm:text-6xl">New and trending</h1>
      <p className="font-normal my-3">
        Based on player counts and release date
      </p>
      {isLoading && <Spinner />}
      {error && (
        <p className="text-white text-center py-8">Error while fetching data</p>
      )}
      {data && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((game: Game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </Wrapper>
  );
}
