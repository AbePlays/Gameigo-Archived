import React, { ReactElement, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

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
    const getData = async () => {
      console.log("[GameDetails] UE");
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
    <>
      {details && (
        <div
          className="w-screen py-6"
          style={{
            background: `url(${details.background_image})`,
            backgroundPosition: "top",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundColor: "black",
          }}
        >
          <div className="w-2/3 mx-auto text-white">
            <h1 className="font-bold text-6xl my-6">{details.name}</h1>
            <div className="flex my-6">
              <p className="bg-white px-2 rounded-md text-black">
                {formatDate(details.released)}
              </p>
              <p className="ml-6 uppercase tracking-widest">
                Average Playtime: {details.playtime} hours
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 my-6 divide-x-2">
              <div className="flex justify-center items-center flex-col">
                <p className="font-bold text-xl">Platforms</p>
                <div className="divide-x-2">
                  {details.parent_platforms.map((platform) => (
                    <span key={platform.platform.id} className="px-2">
                      {platform.platform.name}
                    </span>
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
                    return (
                      <span key={genre.id} className="px-2">
                        {genre.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="w-3/5 mx-auto my-6">
              <AliceCarousel
                autoPlayInterval={5000}
                disableButtonsControls={true}
                infinite
                items={images}
              />
            </div>
            <h1 className="font-bold text-2xl my-3">About</h1>
            {parse(details.description)}
            <div className="my-6">
              <p className="font-bold text-xl">Website</p>
              <a href={details.website}>{details.website}</a>
            </div>
            <div className="my-6">
              <h1 className="font-bold text-xl">Where to buy</h1>
              <div className="flex gap-2 mt-2">
                {details.stores.map((item) => (
                  <a
                    href={item.url}
                    className="py-2 px-6 bg-gray-900 rounded-lg cursor-pointer"
                    key={item.id}
                  >
                    {item.store.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
