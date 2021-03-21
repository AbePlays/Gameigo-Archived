import { BrowserRouter, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./Home";

describe("Testing Home.tsx Component", () => {
  test("Check if spinner is loading", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    const loader = screen.getByTestId("spinner");
    expect(loader).toBeInTheDocument();
  });

  test("Check if data is rendered after fetching", async () => {
    window.fetch = jest.fn().mockImplementation(() => ({
      status: 200,
      json: () =>
        new Promise((resolve, reject) => {
          resolve({
            results: [
              {
                name: "Cyberpunk 2077",
                released: "2020-12-10",
                background_image:
                  "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
                id: 41494,
                parent_platforms: [
                  {
                    platform: {
                      id: 1,
                      name: "PC",
                      slug: "pc",
                    },
                  },
                  {
                    platform: {
                      id: 2,
                      name: "PlayStation",
                      slug: "playstation",
                    },
                  },
                ],
                genres: [
                  {
                    id: 3,
                    name: "Adventure",
                    slug: "adventure",
                  },
                  {
                    id: 4,
                    name: "Action",
                    slug: "action",
                  },
                ],
                short_screenshots: [
                  {
                    id: -1,
                    image:
                      "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
                  },
                  {
                    id: 779381,
                    image:
                      "https://media.rawg.io/media/screenshots/814/814c25d6fd1fd34a4e6dade645a3bda7.jpg",
                  },
                ],
              },
            ],
          });
        }),
    }));

    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Route path="/">
            <Home />
          </Route>
        </BrowserRouter>
      </QueryClientProvider>
    );

    const loader = screen.getByTestId("spinner");
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
      expect(screen.getByText("Cyberpunk 2077")).toBeInTheDocument();
    });
  });
});
