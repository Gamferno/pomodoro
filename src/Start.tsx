import { useEffect, useState } from "react";
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
  autoStart: boolean;
  setAutoStart: React.Dispatch<React.SetStateAction<boolean>>;
  autoBreak: boolean;
  setAutoBreak: React.Dispatch<React.SetStateAction<boolean>>;
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
  autoStart,
  setAutoStart,
  autoBreak,
  setAutoBreak,
}: StartProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 scale-105">
      <div className="bg-stone-900  text-white font-jetbrains-mono p-4 ">
        <div className="flex place-items-center place-content-center">
          <div className="flex flex-row justify-between w-full p-4 place-items-center">
            <button id="empty" className="invisible">
              {" "}
              <ImCross />
            </button>
            <h1 className="">SETTING</h1>
            <button
              className=""
              onClick={() => {
                setPomoTime(pomoTime);
                setToggle(!toggle);
              }}
            >
              <ImCross />
            </button>
          </div>
        </div>

        <hr className="mb-6 text-amber-300"/>
        

        <div id="setting-portion" className="bg-stone-900 rounded-full ">
          <h1 className="mx-4 text-lg">Time(minutes)</h1>
          <div
            id="TimerSetting"
            className="flex justify-between gap-3 px-4 py-3"
          >
            <div id="pomo" className="flex flex-col flex-1 space-y-1">
              <label className="text-stone-200">Pomodoro</label>
              <input
                type="number"
                value={pomoTime}
                onChange={(e) => setPomoTime(Number(e.target.value))}
                className="bg-stone-800 w-full p-3"
              />
            </div>

            <div id="short_break" className="flex flex-col flex-1 space-y-1">
              <label className="text-stone-200">Short Break</label>
              <input
                type="number"
                name=""
                id="shortB"
                className="bg-stone-800 w-full p-3"
                value={shortBreak}
                onChange={(e) => setShortBreak(Number(e.target.value))}
              />
            </div>

            <div id="long_break" className="flex flex-col flex-1 space-y-1">
              <label className="text-stone-200"> Long Break </label>
              <input
                type="number"
                id="longB"
                className="bg-stone-800 w-full p-3"
                value={longBreak}
                onChange={(e) => setLongBreak(Number(e.target.value))}
              />
            </div>
          </div>

          <div id="otherTimerSettings" className="">
            <div
              id="AutoStartBreaks"
              className="flex justify-between p-4 place-items-center text-lg"
            >
              <h1>Auto Start Breaks</h1>
              <button>
                <Switch checked={autoBreak} setChecked={setAutoBreak} />
              </button>
            </div>
            <div
              id="AutoStartPomo"
              className="flex justify-between p-4 place-items-center text-lg"
            >
              <h1>Auto Start Pomodoros</h1>
              <Switch checked={autoStart} setChecked={setAutoStart} />
            </div>

            <div
              id="LongBreakInterval"
              className="flex justify-between p-4 place-items-center text-lg"
            >
              <label>Long Break Interval</label>
              <input
                type="number"
                name="long_break_interval"
                id=""
                className="bg-stone-800 p-3 w-25 h-10"
                value={longBreakInterval}
                onChange={(e) => {
                  setLongBreakInterval(Number(e.target.value));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
