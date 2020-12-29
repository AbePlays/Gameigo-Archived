import React, { Component } from "react";
import { connect } from "react-redux";

import { UserInfoState } from "../../store/reducers/types";
import { Game, GameCard } from "../Home";

interface Props {
  favs: Game[];
}

interface State {}

interface ReduxState {
  userInfo: UserInfoState;
}

class Favorites extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
        <div className="max-w-screen-lg mx-auto py-6 px-4">
          <h1 className="font-bold text-4xl sm:text-6xl">Favorites</h1>
          {this.props.favs.length === 0 ? (
            <p className="text-center my-12 text-xl">No favorites found</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
              {this.props.favs.map((game: Game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          )}
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
