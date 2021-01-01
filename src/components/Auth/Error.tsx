import React, { Component } from "react";

interface Props {
  errorHandler: (answer: string) => void;
}
interface State {}

export default class Error extends Component<Props, State> {
  state = {};

  render() {
    return (
      <div className="rounded overflow-hidden text-center transition duration-500">
        <div className="bg-red-500 text-white flex justify-center py-6">
          <svg
            className="w-12"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="py-6 px-2">
          <h1 className="font-bold text-lg">Oh snap!</h1>
          <p className="mt-4">
            Authentication Failed. Do you want to try again?
          </p>
          <div className="mt-6 text-white">
            <button
              className="py-2 px-12 rounded-full bg-red-500 hover:bg-red-400 transition duration-500"
              onClick={() => this.props.errorHandler("NO")}
            >
              No
            </button>
            <button
              className="py-2 px-12 rounded-full bg-green-500 ml-6 hover:bg-green-400 transition duration-500"
              onClick={() => this.props.errorHandler("YES")}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
}
