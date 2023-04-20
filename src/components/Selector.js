import React, { useContext } from "react";
import { CalcContext } from "./CalcProvider";

export const Selector = (props) => {

  const {modeState, modeToggle} = useContext(CalcContext)

  return (
    <div className="selector">
      <div className="wrapper d-inline-flex align-items-center">
        <div 
        onClick={(event) => modeToggle(event)}
        id="runtime"
        className={"runtime d-flex align-items-center " + ((modeState === "runtime")?"active":"")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678Z"
              stroke="#4D5562"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.04834 9.99996C3.11001 6.61913 6.26917 4.16663 10 4.16663C13.7317 4.16663 16.89 6.61913 17.9517 9.99996C16.89 13.3808 13.7317 15.8333 10 15.8333C6.26917 15.8333 3.11001 13.3808 2.04834 9.99996Z"
              stroke="#4D5562"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Runtime
        </div>
        <div 
        onClick={(event) => modeToggle(event)}
        id="constructor"
        className={"constructor d-flex align-items-center " + ((modeState === "constructor")?"active":"")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50008 13.3334L4.16675 10L7.50008 6.66671M12.5001 6.66671L15.8334 10L12.5001 13.3334"
              stroke="#4D5562"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Constructor
        </div>
      </div>
    </div>
  );
};
