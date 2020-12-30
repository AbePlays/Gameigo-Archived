import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import firebase from "./firebase/firebase";
import { getUserData } from "./firebase/functions";
import GameDetails from "./components/GameDetails";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Home from "./components/Home";
import Auth from "./components/Auth";
import Favorites from "./components/Favorites";
import About from "./components/About";
import { UserInfoState } from "./store/reducers/types";
import SetUserInfoAction from "./store/actions/SetUserInfo";
import RemoveUserInfoAction from "./store/actions/RemoveUserInfo";
import Spinner from "./components/Spinner";

const queryClient = new QueryClient();

export default function App() {
  const userId = useSelector(
    (state: { userInfo: UserInfoState }) => state.userInfo.uid
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("[APP] UEF");
    firebase.auth().onAuthStateChanged(async (user) => {
      console.log("[APP] onAuthStateChanged");
      setLoading(true);
      if (user) {
        const data = await getUserData(user.uid);
        if (data) {
          dispatch(
            SetUserInfoAction(data.email, user.uid, data.name, data.favorites)
          );
        } else {
          console.log("Error getting data from DB");
        }
      } else {
        dispatch(RemoveUserInfoAction());
      }
      setLoading(false);
    });
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Navbar />
        {loading ? (
          <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
            <div className="max-w-screen-lg mx-auto py-6 px-4">
              <Spinner />
            </div>
          </div>
        ) : (
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
            <Route path="/about" component={About} />
            <Route path="/:id" component={GameDetails} />
          </Switch>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}
