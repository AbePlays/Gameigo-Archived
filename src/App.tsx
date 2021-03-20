import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import firebase from "./firebase/firebase";
import { getUserData } from "./firebase/functions";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import { UserInfoState } from "./store/reducers/types";
import SetUserInfoAction from "./store/actions/SetUserInfo";
import RemoveUserInfoAction from "./store/actions/RemoveUserInfo";
import Spinner from "./components/Spinner";
import Wrapper from "./components/Wrapper";

const GameDetails = React.lazy(() => import("./components/GameDetails"));
const Search = React.lazy(() => import("./components/Search"));
const Auth = React.lazy(() => import("./components/Auth"));
const Favorites = React.lazy(() => import("./components/Favorites"));
const About = React.lazy(() => import("./components/About"));
const NotFound = React.lazy(() => import("./components/NotFound"));

const queryClient = new QueryClient();

export default function App() {
  const userId = useSelector(
    (state: { userInfo: UserInfoState }) => state.userInfo.uid
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
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
          <Wrapper>
            <Spinner />
          </Wrapper>
        ) : (
          <Switch>
            <Route path="/" component={Home} exact />
            <Route
              path="/search"
              render={(props) => (
                <Suspense
                  fallback={
                    <Wrapper>
                      <Spinner />
                    </Wrapper>
                  }
                >
                  <Search {...props} />
                </Suspense>
              )}
            />
            <Route
              path="/auth"
              render={(props) =>
                userId ? (
                  <Redirect to="/" />
                ) : (
                  <Suspense
                    fallback={
                      <Wrapper>
                        <Spinner />
                      </Wrapper>
                    }
                  >
                    <Auth {...props} />
                  </Suspense>
                )
              }
            />
            <Route
              path="/favorites"
              render={() =>
                userId ? (
                  <Suspense
                    fallback={
                      <Wrapper>
                        <Spinner />
                      </Wrapper>
                    }
                  >
                    <Favorites />
                  </Suspense>
                ) : (
                  <Redirect to="/" />
                )
              }
            />
            <Route
              path="/about"
              render={() => (
                <Suspense
                  fallback={
                    <Wrapper>
                      <Spinner />
                    </Wrapper>
                  }
                >
                  <About />
                </Suspense>
              )}
            />
            <Route
              path="/game/:id"
              render={() => (
                <Suspense
                  fallback={
                    <Wrapper>
                      <Spinner />
                    </Wrapper>
                  }
                >
                  <GameDetails />
                </Suspense>
              )}
            />
            <Route
              render={() => (
                <Suspense
                  fallback={
                    <Wrapper>
                      <Spinner />
                    </Wrapper>
                  }
                >
                  <NotFound />
                </Suspense>
              )}
            />
          </Switch>
        )}
      </BrowserRouter>
    </QueryClientProvider>
  );
}
