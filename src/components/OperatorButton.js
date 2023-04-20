import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";

export const OperatorButton = (props) => {

  const {modeState, buttonOperatorClick} = useContext(CalcContext)

  return (
    <button
      onClick={() => {if (modeState === "runtime") {buttonOperatorClick(props.value);}}}
      className={"button d-flex justify-content-center align-items-center"}
    >
      {props.value}
    </button>
  );
};
