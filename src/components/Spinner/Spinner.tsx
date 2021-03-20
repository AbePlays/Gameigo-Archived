import React, { ReactElement } from "react";

export default function Spinner(): ReactElement {
  return (
    <div
      className="flex justify-center items-center py-16"
      data-testid="spinner"
    >
      <div className="lds-dual-ring"></div>
    </div>
  );
}
