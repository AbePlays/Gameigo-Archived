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

interface State {
  isDropDownOpen: boolean;
}

interface ReduxState {
  darkMode: DarkModeState;
}

class Navbar extends Component<Props, State> {
  state = {
    isDropDownOpen: false,
  };

  toggleDropDown = () => {
    this.setState((prevState) => ({
      isDropDownOpen: !prevState.isDropDownOpen,
    }));
  };

  render() {
    return (
      <div className="shadow dark:bg-darkSecondary dark:text-white">
        <div className=" max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center">
            <NavLink to="/">
              <h1 className="tracking-widest">GAMEIGO</h1>
            </NavLink>
            <div className="sm:flex hidden">
              <NavLink to="/search">
                <p>Search</p>
              </NavLink>
              <NavLink to="/about" className="ml-8">
                <p>About</p>
              </NavLink>
              <NavLink to="/auth" className="ml-8">
                <p>Log in</p>
              </NavLink>
              <div className="flex items-center ml-8">
                <div>
                  <svg
                    className="w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div
                  className="ml-2 w-10 h-5 dark:bg-white bg-darkSecondary rounded-full relative cursor-pointer"
                  onClick={() => {
                    this.props.toggleDarkMode();
                  }}
                >
                  <div
                    className={`h-3 w-3 rounded-full bg-white dark:bg-darkSecondary absolute top-1 ${
                      this.props.isDark ? "right-1" : "left-1"
                    }`}
                  ></div>
                </div>
                <div className="ml-2">
                  <svg
                    className="w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div
              className="sm:hidden cursor-pointer"
              onClick={this.toggleDropDown}
            >
              {this.state.isDropDownOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </div>
          </div>
          {this.state.isDropDownOpen && (
            <div className="mt-2 px-4 py-2">
              <div className="divide-y">
                <div className="py-2" onClick={this.toggleDropDown}>
                  <NavLink to="/search">Search</NavLink>
                </div>
                <div className="py-2" onClick={this.toggleDropDown}>
                  <NavLink to="/about" className="">
                    About
                  </NavLink>
                </div>
                <div className="py-2" onClick={this.toggleDropDown}>
                  <NavLink to="/auth" className="">
                    Log in
                  </NavLink>
                </div>
                <div className="py-2">
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      this.props.toggleDarkMode();
                    }}
                  >
                    Toggle Dark Mode
                  </span>
                </div>
              </div>
            </div>
          )}
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
