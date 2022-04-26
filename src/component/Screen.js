import React from "react";
import { useGlobalContext } from "../global/GlobalContext";
const Screen = () => {
  const { output } = useGlobalContext();

  return (
    <div className="screen h-32 flex justify-end items-end rounded-t-lg">
      <div className="m-1 text-3xl">{output}</div>
    </div>
  );
};

export default Screen;
