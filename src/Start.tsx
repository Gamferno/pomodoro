import { useState } from "react";
import { ImCross } from "react-icons/im";
import Switch from "./components/Toggle";

import "./App.css";
interface StartProps {
  pomoTime: number;
  setPomoTime: React.Dispatch<React.SetStateAction<number>>;
  shortBreak: number;
  setShortBreak: React.Dispatch<React.SetStateAction<number>>;
  longBreak: number;
  setLongBreak: React.Dispatch<React.SetStateAction<number>>;
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  longBreakInterval: number;
  setLongBreakInterval: React.Dispatch<React.SetStateAction<number>>;
}

const Start = ({
  pomoTime,
  setPomoTime,
  shortBreak,
  setShortBreak,
  longBreak,
  setLongBreak,
  toggle,
  setToggle,
  longBreakInterval,
  setLongBreakInterval,
}: StartProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
      <div className="bg-stone-900  text-white ">
        <div className="flex place-items-center place-content-center p-5">
          <div>
            <h1>Setting</h1>
            <button
              className=" absolute right-0"
              onClick={() => {setPomoTime(pomoTime); setToggle(!toggle); }}
            >
              <ImCross />
            </button>
          </div>
        </div>

        <div id="setting-portion" className="bg-stone-900 mx-5">
          <h1>Time(minutes)</h1>
          <div id="TimerSetting" className="flex justify-between">
            <div id="pomo" className="flex-col">
              <label>Pomodoro</label>
              <input
                type="number"
                value={pomoTime}
                onChange={(e) => setPomoTime(Number(e.target.value))}
                className="bg-stone-800 p-2"
              />
            </div>

            <div id="short_break" className="flex-col">
              <label className="">Short Break</label>
              <input
                type="number"
                name=""
                id="shortB"
                className="bg-stone-800 p-2"
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
              />
            </div>

            <div id="long_break" className="flex-col mr-2 ml-2">
              <label className=""> Long Break </label>
              <input
                type="number"
                id="longB"
                className="bg-stone-800 p-2 "
                value={longBreak}
                onChange={(e) => setLongBreak(Number(e.target.value))}
              />
            </div>
          </div>

          <div id="AutoStartBreaks" className="flex justify-between m-5">
            <h1>Auto Start Breaks</h1>
            <Switch />
          </div>
          <div id="AutoStartPomo" className="flex justify-between m-5">
            <h1>Auto Start Pomodoros</h1>
            <Switch />
          </div>

          <div id="LongBreakInterval" className="flex justify-between m-5">
            <label>Long Break Interval</label>
            <input
              type="number"
              name="long_break_interval"
              id=""
              className="bg-stone-800 p-2"
              onChange={(e) => {
                setLongBreakInterval(Number(e.target.value));
              }}
            />
            <h1>{longBreakInterval}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
