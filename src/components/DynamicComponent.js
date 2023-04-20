import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";

export const DynamicComponent = (props) => {
  const Component = props.el.component;
  const {
    doubleClickHandler,
    dragStartHandler,
    dragEnterHandler,
    dragLeaveHandler,
    dragEndHandler,
    dragOverHandler,
    dropHandler,
  } = useContext(CalcContext);
  return (
    <div
      key={props.el.id}
      onDoubleClick={(event) =>
        doubleClickHandler(event, props.el, props.field)
      }
      onDragStart={(event) => dragStartHandler(event, props.el, props.field)}
      onDragEnter={(event) => dragEnterHandler(event, props.el, props.field)}
      onDragLeave={(event) => dragLeaveHandler(event, props.el, props.field)}
      onDragEnd={(event) => dragEndHandler(event)}
      onDragOver={(event) => dragOverHandler(event)}
      onDrop={(event) => dropHandler(event, props.el, props.field)}
      draggable={props.el.isDraggable ? true : false}
      className={
        "block position-relative d-flex flex-column align-items-center calc-" +
        props.el.name
      }
    >
      <Component key={props.el.id} el={props.el} field={props.field}/>
      <div
        className="bottom-line position-absolute"
        style={{ display: props.el.bottomLine ? "inline" : "none" }}
      >
        <svg
          width="250"
          height="6"
          viewBox="0 0 250 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.113249 3L3 5.88675L5.88675 3L3 0.113249L0.113249 3ZM249.887 3L247 0.113249L244.113 3L247 5.88675L249.887 3ZM3 3.5H247V2.5H3V3.5Z"
            fill="#5D5FEF"
          />
        </svg>
      </div>
    </div>
  );
};
