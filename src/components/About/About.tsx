import React, { ReactElement } from "react";

import Wrapper from "../Wrapper";

export default function About(): ReactElement {
  return (
    <Wrapper>
      <div className="my-4 py-4 text-center">
        <span className="uppercase tracking-widest font-semibold text-sm">
          Small and Crafty
        </span>
        <div className="w-7 h-2 my-4 dark:bg-white bg-darkSecondary mx-auto transform -rotate-12 -skew-x-12"></div>
        <p className="mt-4">
          Gameigo is a video game discovery platform where you can keep all your
          games in one unified profile and create your exclusive collection. The
          application is powered by a public API provided by RAWG which houses
          more than 350,000 games across half a hundred platforms.
        </p>
      </div>
      <div className="my-4 py-4 text-center">
        <span className="uppercase tracking-widest font-semibold text-sm">
          Creator
        </span>
        <div className="w-7 h-2 my-4 dark:bg-white bg-darkSecondary mx-auto transform -rotate-12 -skew-x-12"></div>
        <p className="mt-4">
          Hi there, I'm Abhishek - aka Abe 👋 I am a self learner trying to get
          hands on new technologies and producing exciting products that are as
          smart, as they are effective. Wanna talk about Computer Sciency
          things? Drop a message : )
        </p>
      </div>
      <div className="mt-4 py-4 text-center">
        <span className="uppercase tracking-widest font-semibold text-sm">
          Contact
        </span>
        <div className="w-7 h-2 my-4 dark:bg-white bg-darkSecondary mx-auto transform -rotate-12 -skew-x-12"></div>
        <ul className="mt-7 flex flex-wrap justify-center space-x-2">
          <li>
            <a
              href="https://github.com/AbePlays"
              rel="noreferrer"
              target="_blank"
              aria-label="Github"
              className="py-2 px-4 mb-2 border rounded bg-darkSecondary dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-darkSecondary hover:text-black dark:hover:text-white transition duration-500"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="mailto:abhi.rawat456@gmail.com"
              rel="noreferrer"
              aria-label="Email"
              className="py-2 px-4 mb-2 border rounded bg-darkSecondary dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-darkSecondary hover:text-black dark:hover:text-white transition duration-500"
            >
              Mail
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/abe10/"
              rel="noreferrer"
              target="_blank"
              aria-label="LinkedIn"
              className="py-2 px-4 mb-2 border rounded bg-darkSecondary dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-darkSecondary hover:text-black dark:hover:text-white transition duration-500"
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </Wrapper>
  );
}
