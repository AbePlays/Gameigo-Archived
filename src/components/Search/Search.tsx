import React, { Component } from "react";
import { RouteComponentProps } from "react-router";

import { Game, GameCard } from "../Home";
import Spinner from "../Spinner";
import Wrapper from "../Wrapper";

interface Props {}

interface State {
  loading: boolean;
  query: string;
  results: Game[];
}

class Search extends Component<Props & RouteComponentProps, State> {
  state = {
    loading: false,
    query: "",
    results: [],
  };

  componentDidMount() {
    if (this.props.history.action === "POP") {
      const savedData = localStorage.getItem("searchResults");
      if (savedData) {
        const res = JSON.parse(savedData);
        this.setState(res);
      }
    }
  }

  componentWillUnmount() {
    localStorage.setItem("searchResults", JSON.stringify(this.state));
  }

  getData = async (search: string) => {
    this.setState({
      loading: true,
    });
    const res = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&search=${search}`);
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
      <Wrapper>
        <div className="relative max-w-screen-sm mx-auto">
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
            className="pl-10 h-10 w-full rounded-lg dark:bg-darkSecondary shadow outline-none transition-colors duration-300"
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
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {this.state.results.map((item: Game) => (
              <GameCard key={item.id} game={item} />
            ))}
          </div>
        )}
      </Wrapper>
    );
  }
}

export default Search;
