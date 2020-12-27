import { Searching } from "../actions/types";
import { SearchState } from "./types";

const initialState: SearchState = {
  loading: false,
  searchResults: [],
};

const SearchReducer = (state = initialState, action: Searching) => {
  console.log("[SearchReducer]");
  switch (action.type) {
    case "SEARCHING":
      return {
        loading: !state.loading,
        searchResults: [],
      };
    case "LOAD_RESULTS":
      return {
        loading: false,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};

export default SearchReducer;
