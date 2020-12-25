import React, { Component } from "react";

interface Props {}

interface State {
  query: string;
}

export default class Navbar extends Component<Props, State> {
  state = {
    query: "",
  };

  handleSubmit = () => {
    console.log("Handling Submit");
    this.setState({ query: "" });
  };

  render() {
    return (
      <div className="flex justify-between items-center py-4 px-16 shadow">
        <h1>Logo</h1>
        <div className="relative w-1/3 ">
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
            className="pl-10 h-10 w-full border-black border rounded-lg"
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
        <p className="uppercase">Log in</p>
      </div>
    );
  }
}
