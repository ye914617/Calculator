const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DIGIT":
      //prevent new digit simply added to the calculated output
      if (state.overwrite) {
        return {
          ...state,
          output: `${action.payload}`,
          overwrite: false,
        };
      }
      //maximum digits that show on screen
      if (state.output.length > 18) {
        return state;
      }
      //second digit can't be 0 if first digit is 0
      if (state.output === "0" && action.payload === "0") {
        return state;
      }
      //restirct previous output can only have 1 "."
      if (action.payload === "." && state.operation === "") {
        if (state.output.includes(".") || state.output === "") {
          return state;
        }
        return {
          ...state,
          output: `${state.output || ""}${action.payload}`,
        };
      }
      //////////////
      //restirct current output can only have 1 "."
      if (action.payload === "." && state.operation !== "") {
        if (state.curOutput.includes(".") || state.curOutput === "") {
          return state;
        }
        return {
          ...state,
          output: `${state.output || ""}${action.payload}`,
          curOutput: `${state.curOutput || ""}${action.payload}`,
        };
      }
      ////////////////////
      if (
        state.output.includes("+") ||
        state.output.includes("-") ||
        state.output.includes("*") ||
        state.output.includes("/")
      ) {
        return {
          ...state,
          curOutput: `${state.curOutput || ""}${action.payload}`,
          output: `${state.output || ""}${action.payload}`,
        };
      }
      return {
        ...state,
        output: `${state.output || ""}${action.payload}`,
      };

    case "DETERMINE_OPERATION":
      //restrict the operation appear twice
      if (state.operation !== "") {
        return state;
      }
      //the "+" "/" "*" can't show up at first character
      if (state.output === "" && action.payload !== "-") {
        return {
          ...state,
        };
      }
      //manipulate "-" when it appear on first character, and it can show up twice to make a negative calculation
      if (action.payload === "-" && state.output === "") {
        return {
          ...state,
          output: `${action.payload}`,
          curOutput: `${action.payload}`,
        };
      }

      return {
        ...state,
        output: `${state.output || ""}${action.payload}`,
        prevOutput: state.output,
        curOutput: "",
        operation: action.payload,
        overwrite: false,
      };
    case "CALCULATE":
      if (state.curOutput === "")
        return {
          ...state,
        };
      let currentSum = Number(state.curOutput);
      let prevSum = Number(state.prevOutput);
      let sum;
      let stringSum;
      switch (state.operation) {
        case "+":
          //if contain decimal number
          if (state.curOutput.includes(".") || state.prevOutput.includes(".")) {
            sum = (prevSum * 10 + currentSum * 10) / 10;
            stringSum = sum.toFixed(2).toString(); //control number of decimal to display
            return {
              ...state,
              output: stringSum,
              prevOutput: stringSum,
              curOutput: "",
              operation: "",
              overwrite: true,
            };
          }
          sum = (prevSum * 10 + currentSum * 10) / 10;
          stringSum = sum.toString().slice(0, 9);
          return {
            ...state,
            output: stringSum,
            prevOutput: stringSum,
            curOutput: "",
            operation: "",
            overwrite: true,
          };
        case "/":
          sum = prevSum / currentSum;
          stringSum = sum.toString().slice(0, 9);
          return {
            ...state,
            output: stringSum,
            prevOutput: stringSum,
            curOutput: "",
            operation: "",
            overwrite: true,
          };
        case "-":
          sum = (prevSum * 10 - currentSum * 10) / 10;
          stringSum = sum.toString().slice(0, 9);
          return {
            ...state,
            output: stringSum,
            prevOutput: stringSum,
            curOutput: "",
            operation: "",
            overwrite: true,
          };
        case "*":
          sum = prevSum * currentSum;
          stringSum = sum.toString().slice(0, 9);
          return {
            ...state,
            output: stringSum,
            prevOutput: stringSum,
            curOutput: "",
            operation: "",
            overwrite: true,
          };
        default:
          return state;
      }
    case "ALL_CLEAR":
      return {
        output: "",
        prevOutput: "0",
        curOutput: "",
        operation: "",
        overwrite: false,
      };
    case "DELETE":
      //If there is a current output, delete it along with screen's output
      if (state.curOutput !== "") {
        return {
          ...state,
          output: state.output.slice(0, -1),
          curOutput: state.curOutput.slice(0, -1),
        };
      }
      return {
        ...state,
        output: state.output.slice(0, -1),
      };
    default:
      return state;
  }
};

export default reducer;
