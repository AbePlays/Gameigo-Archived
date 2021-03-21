import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import RootReducer from "../../store/reducers";
import Navbar from "./Navbar";

describe("Testing Navbar.tsx Component", () => {
  test("Check if the navbar title exists", () => {
    render(
      <Provider store={createStore(RootReducer, applyMiddleware(thunk))}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const title = screen.getByText("GAMEIGO");
    expect(title).toBeInTheDocument();
  });

  test("Check if darkmode toggle works", () => {
    render(
      <Provider store={createStore(RootReducer, applyMiddleware(thunk))}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const toggle = screen.getByTestId("darkModeToggle");

    fireEvent.click(toggle);
    expect(toggle).toHaveStyle("background-color: '#1f1f1f'");

    fireEvent.click(toggle);
    expect(toggle).toHaveStyle("background-color: '#000'");
  });

  test("Check if navbar links works", () => {
    render(
      <Provider store={createStore(RootReducer, applyMiddleware(thunk))}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>
    );

    const searchLink = screen.getByTestId("searchLink");
    const aboutLink = screen.getByTestId("aboutLink");

    fireEvent.click(searchLink);
    expect(searchLink).toHaveAttribute("aria-current", "page");

    fireEvent.click(aboutLink);
    expect(searchLink).not.toHaveAttribute("aria-current", "page");
    expect(aboutLink).toHaveAttribute("aria-current", "page");
  });
});
