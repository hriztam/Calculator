import React, { useState } from "react";
import "./Style.css";

const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, "."];
const ops = ["*", "/", "+", "-", "="];
const ids = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
};

const Calculator = () => {
  const [state, setState] = useState({
    currentNum: "0",
    prevNum: undefined,
    operation: undefined,
  });

  const handleClick = (e) => {
    const { currentNum, prevNum, operation } = state;
    const { innerText } = e.target;

    if (!Number.isNaN(Number(innerText))) {
      if (currentNum === "0") {
        setState({
          ...state,
          currentNum: innerText,
        });
      } else {
        setState({
          ...state,
          currentNum: currentNum + innerText,
        });
      }
      return;
    }

    switch (innerText) {
      case "AC":
        setState({
          currentNum: "0",
          prevNum: undefined,
          operation: undefined,
        });
        break;
      case ".":
        if (!currentNum.includes(".")) {
          setState({
            ...state,
            currentNum: currentNum + innerText,
          });
        }
        break;
      default:
        if (!operation || operation === "=") {
          setState({
            ...state,
            operation: innerText === "=" ? undefined : innerText,
            prevNum: currentNum,
            currentNum: "0",
          });
        } else {
          try {
            const evaluated = new Function(
              `return ${prevNum} ${operation} ${currentNum}`
            )();
            setState({
              ...state,
              operation: innerText,
              prevNum: evaluated,
              currentNum: innerText === "=" ? String(evaluated) : "0",
            });
          } catch (error) {
            console.error("Invalid operation");
          }
        }
    }
  };

  return (
    <div className="calculator">
      <h1 className="title">Iphone Calculator</h1>
      <div id="display" className="display">
        {state.currentNum}
      </div>
      <div className="nums-container">
        <button className="big-h ac red" onClick={handleClick}>
          AC
        </button>
        {nums.map((num) => (
          <button
            key={num}
            className={`${num === 0 && "big-h"}`}
            onClick={handleClick}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="ops-container">
        {ops.map((op) => (
          <button className="orange" key={op} onClick={handleClick}>
            {op}
          </button>
        ))}
      </div>
      <p className="byline">
        Follow Hritam on:-
        <li>
          <a href="https://twitter.com/code_hritam" target="_top">
            Twitter
          </a>
        </li>
        <li>
          <a href="https://github.com/Hritam-stark">Github</a>
        </li>
      </p>
    </div>
  );
};

export default Calculator;
