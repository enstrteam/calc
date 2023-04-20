import React from "react";
import { BlockContainer } from "./BlockContainer";
import { DragndropField } from "./DragndropField";
import { Selector } from "./Selector";

export const Builder = () => {
  return (
    <div className="calc d-flex">
      <div className="col left-side">
        <BlockContainer />
      </div>
      <div className="col right-side">
        <Selector />
        <DragndropField />
      </div>
    </div>
  );
};
