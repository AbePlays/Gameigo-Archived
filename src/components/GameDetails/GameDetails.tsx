import React, { ReactElement } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";

import { DarkModeState, UserInfoState } from "../../store/reducers/types";
import { Game } from "../Trending/Trending";
import { AddData } from "../../store/actions/AddData";

interface ParamTypes {
  id: string;
}

interface LocationType {
  images: ImageType[];
  game: Game;
}

interface ImageType {
  id: number;
  image: string;
}

interface GameInfo {
  name: string;
  description: string;
  released: string;
  background_image: string;
  website: string;
  metacritic: number;
  playtime: number;
  parent_platforms: {
    platform: {
      id: number;
      name: string;
    };
  }[];
  genres: {
    id: number;
    name: string;
  }[];
  stores: {
    id: number;
    url: string;
    store: {
      id: number;
      name: string;
    };
  }[];
}

export default function GameDetails(): ReactElement {
  const { id } = useParams<ParamTypes>();
  const { state } = useLocation<LocationType>();
  let details: GameInfo | null = null;

  const history = useHistory();
  const name = useSelector(
    (state: { darkMode: DarkModeState; userInfo: UserInfoState }) =>
      state.userInfo.name
  );
  const disptach = useDispatch();

  const images: any = [];
  state.images.forEach((item: ImageType) => {
    images.push(<img src={item.image} alt="game" />);
  });

  const getData = async () => {
    const res = await fetch(`https://api.rawg.io/api/games/${id}`);
    return res.json();
  };

  const formatDate = (releasedDate: string): string => {
    const date = new Date(releasedDate).toDateString();
    let arr = date.split(" ");
    return arr[1] + " " + arr[2] + ", " + arr[3];
  };

  const { isLoading, error, data } = useQuery(id, getData);

  if (data) {
    details = {
      name: data.name,
      description: data.description,
      released: data.released,
      background_image: data.background_image,
      website: data.website,
      metacritic: data.metacritic,
      playtime: data.playtime,
      parent_platforms: data.parent_platforms,
      genres: data.genres,
      stores: data.stores,
    };
  }

  return (
    <div className="dark:bg-black min-h-screen bg-gray-50">
      {isLoading && <Spinner />}
      {error && (
        <p className="text-white text-center py-8">Error while fetching data</p>
      )}
      {details && (
        <div className="w-screen relative bg-black">
          <div className="absolute top-0 left-0 right-0 z-100">
            <img
              className="w-full h-full"
              src={details.background_image}
              alt="lol"
            />
          </div>
          <div
            className="absolute top-0 left-0 z-11  w-full h-full"
            style={{
              opacity: 0.7,
              backgroundColor: "black",
            }}
          />
          <div className="max-w-screen-lg mx-auto py-6 px-4 z-10 relative text-white">
            <svg
              className="w-8 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => {
                history.goBack();
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <h1 className="font-bold text-4xl my-6 sm:text-6xl">
              {details.name}
            </h1>

            <div className="flex flex-wrap my-6 items-center">
              <p className="bg-white px-2 mr-4 rounded-md text-black">
                {formatDate(details.released)}
              </p>
              <p className="uppercase tracking-widest">
                Average Playtime: {details.playtime} hours
              </p>
            </div>

            <div
              className="w-max p-2 px-4 transition duration-300 rounded-lg text-xs sm:text-sm bg-transparent hover:bg-white hover:text-black text-white border border-white uppercase tracking-widest cursor-pointer"
              onClick={() => {
                disptach(AddData(state.game));
                // addData(state.game);
                // removeData(state.game.id);
              }}
            >
              {/* {name ? ( */}
              {/* <div className="flex items-center">
                  <svg
                    className="w-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove from favorites
                </div>
              ) : ( */}
              <div className="flex items-center">
                <svg
                  className="w-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Add to favorites
              </div>
              {/* )} */}
            </div>

            <div className="grid sm:grid-cols-3 gap-4 my-6 sm:divide-x-2 text-center">
              <div className="px-2">
                <h1 className="font-bold text-xl">Platforms</h1>
                <div className="divide-x-2 mt-2">
                  {details.parent_platforms.map((platform) => (
                    <span key={platform.platform.id} className="px-2">
                      {platform.platform.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-2">
                <h1 className="font-bold text-xl">Metacritic Score</h1>
                <p className="font-normal text-base mt-2">
                  {details.metacritic}
                </p>
              </div>
              <div className="px-2">
                <h1 className="font-bold text-xl">Genres</h1>
                <div className="divide-x-2 mt-2">
                  {details.genres.map((genre) => (
                    <span key={genre.id} className="px-2">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <h1 className="font-bold text-2xl my-3">About</h1>
            <div className="text-justify">{parse(details.description)}</div>
            <div className="my-6">
              <p className="font-bold text-xl">Website</p>
              <a href={details.website} target="_blank" rel="noreferrer">
                {details.website}
              </a>
            </div>
            <div className="my-6">
              <h1 className="font-bold text-xl">Where to buy</h1>
              <div className="flex flex-wrap">
                {details.stores.map((item) => (
                  <a
                    href={item.url}
                    className="py-2 px-6 mr-2 mt-2 bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-800 transition duration-300"
                    key={item.id}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.store.name}
                  </a>
                ))}
              </div>
            </div>
            <h1 className="font-bold text-xl">Screenshots</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-3 justify-items-center">
              {state.images.map((item: ImageType) => (
                <a
                  href={item.image}
                  key={item.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="w-64 h-40 object-cover"
                    src={item.image}
                    alt="game"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
