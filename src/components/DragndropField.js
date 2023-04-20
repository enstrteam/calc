import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";
import { DynamicComponent } from "./DynamicComponent";

export const DragndropField = (props) => {
  const {
    fields,
    modeState,
    dragOverDropHereHandler,
    dragLeaveDropHereHandler,
    dropFieldHandler,
    dragOverHandler,
  } = useContext(CalcContext);

  if (!fields[1].items?.length)
    return (
      <div
        key={fields.id}
        onDragOver={(event) => dragOverDropHereHandler(event)}
        onDragLeave={(event) => dragLeaveDropHereHandler(event)}
        onDrop={(event) => dropFieldHandler(event, fields[1])}
        className="dragndrop-container d-flex justify-content-center align-items-center"
      >
        <div className="wrapper d-flex flex-column align-items-center">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.7778 1V5.44444"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M21 3.22223L16.5556 3.22223"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12.3889 3.22223H5C2.79086 3.22223 1 5.01309 1 7.22223V16.2778M18.7778 9.61112V17C18.7778 19.2091 16.9869 21 14.7778 21H5C2.79086 21 1 19.2091 1 17V16.2778M1 16.2778L4.83824 12.4395C6.40034 10.8774 8.93298 10.8774 10.4951 12.4395C11.8961 13.8406 13.5664 15.5108 14.8889 16.8333"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18.7778 14.6111L18.2729 14.1062C16.7108 12.5441 14.1781 12.5441 12.616 14.1062L12.3889 14.3333"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12.1112" cy="7.66664" r="0.555556" fill="black" />
          </svg>
          <span className="drop-here">Перетащите сюда</span>
          <span>
            любой элемент <br></br>из левой панели
          </span>
        </div>
      </div>
    );
  else
    return (
      <div
        key={fields.id}
        onDragOver={(event) => dragOverHandler(event)}
        onDrop={(event) => dropFieldHandler(event, fields[1])}
        className={"block-container " + modeState}
      >
        {fields[1].items.map((el) => (
          <DynamicComponent key={el.id} el={el} field={fields[1]} />
        ))}
      </div>
    );
};
