import React, { useEffect } from "react";
import { useGlobalContext } from "../../global/GlobalContext";

const DigitButton = ({ digit }) => {
  const { addDigit } = useGlobalContext();

  const checkKey = (e) => {
    if (e.key === digit) {
      addDigit(digit);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", checkKey);
    return () => {
      document.removeEventListener("keydown", checkKey);
    };
  }, [checkKey]);

  return (
    <div
      onClick={() => addDigit(digit)}
      className="button flex justify-center items-center"
    >
      {digit}
    </div>
  );
};

export default DigitButton;
