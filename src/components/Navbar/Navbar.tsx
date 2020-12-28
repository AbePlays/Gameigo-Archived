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
              <p
                className="ml-8 cursor-pointer"
                onClick={() => {
                  this.props.toggleDarkMode();
                }}
              >
                {this.props.isDark ? "Light Mode" : "Dark Mode"}
              </p>
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
                <div className="py-2" onClick={this.toggleDropDown}>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      this.props.toggleDarkMode();
                    }}
                  >
                    {this.props.isDark ? "Light Mode" : "Dark Mode"}
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
