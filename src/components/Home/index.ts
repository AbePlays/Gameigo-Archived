export { default } from "./Home";
export { default as GameCard } from "./GameCard";
export interface Game {
  name: string;
  playtime: number;
  released: string;
  background_image: string;
  rating: number;
  id: number;
  parent_platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
  genres: {
    id: number;
    name: string;
  }[];
  short_screenshots: {
    id: number;
    image: string;
  }[];
}
