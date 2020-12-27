import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="shadow">
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
          </div>
        </div>
      </div>
    );
  }
}
