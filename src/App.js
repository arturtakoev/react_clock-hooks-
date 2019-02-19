import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { updateTime, oneSec } from "./clock";

function App() {
  const [time, setTime] = useState(updateTime());

  useEffect(() => {
    setInterval(() => {
      setTime(updateTime());
    }, oneSec());
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="App-link">{time}</div>
      </header>
    </div>
  );
}

export default App;
