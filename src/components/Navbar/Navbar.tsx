import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Dispatch } from "redux";

import firebase from "../../firebase/firebase";
import { getUserData, signout } from "../../firebase/functions";
import DarkModeAction from "../../store/actions/DarkMode";
import { DarkModeState, UserInfoState } from "../../store/reducers/types";
import SetUserInfoAction from "../../store/actions/SetUserInfo";
import RemoveUserInfoAction from "../../store/actions/RemoveUserInfo";
import { Game } from "../Home";

interface Props {
  isDark: boolean;
  userId: string;
  name: string;
  toggleDarkMode: () => void;
  setUserInfo: (
    email: string,
    uid: string,
    name: string,
    favorites: Game[]
  ) => void;
  removeUserInfo: () => void;
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

  componentDidMount() {
    console.log("[Navbar] CDM");
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          this.props.setUserInfo(
            data.email,
            user.uid,
            data.name,
            data.favorites
          );
        } else {
          console.log("Error getting data from DB");
        }
      } else {
        this.props.removeUserInfo();
      }
    });
  }

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
              {this.props.userId ? (
                <div className="ml-8 flex items-center relative">
                  <p>Hi {this.props.name}</p>
                  {this.state.isOptionsMenuOpen && (
                    <div className="shadow bg-white dark:bg-darkSecondary absolute right-0 top-12 w-48 px-4 py-2 text-right divide-y">
                      <div className="py-2">
                        <NavLink to="/favorites">
                          <span>Favorites</span>
                        </NavLink>
                      </div>
                      <div className="py-2">
                        <span className="cursor-pointer" onClick={signout}>
                          Log Out
                        </span>
                      </div>
                    </div>
                  )}
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
                </div>
              ) : (
                <NavLink to="/auth" className="ml-8">
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
          {this.state.isDropDownOpen && (
            <div className="mt-2 px-4 py-2">
              {this.props.userId && (
                <div className="py-2 text-center">
                  <p>Hi {this.props.name}</p>
                </div>
              )}
              <div className="divide-y">
                <div className="py-2" onClick={this.toggleDropDown}>
                  <NavLink to="/search">Search</NavLink>
                </div>
                {this.props.userId && (
                  <div className="py-2" onClick={this.toggleDropDown}>
                    <NavLink to="/favorites" className="">
                      Favorites
                    </NavLink>
                  </div>
                )}
                <div className="py-2" onClick={this.toggleDropDown}>
                  <NavLink to="/about" className="">
                    About
                  </NavLink>
                </div>
                <div className="py-2">
                  {this.props.userId ? (
                    <span className="cursor-pointer" onClick={signout}>
                      Sign Out
                    </span>
                  ) : (
                    <NavLink to="/auth" className="">
                      Log in
                    </NavLink>
                  )}
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
    userId: state.userInfo.uid,
    name: state.userInfo.name,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    toggleDarkMode: () => {
      dispatch(DarkModeAction());
    },
    setUserInfo: (
      email: string,
      uid: string,
      name: string,
      favorites: Game[]
    ) => {
      dispatch(SetUserInfoAction(email, uid, name, favorites));
    },
    removeUserInfo: () => {
      dispatch(RemoveUserInfoAction());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
