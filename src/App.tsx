import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GameDetails from "./components/GameDetails";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Trending from "./components/Trending";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" component={Trending} exact />
          <Route path="/search" component={Search} />
          <Route path="/:id" component={GameDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
