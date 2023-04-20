import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";

export const Equal = () => {

  const {calculate} = useContext(CalcContext)

  return (
    <button
      onClick={() => calculate()}
      className="wrapper button d-flex flex-column justify-content-center align-items-center"
      id="equal"
    >
      =
    </button>
  );
};
