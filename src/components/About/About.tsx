import React, { ReactElement } from "react";

export default function About(): ReactElement {
  return (
    <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
      <div className="max-w-screen-lg mx-auto py-6 px-4 text-center">
        This is About Page
      </div>
    </div>
  );
}
