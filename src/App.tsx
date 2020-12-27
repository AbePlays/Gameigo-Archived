import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import GameDetails from "./components/GameDetails";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Trending from "./components/Trending";
import RootReducer from "./store/reducers";

const store = createStore(RootReducer);
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route path="/" component={Trending} exact />
            <Route path="/search" component={Search} />
            <Route path="/:id" component={GameDetails} />
          </Switch>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
