import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { TimerProvider } from "../context/TimerContext.tsx";
import { SoundProvider } from "../context/SoundContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SoundProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </SoundProvider>
  </React.StrictMode>
);
