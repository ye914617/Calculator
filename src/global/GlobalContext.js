import React, { useReducer, useContext } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const initialState = {
  output: "",
  prevOutput: "0",
  curOutput: "",
  operation: "",
  overwrite: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // console.log(state);

  const addDigit = (digit) => {
    dispatch({ type: "ADD_DIGIT", payload: digit });
  };

  const determineOperation = (operation) => {
    dispatch({ type: "DETERMINE_OPERATION", payload: operation });
  };

  const calculate = (num) => {
    dispatch({ type: "CALCULATE", payload: num });
  };

  const allClear = () => {
    dispatch({ type: "ALL_CLEAR" });
  };

  const deleteDigit = () => {
    dispatch({ type: "DELETE" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addDigit,
        determineOperation,
        calculate,
        allClear,
        deleteDigit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
