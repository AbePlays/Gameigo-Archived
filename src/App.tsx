import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import GameDetails from "./components/GameDetails";
import Navbar from "./components/Navbar";
import Trending from "./components/Trending";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Trending} exact />
          <Route path="/:id" component={GameDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
