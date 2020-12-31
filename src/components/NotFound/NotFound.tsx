import React, { ReactElement } from "react";
import { useHistory } from "react-router-dom";

import Wrapper from "../Wrapper";
import errorImage from "../../assets/error.png";

export default function NotFound(): ReactElement {
  const history = useHistory();

  return (
    <Wrapper>
      <div className="max-w-xl mx-auto">
        <img src={errorImage} alt="Error" />
      </div>
      <div className="text-center my-6">
        <h1 className="font-black text-xl">Something went wrong</h1>
        <p className="mt-4">
          The page you're looking for was moved, removed, renamed or might have
          never existed.
        </p>
        <div
          className="rounded-full mt-4 bg-black dark:bg-white text-white dark:text-black w-9 h-9 flex justify-center items-center mx-auto transform -rotate-45 hover:-rotate-90 transition cursor-pointer"
          onClick={() => {
            history.goBack();
          }}
        >
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
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </div>
      </div>
    </Wrapper>
  );
}
