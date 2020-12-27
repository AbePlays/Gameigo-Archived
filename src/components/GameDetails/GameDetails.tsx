import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";

interface ParamTypes {
  id: string;
}

interface LocationType {
  images: ImageType[];
}

interface ImageType {
  id: number;
  image: string;
}

interface Game {
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
  const [details, setDetails] = useState<Game>();

  const images: any = [];
  state.images.forEach((item: ImageType) => {
    images.push(<img src={item.image} alt="game" />);
  });

  useEffect(() => {
    console.log("[GameDetails] UEF");
    const getData = async () => {
      const res = await fetch(`https://api.rawg.io/api/games/${id}`);
      const data = await res.json();
      setDetails({
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
      });
    };

    getData();
  }, [id]);

  const formatDate = (releasedDate: string): string => {
    const date = new Date(releasedDate).toDateString();
    let arr = date.split(" ");
    return arr[1] + " " + arr[2] + ", " + arr[3];
  };

  return (
    <div className="dark:bg-black min-h-screen bg-white">
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
            <h1 className="font-bold text-6xl my-6">{details.name}</h1>
            <div className="flex flex-wrap my-6 items-center">
              <p className="bg-white px-2 mr-4 rounded-md text-black">
                {formatDate(details.released)}
              </p>
              <p className="uppercase tracking-widest">
                Average Playtime: {details.playtime} hours
              </p>
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
