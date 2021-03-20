import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import NotFound from "./NotFound";

describe("Testing NotFound.tsx Component", () => {
  test("Check if image exists", () => {
    render(<NotFound />);
    expect(screen.getByAltText("Error")).toBeInTheDocument();
  });

  // Test useHistory
});
