import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="flex justify-between items-center py-4 px-16 shadow">
        <NavLink to="/">
          <h1>Logo</h1>
        </NavLink>
        <div className="flex">
          <NavLink to="/search">
            <p>Search</p>
          </NavLink>
          <NavLink to="/auth" className="ml-4">
            <p>Log in</p>
          </NavLink>
        </div>
      </div>
    );
  }
}
