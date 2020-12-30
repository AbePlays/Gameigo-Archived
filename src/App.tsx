import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import GameDetails from "./components/GameDetails";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Favorites from "./components/Favorites";
import { UserInfoState } from "./store/reducers/types";

const queryClient = new QueryClient();

export default function App() {
  const userId = useSelector(
    (state: { userInfo: UserInfoState }) => state.userInfo.uid
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/search" component={Search} />
          <Route
            path="/auth"
            render={(props) =>
              userId ? <Redirect to="/" /> : <Auth {...props} />
            }
          />
          <Route
            path="/favorites"
            render={() => (userId ? <Favorites /> : <Redirect to="/" />)}
          />
          <Route path="/:id" component={GameDetails} />
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
