import React from "react";
import { useState } from "react";
import { Display } from "./Display";
import { Operators } from "./Operators";
import { Digits } from "./Digits";
import { Equal } from "./Equal";

export const CalcContext = React.createContext();

export const CaclProvider = (props) => {
  const blockList = [
    {
      id: 1,
      order: 1,
      name: "display",
      component: Display,
      isDraggable: true,
      bottomLine: false,
    },
    {
      id: 2,
      order: 2,
      name: "operators",
      component: Operators,
      isDraggable: true,
      bottomLine: false,
    },
    {
      id: 3,
      order: 3,
      name: "digits",
      component: Digits,
      isDraggable: true,
      bottomLine: false,
    },
    {
      id: 4,
      order: 4,
      name: "equal",
      component: Equal,
      isDraggable: true,
      bottomLine: false,
    },
  ];

  const [fields, setFields] = useState([
    {
      id: 1,
      name: "blocks",
      items: blockList,
    },
    {
      id: 2,
      name: "constructor",
      items: [],
    },
  ]);

  const [currentField, setCurrentField] = useState();
  const [currentItem, setCurrentItem] = useState();
  const [eventTarget, setEventTarget] = useState();
  const [modeState, setModeState] = useState("constructor");
  const [number, setNumber] = useState("");
  const [storedNumber, setStoredNumber] = useState("");
  const [operator, setOperator] = useState("");

  function modeToggle(event) {
    if (fields[1].items.length === 4) {
      const id = event.currentTarget.id;
      setModeState(id);
      console.log("ID", id, "STATE", modeState);
      const newFields = fields.map((f) => {
        if (f.id === 2) {
          return {
            ...f,
            items: f.items.map((i) => {
              if (i.id === 1) return i;
              else return { ...i, isDraggable: !i.isDraggable };
            }),
          };
        } else return f;
      });
      setFields(newFields);
      setNumber("");
      setStoredNumber("");
    }
  }

  function buttonCalcClick(num) {
    if (num === "," && number.length === 0) {
      setNumber(`${"0" + num}`);
    } else {
      if (number === "0" && number.length === 1 && num > 0) {
        setNumber(`${num}`);
      } else {
        if ((!number.includes(",") || num !== ",") && number.length < 9) {
          setNumber(`${(number + num).replace(/^0+/, "0")}`);
        }
      }
    }
  }

  function storedNumberHandle() {
    setStoredNumber(number);
    setNumber("");
  }

  function buttonOperatorClick(operator) {
    if (number) {
      setOperator(operator);
      storedNumberHandle();
      console.log(operator, storedNumber);
    }
    if (storedNumber) {
      setOperator(operator);
      console.log(operator);
    }
  }

  function calculate() {
    if (number && storedNumber) {
      switch (operator) {
        case "+":
          setStoredNumber(
            `${
              (parseFloat(storedNumber.replace(",", ".")) * 10 ** 8 +
                parseFloat(number.replace(",", ".")) * 10 ** 8) /
              10 ** 8
            }`.replace(/[.]/, ",")
          );
          break;

        case "/":
          if (number !== "0") {
            setStoredNumber(
              `${
                (((parseFloat(storedNumber.replace(",", ".")) /
                  parseFloat(number.replace(",", "."))) *
                  10 ** 8) /
                10 ** 8).toPrecision(15)/1
              }`.replace(/[.]/, ",")
            );
          } else {
            setStoredNumber("Не определено");
          }
          break;

        case "x":
          setStoredNumber(
            `${
              ((parseFloat(storedNumber.replace(",", ".")) *
                parseFloat(number.replace(",", ".")) *
                10 ** 8) /
              10 ** 8).toPrecision(15)/1
            }`.replace(/[.]/, ",")
          );
          console.log("MULTI", storedNumber, number, storedNumber * number);

          break;

        case "-":
          setStoredNumber(
            `${
              (parseFloat(storedNumber.replace(",", ".")) * 10 ** 8 -
                parseFloat(number.replace(",", ".")) * 10 ** 8) /
              10 ** 8
            }`.replace(/[.]/, ",")
          );
          break;

        default:
          break;
      }
      setNumber("");
    }
  }

  function dragStartHandler(event, item, field) {
    event.stopPropagation();
    setCurrentField(field);
    setCurrentItem(item);
  }

  function bottomLineToggle(item, field) {
    if (field.id === fields[1].id) {
      const newFields = fields.map((f) => {
        if (f.id === field.id) {
          f.items.map((i) => {
            if (i.id === item.id) {
              i.bottomLine = !i.bottomLine;
            }
          });
          return f;
        } else return f;
      });
      setFields(newFields);
    }
  }

  function dragEnterHandler(event, item, field) {
    event.preventDefault();
    event.stopPropagation();
    setEventTarget(event.target);
    bottomLineToggle(item, field);
  }

  function dragLeaveHandler(event, item, field) {
    event.preventDefault();
    event.stopPropagation();
    if (eventTarget === event.target) {
      bottomLineToggle(item, field);
    }
  }

  function dragEndHandler(event) {
    event.preventDefault();
  }

  function dragOverHandler(event) {
    event.preventDefault();
  }

  function dropHandler(event, item, field) {
    event.preventDefault();
    event.stopPropagation();

    bottomLineToggle(item, field);

    if (field.id === 1) return;

    isDisplay(currentItem);

    const dropIndex = field.items.indexOf(item);

    const newFields = fields.map((f) => {
      if (f.id === field.id) {
        return {
          ...f,
          items: [
            ...f.items
              .slice(0, dropIndex + 1)
              .filter((i) => i.id !== currentItem.id),
            currentItem,
            ...f.items
              .slice(dropIndex + 1)
              .filter((i) => i.id !== currentItem.id),
          ].sort(sortConstructor),
        };
      } else
        return {
          ...f,
          items: f.items.map((i) => {
            if (i.id === currentItem.id) return { ...i, isDraggable: false };
            else return i;
          }),
        };
    });
    setFields(newFields);
  }

  function isDisplay(currentItem) {
    if (currentItem.id === 1) {
      currentItem.isDraggable = false;
    }
  }

  function sortConstructor(item) {
    if (item.id === 1) return -1;
    else return 1;
  }

  function dropFieldHandler(event, field) {
    event.preventDefault();
    event.stopPropagation();

    if (currentField.id === field.id) return;

    isDisplay(currentItem);

    const newFields = fields.map((f) => {
      if (f.id === field.id) {
        return { ...f, items: [...f.items, currentItem].sort(sortConstructor) };
      } else {
        return {
          ...f,
          items: f.items.map((i) => {
            if (i.id === currentItem.id) return { ...i, isDraggable: false };
            else return i;
          }),
        };
      }
    });
    setFields(newFields);
    event.currentTarget.style.backgroundColor = "white";
  }

  function dragOverDropHereHandler(event) {
    event.preventDefault();
    event.currentTarget.style.backgroundColor = "#F0F9FF";
  }

  function dragLeaveDropHereHandler(event) {
    event.currentTarget.style.backgroundColor = "white";
  }

  function doubleClickHandler(event, item, field) {
    if (modeState !== "runtime" && field.id === fields[1].id) {
      const newFields = fields.map((f) => {
        if (f.id === field.id) {
          return { ...f, items: f.items.filter((i) => i.id != item.id) };
        }
        return {
          ...f,
          items: f.items.map((i) => {
            if (i.id === item.id) return { ...i, isDraggable: true };
            else return i;
          }),
        };
      });
      setFields(newFields);
    }
  }

  return (
    <CalcContext.Provider
      value={{
        blockList,
        fields,
        currentItem,
        currentField,
        modeState,
        number,
        storedNumber,
        operator,
        dragStartHandler,
        dropHandler,
        dragEndHandler,
        dragOverHandler,
        dragEnterHandler,
        dragLeaveHandler,
        dropFieldHandler,
        dragOverDropHereHandler,
        dragLeaveDropHereHandler,
        doubleClickHandler,
        modeToggle,
        buttonCalcClick,
        buttonOperatorClick,
        calculate,
      }}
    >
      {props.children}
    </CalcContext.Provider>
  );
};
