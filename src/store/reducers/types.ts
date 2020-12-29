import { Game } from "../../components/Trending/Trending";

export interface DarkModeState {
  isDark: boolean;
}

export interface UserInfoState {
  email: string;
  name: string;
  uid: string;
  favorites: Game[];
}
