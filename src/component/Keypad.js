import React, { useEffect } from "react";
import DigitButton from "./buttons/DigitButton";
import OperationButton from "./buttons/OperationButton";
import { useGlobalContext } from "../global/GlobalContext";

const Keypad = () => {
  const { calculate, allClear, deleteDigit } = useGlobalContext();

  const checkKey = (e) => {
    switch (e.key) {
      case "Backspace":
        deleteDigit();
        break;
      case "Enter":
        calculate();
        break;
      case "=":
        calculate();
        break;
      case "Delete":
        allClear();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", checkKey);
    return () => {
      document.removeEventListener("keydown", checkKey);
    };
  }, [checkKey]);

  return (
    <div className="grid grid-cols-4 gap-2 bg-gray-600 p-4">
      <button onClick={allClear} className="col-span-2 button">
        AC
      </button>
      <button onClick={deleteDigit} className="button ">
        DEL
      </button>
      <OperationButton operation="/" />
      <DigitButton digit="1" />
      <DigitButton digit="2" />
      <DigitButton digit="3" />
      <OperationButton operation="*" />
      <DigitButton digit="4" />
      <DigitButton digit="5" />
      <DigitButton digit="6" />
      <OperationButton operation="-" />
      <DigitButton digit="7" />
      <DigitButton digit="8" />
      <DigitButton digit="9" />
      <OperationButton operation="+" />
      <DigitButton digit="." />
      <DigitButton digit="0" />
      <button onClick={calculate} className="col-span-2 button">
        =
      </button>
    </div>
  );
};

export default Keypad;
