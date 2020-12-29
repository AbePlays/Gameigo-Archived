import React, { Component } from "react";
import { connect } from "react-redux";

import { UserInfoSate } from "../../store/reducers/types";
import GameCard from "../Trending/GameCard";
import { Game } from "../Trending/Trending";

interface Props {
  favs: Game[];
}

interface State {}

interface ReduxState {
  userInfo: UserInfoSate;
}

class Favorites extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
        <div className="max-w-screen-lg mx-auto py-6 px-4">
          <h1 className="font-bold text-4xl sm:text-6xl">Favorites</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-3">
            {this.props.favs.map((game: Game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    favs: state.userInfo.favorites,
  };
};

export default connect(mapStateToProps)(Favorites);
