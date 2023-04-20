import React, { useContext } from "react";
import { DynamicComponent } from "./DynamicComponent";
import { CalcContext } from "./CalcProvider";

export const BlockContainer = () => {
  const { fields } = useContext(CalcContext);
  return (
    <div className="block-container blocks">
      {fields[0].items.map((el) => (
        <DynamicComponent key={el.id} el={el} field={fields[0]} />
      ))}
    </div>
  );
};
