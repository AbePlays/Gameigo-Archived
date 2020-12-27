import React, { Component } from "react";
import GameCard from "../Trending/GameCard";
import { Game } from "../Trending/Trending";

interface Props {}

interface State {
  loading: boolean;
  query: string;
  results: Game[];
}

export default class Search extends Component<Props, State> {
  state = {
    loading: false,
    query: "",
    results: [],
  };

  getData = async (search: string) => {
    this.setState({
      loading: true,
      query: "",
    });
    const res = await fetch(`https://api.rawg.io/api/games?search=${search}`);
    const data = await res.json();
    this.setState({
      loading: false,
      results: data.results,
    });
  };

  handleSubmit = () => {
    const search = this.state.query.split(" ").join("-").toLowerCase();
    this.getData(search);
  };

  render() {
    return (
      <div className="max-w-screen-lg mx-auto py-6 px-4">
        <div className="relative">
          <svg
            className="w-4 absolute top-3 left-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            name="search"
            placeholder="Search Games"
            className="pl-10 h-10 w-full border-black border rounded-lg"
            value={this.state.query}
            onChange={(e) => {
              this.setState({
                query: e.target.value,
              });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                this.handleSubmit();
              }
            }}
          />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {this.state.results.map((item: Game) => (
            <GameCard key={item.id} game={item} />
          ))}
        </div>
      </div>
    );
  }
}
