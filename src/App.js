import Keypad from "./component/Keypad";
import Screen from "./component/Screen";

function App() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2">
        <Screen />
        <Keypad />
      </div>
    </div>
  );
}

export default App;
