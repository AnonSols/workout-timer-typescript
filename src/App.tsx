import { useEffect } from "react";
import Calculator from "./Calculator";
import ToggleSounds from "./ToggleSounds";
import { TimerProvider, useTimer } from "../context/TimerContext";

function App() {
  const { time, formatTime, setTime } = useTimer();

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
    <TimerProvider>
      <main>
        <h1>Workout timer</h1>
        <time>For your workout on {time}</time>
        <ToggleSounds />
        <Calculator />
      </main>
    </TimerProvider>
  );
}

export default App;
