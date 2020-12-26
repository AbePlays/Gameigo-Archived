import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import GameDetails from "./components/GameDetails";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Trending from "./components/Trending";
import RootReducer from "./store/reducers";

const store = createStore(RootReducer);

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Trending} exact />
          <Route path="/search" component={Search} />
          <Route path="/:id" component={GameDetails} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
