import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ParamTypes {
  id: string;
}

interface Game {
  name: string;
  description: string;
  description_raw: string;
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
}

export default function GameDetails(): ReactElement {
  const { id } = useParams<ParamTypes>();
  const [details, setDetails] = useState<Game>();

  useEffect(() => {
    const getData = async () => {
      console.log("[GameDetails] UE");
      const res = await fetch(`https://api.rawg.io/api/games/${id}`);
      const data = await res.json();
      setDetails({
        name: data.name,
        description: data.description,
        description_raw: data.description_raw,
        released: data.released,
        background_image: data.background_image,
        website: data.website,
        metacritic: data.metacritic,
        playtime: data.playtime,
        parent_platforms: data.parent_platforms,
        genres: data.genres,
      });
    };

    getData();
  }, [id]);

  const formatDate = (releasedDate: string): string => {
    const date = new Date(releasedDate).toDateString();
    let arr = date.split(" ");
    return arr[1] + " " + arr[2] + ", " + arr[3];
  };

  const formatDescription = (description: string): string => {
    const newString = description.replaceAll("###", "\n");
    return newString;
  };

  return (
    <>
      {details && (
        <div
          className="w-screen min-h-screen "
          style={{
            backgroundImage: `url(${details.background_image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 70,
              bottom: -70,
              left: 0,
              right: 0,
              backgroundColor: "rgba(0,0,0, 0.6)",
            }}
          >
            <div className="w-2/3 mx-auto py-6 text-white">
              <h1 className="font-bold text-6xl">{details.name}</h1>
              <div className="flex mt-4">
                <p className="bg-white px-2 rounded-md text-black">
                  {formatDate(details.released)}
                </p>
                <p className="ml-6 uppercase tracking-widest">
                  Average Playtime: {details.playtime} hours
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 my-10 divide-x-2">
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-xl">Platforms</p>
                  <div className="divide-x-2">
                    {details.parent_platforms.map((platform) => (
                      <span className="px-2">{platform.platform.name}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-xl">Metacritic Score</p>
                  <span className="font-normal text-base">
                    {details.metacritic}
                  </span>
                </div>
                <div className="flex justify-center items-center flex-col">
                  <p className="font-bold text-xl">Genres</p>
                  <div className="divide-x-2">
                    {details.genres.map((genre) => {
                      return <span className="px-2">{genre.name}</span>;
                    })}
                  </div>
                </div>
              </div>
              <h1 className="font-bold text-xl">About</h1>
              {details.description}
              <div className="my-6">
                <p className="font-bold text-xl">Website</p>
                <a href={details.website}>{details.website}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
