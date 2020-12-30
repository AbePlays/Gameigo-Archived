import React, { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Wrapper(props: Props): ReactElement {
  return (
    <div className="dark:bg-black dark:text-white bg-gray-50 min-h-screen">
      <div className="max-w-screen-lg mx-auto py-6 px-4">{props.children}</div>
    </div>
  );
}
