import { useEffect } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import { useTimer } from "../context/TimerContext";

function App() {
  const { time, setTime, formatTime } = useTimer();
  useEffect(
    function () {
      const id = setInterval(function () {
        setTime(formatTime(new Date()));
      }, 1000);

      return () => clearInterval(id);
    },
    [setTime, formatTime]
  );

  return (
    <main>
      <h1>Workout timer</h1>
      <time>For your workout on {time}</time>
      <ToggleSounds />
      <Calculator />
    </main>
  );
}

export default App;
