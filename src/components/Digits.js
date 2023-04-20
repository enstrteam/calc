import React from "react";
import { Button } from "./Button";

export const Digits = (props) => {

  return (
    <div className="wrapper d-flex flex-row-reverse justify-content-between flex-wrap">
      {["9","8","7","6","5","4","3","2","1",",","0"]
        .map((el, index) => <Button key={index} value={el} field={props.field}/>)}
    </div>
  );
};
