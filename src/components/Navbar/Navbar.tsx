import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dispatch } from "redux";

import { signout } from "../../firebase/functions";
import DarkModeAction from "../../store/actions/DarkMode";
import { DarkModeState, UserInfoState } from "../../store/reducers/types";

interface Props {
  isDark: boolean;
  userId: string;
  name: string;
  toggleDarkMode: () => void;
}

interface State {
  isDropDownOpen: boolean;
  isOptionsMenuOpen: boolean;
}

interface ReduxState {
  darkMode: DarkModeState;
  userInfo: UserInfoState;
}

class Navbar extends Component<Props, State> {
  state = {
    isDropDownOpen: false,
    isOptionsMenuOpen: false,
  };

  toggleDropDown = () => {
    this.setState((prevState) => ({
      isDropDownOpen: !prevState.isDropDownOpen,
    }));
  };

  toggleOptionsMenu = () => {
    this.setState((prevState) => ({
      isOptionsMenuOpen: !prevState.isOptionsMenuOpen,
    }));
  };

  closeWindow = () => {
    if (this.state.isDropDownOpen) {
      this.toggleDropDown();
    }

    if (this.state.isOptionsMenuOpen) {
      this.toggleOptionsMenu();
    }
  };

  render() {
    return (
      <div className="shadow dark:bg-darkSecondary dark:text-white bg-white text-black relative z-50 transition duration-500">
        <div className=" max-w-screen-xl mx-auto p-4">
          <div className="flex justify-between items-center text-black dark:text-white">
            <NavLink to="/" onClick={this.closeWindow}>
              <h1 className="tracking-widest">GAMEIGO</h1>
            </NavLink>
            <div className="sm:flex hidden">
              <NavLink
                to="/search"
                className="hover:text-gray-400 transition duration-500"
                onClick={this.closeWindow}
              >
                <p>Search</p>
              </NavLink>
              <NavLink
                to="/about"
                className="ml-8 hover:text-gray-400 transition duration-500"
                onClick={this.closeWindow}
              >
                <p>About</p>
              </NavLink>
              {this.props.userId ? (
                <div className="ml-8 flex items-center relative">
                  <p>Hi {this.props.name}</p>
                  {this.state.isOptionsMenuOpen && (
                    <div className="shadow bg-white dark:bg-darkSecondary absolute right-0 top-12 w-48 px-4 py-2 text-right divide-y">
                      <div className="py-2">
                        <NavLink
                          to="/favorites"
                          className="hover:text-gray-400 transition duration-500"
                          onClick={this.closeWindow}
                        >
                          <span>Favorites</span>
                        </NavLink>
                      </div>
                      <div className="py-2">
                        <span
                          className="cursor-pointer hover:text-gray-400 transition duration-500"
                          onClick={signout}
                        >
                          Log Out
                        </span>
                      </div>
                    </div>
                  )}
                  {this.state.isOptionsMenuOpen ? (
                    <svg
                      className="w-4 ml-2 cursor-pointer"
                      onClick={this.toggleOptionsMenu}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 ml-2 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      onClick={this.toggleOptionsMenu}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/auth"
                  className="ml-8 hover:text-gray-400 transition duration-500"
                >
                  <p>Log in</p>
                </NavLink>
              )}

              <div className="flex items-center ml-8">
                <svg
                  className="w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
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
                <svg
                  className="w-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
            </div>
            <div
              className="sm:hidden cursor-pointer"
              onClick={this.toggleDropDown}
            >
              {this.state.isDropDownOpen ? (
                <svg
                  className="w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </div>
          </div>
          <div
            className={`px-4 transition-all duration-500  ${
              this.state.isDropDownOpen
                ? "max-h-screen opacity-100 py-2 mt-2"
                : "max-h-0 opacity-0 invisible mt-0 py-0"
            }`}
          >
            {this.props.userId && (
              <div className="py-2 text-center">
                <p className="text-black dark:text-white">
                  Hi {this.props.name}
                </p>
              </div>
            )}
            <div className="divide-y text-black dark:text-white">
              <div className="py-2" onClick={this.toggleDropDown}>
                <NavLink
                  to="/search"
                  className="hover:text-gray-400 transition duration-500"
                >
                  Search
                </NavLink>
              </div>
              {this.props.userId && (
                <div className="py-2" onClick={this.toggleDropDown}>
                  <NavLink
                    to="/favorites"
                    className="hover:text-gray-400 transition duration-500"
                  >
                    Favorites
                  </NavLink>
                </div>
              )}
              <div className="py-2" onClick={this.toggleDropDown}>
                <NavLink
                  to="/about"
                  className="hover:text-gray-400 transition duration-500"
                >
                  About
                </NavLink>
              </div>
              <div className="py-2">
                {this.props.userId ? (
                  <span
                    className="cursor-pointer hover:text-gray-400 transition duration-500"
                    onClick={() => {
                      signout();
                      this.toggleDropDown();
                    }}
                  >
                    Sign Out
                  </span>
                ) : (
                  <NavLink
                    to="/auth"
                    className="hover:text-gray-400 transition duration-500"
                    onClick={this.toggleDropDown}
                  >
                    Log in
                  </NavLink>
                )}
              </div>

              <div className="py-2">
                <span
                  className="cursor-pointer hover:text-gray-400 transition duration-500"
                  onClick={() => {
                    this.props.toggleDarkMode();
                  }}
                >
                  Toggle Dark Mode
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    isDark: state.darkMode.isDark,
    userId: state.userInfo.uid,
    name: state.userInfo.name,
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
