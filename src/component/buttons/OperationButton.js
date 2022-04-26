import React, { useEffect } from "react";
import { useGlobalContext } from "../../global/GlobalContext";

const OperationButton = ({ operation }) => {
  const { determineOperation } = useGlobalContext();

  const checkKey = (e) => {
    if (e.key === operation) {
      determineOperation(operation);
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
      onClick={() => determineOperation(operation)}
      className="button flex justify-center items-center"
    >
      {operation}
    </div>
  );
};

export default OperationButton;
