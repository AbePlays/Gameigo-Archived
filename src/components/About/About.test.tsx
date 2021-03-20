import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import About from "./About";

describe("Testing About.tsx Component", () => {
  test("Checking if headlines exist", () => {
    render(<About />);
    expect(screen.getByText("Small and Crafty")).toBeInTheDocument();
    expect(screen.getByText("Creator")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("Check if socials exist", () => {
    render(<About />);
    const listElement = screen.getByRole("list");
    const listItems = screen.getAllByRole("listitem");

    expect(listElement).toBeInTheDocument();
    expect(listItems.length).toEqual(3);
  });
});
