import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMemoryHistory, createLocation } from "history";
import { match } from "react-router";
import "@testing-library/jest-dom";

import Search from "./Search";

const history = createMemoryHistory();
const path = `/search`;
const matchProps: match = {
  isExact: true,
  path,
  url: path,
  params: {},
};
const location = createLocation(matchProps.url);

describe("Testing Search.tsx Component", () => {
  test("Check if input exists", () => {
    render(<Search history={history} location={location} match={matchProps} />);

    const inputEl = screen.getByRole("textbox") as HTMLInputElement;
    expect(inputEl).toBeInTheDocument();
    expect(inputEl.value).toBe("");
  });

  test("Check if input is entered correctly", () => {
    render(<Search history={history} location={location} match={matchProps} />);

    const inputEl = screen.getByRole("textbox") as HTMLInputElement;
    const val: string = "Need For Speed";

    fireEvent.change(inputEl, { target: { value: val } });

    expect(inputEl.value).toBe(val);
  });

  test("Check if loading spinner shows up", () => {
    render(<Search history={history} location={location} match={matchProps} />);

    const inputEl = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.keyDown(inputEl, { key: "Enter", code: "Enter" });

    const loader = screen.getByTestId("spinner");
    expect(loader).toBeInTheDocument();
  });
});
