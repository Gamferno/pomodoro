import { useEffect, useState } from "react";
import "./App.css";
import Timer from "./Timer.tsx";
import Start from "./Start.tsx";

const App = () => {
  const [pomoTime, setPomoTime] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [toggle, setToggle] = useState<boolean>(true);
  const [longBreakInterval, setLongBreakInterval] = useState<number>(4);

  const [autoStart, setAutoStart] = useState<boolean>(() => {
    /* 
    const saved = localStorage.getItem('AutoStart');
    return saved ? JSON.parse(saved) : false; */
    return localStorage.getItem("AutoStart") === "true";
  });
  const [autoBreak, setAutoBreak] = useState<boolean>(() => {
    /* 
    const saved = localStorage.getItem('AutoBreak');
    return saved ? JSON.parse(saved) : false; */
    return localStorage.getItem("AutoBreak") === "true";
  });

  useEffect(() => {
    localStorage.setItem("AutoStart", String(autoStart));
    localStorage.setItem("AutoBreak", String(autoBreak));
  }, [autoStart, autoBreak]);

  return (
    <div>
      {!toggle && (
        <Start
          pomoTime={pomoTime}
          setPomoTime={setPomoTime}
          shortBreak={shortBreak}
          setShortBreak={setShortBreak}
          longBreak={longBreak}
          setLongBreak={setLongBreak}
          toggle={toggle}
          setToggle={setToggle}
          longBreakInterval={longBreakInterval}
          setLongBreakInterval={setLongBreakInterval}
          autoBreak={autoBreak}
          setAutoBreak={setAutoBreak}
          autoStart={autoStart}
          setAutoStart={setAutoStart}
        />
      )}
      {
        <Timer
          pomoTime={pomoTime * 60000}
          shortBreak={shortBreak * 60000}
          longBreak={longBreak * 60000}
          toggle={toggle}
          setToggle={setToggle}
          longBreakInterval={longBreakInterval}
          autoStart={autoStart}
          autoBreak={autoBreak}
        />
      }
    </div>
  );
};

export default App;
