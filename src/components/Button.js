import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";

export const Button = (props) => {

  const {modeState, buttonCalcClick} = useContext(CalcContext)

  return (
    <button
      onClick={() => {if (modeState === "runtime" && props.field.id !== 1) {buttonCalcClick(props.value);}}}
      className={"button d-flex justify-content-center align-items-center" + ((props.value === "0")?" zero":"")}
    >
      {props.value}
    </button>
  );
};
