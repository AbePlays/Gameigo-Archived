import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dispatch } from "redux";

import DarkModeAction from "../../store/actions/DarkMode";
import { DarkModeState } from "../../store/reducers/types";

interface Props {
  toggleDarkMode: () => void;
  isDark: boolean;
}

interface ReduxState {
  darkMode: DarkModeState;
}

class Navbar extends Component<Props> {
  render() {
    return (
      <div className="shadow dark:bg-darkSecondary dark:text-white">
        <div className="flex justify-between items-center max-w-screen-xl mx-auto p-4">
          <NavLink to="/">
            <h1 className="tracking-widest">GAMEIGO</h1>
          </NavLink>
          <div className="flex">
            <NavLink to="/search">
              <p>Search</p>
            </NavLink>
            <NavLink to="/about" className="ml-4">
              <p>About</p>
            </NavLink>
            <NavLink to="/auth" className="ml-4">
              <p>Log in</p>
            </NavLink>
            <p
              className="ml-4 cursor-pointer"
              onClick={() => {
                this.props.toggleDarkMode();
              }}
            >
              {this.props.isDark ? "Light Mode" : "Dark Mode"}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    isDark: state.darkMode.isDark,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleDarkMode: () => {
      dispatch(DarkModeAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
