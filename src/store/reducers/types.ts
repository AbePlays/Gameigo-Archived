import { Game } from "../../components/Trending/Trending";

export interface DarkModeState {
  isDark: boolean;
}

export interface UserInfoSate {
  email: string;
  name: string;
  uid: string;
  favorites: Game[];
}
