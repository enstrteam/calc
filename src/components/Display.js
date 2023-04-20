import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";

export const Display = (props) => {
  const { number, storedNumber } = useContext(CalcContext);

  return (
    <div
      className={
        "wrapper d-flex justify-content-end align-items" +
        (storedNumber.length > 9 && !number ? "-end" : "-center")
      }
    >
      <div
        className={
          "digits d-flex justify-content-end" +
          (storedNumber.length > 9 && !number ? " long" : " short")
        }
      >
        {(props.field.id !== 1)?(!number.length && !storedNumber ? "0" : number || storedNumber):"0"}
      </div>
    </div>
  );
};
