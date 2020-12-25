import React, { ReactElement } from "react";

interface Props {}

export default function GameDetails({}: Props): ReactElement {
  console.log("Details");

  return (
    <div>
      <h1>Game Details</h1>
    </div>
  );
}
