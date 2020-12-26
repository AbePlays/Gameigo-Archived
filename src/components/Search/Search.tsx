import React, { ReactElement } from "react";
import { useLocation } from "react-router-dom";

// interface Props {}

interface LocationType {
  query: string;
}

export default function Search(): ReactElement {
  const location = useLocation<LocationType>();

  console.log(location.state.query);

  return (
    <div>
      <h1>Hi, I'm Search</h1>
    </div>
  );
}
