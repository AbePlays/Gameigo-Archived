import React, { Component } from "react";
import GameCard from "./GameCard";

interface Props {}

interface State {
  games: Game[];
}

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
}

export default class Trending extends Component<Props, State> {
  state = {
    games: [],
  };

  async componentDidMount() {
    console.log("[Trending] CDM");
    const res = await fetch(
      "https://api.rawg.io/api/games?dates=2020-01-01,2020-12-31&ordering=-added"
    );
    const data = await res.json();
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
      };
      results.push(game);
    }
    this.setState({
      games: results,
    });
  }

  render() {
    return (
      <div className="mx-32 my-6">
        <h1 className="font-bold text-6xl">New and trending</h1>
        <p className="font-light my-4">
          Based on player counts and release date
        </p>
        <div className="grid grid-cols-3 gap-4">
          {this.state.games.map((game: Game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    );
  }
}