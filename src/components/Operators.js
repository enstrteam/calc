import { OperatorButton } from "./OperatorButton";
import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";

export const Operators = (props) => {

  return (
    <div className="wrapper d-flex justify-content-between">
      <OperatorButton value="/" />
      <OperatorButton value="x" />
      <OperatorButton value="-" />
      <OperatorButton value="+" />
    </div>
  );
};
