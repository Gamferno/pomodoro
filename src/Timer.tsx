import { useEffect, useState } from "react";

import { LuBrain, LuCoffee } from "react-icons/lu";

import { MdSkipNext, MdMenu, MdPause, MdPlayArrow } from "react-icons/md";

import pomoSound from './assets/focus.wav';
import breakSound from './assets/break.wav';
// interface TimerProps {
//   pomoTime: number
//   shortBreak: number
//   longBreak: number
// }

// interface BackendData {
//   id: number
//   name: string
// }
const getTime = (miliseconds: number) => {
  let total_second = Math.floor(miliseconds / 1000); // 160
  let total_minutes = Math.floor(total_second / 60); // 2 // 2:40

  let seconds = total_second % 60;
  let minutes = total_minutes % 60;

  return { seconds: seconds, minutes: minutes };
};

const Timer = ({
  pomoTime,
  shortBreak,
  longBreak,
  toggle,
  setToggle,
  longBreakInterval,
  autoBreak,
  autoStart,
}) => {
  const [time, setTime] = useState<number>(pomoTime);
  // const [short_break, setSB] = useState<Number>(shortBreak);
  // const [long_break, setLB] = useState<Number>(longBreak);
  const [status, setStatus] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [pause, setPause] = useState<boolean>(true);

  // const [displayTime, setDisplayTime] = useState<DisplayTime>({
  //   minutes: pomoTime / 60000,
  //   seconds: pomoTime % 60000,
  // });

  const statusDict: String[] = ["Focus Time", "Short Break", "Long Break"];
  // const colorList: String[] = ["red", "green", "blue"];
  //
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea

      if (e.code === "Space") {
        e.preventDefault();
        setPause((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (status === 0) setTime(pomoTime);
    else if (status === 1) setTime(shortBreak);
    else if (status === 2) setTime(longBreak);
  }, [pomoTime, shortBreak, longBreak, status]);

  useEffect(() => {
    if (!pause && time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1000);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (time === 0 && toggle) {
      if (status === 0) {
        new Audio(breakSound).play();

        if (!autoBreak) setPause(true);
        if (count >= longBreakInterval) {
          setStatus(2);
          setTime(longBreak);

          setCount(1);
        } else {
          setStatus(1);
          setTime(shortBreak);
          setCount(count + 1);
        }
      } else {
        if (!autoStart) setPause(true);
        setStatus(0);
        setTime(pomoTime);
        new Audio(pomoSound).play();
      }
    }
  }, [
    time,
    pause,
    status,
    count,
    longBreakInterval,
    longBreak,
    shortBreak,
    pomoTime,
    autoStart,
    autoBreak,
  ]);

  const { minutes, seconds } = getTime(Number(time));

  return (
    <div
      tabIndex={0}
      className={`flex place-content-center place-items-center w-screen h-screen ${status == 0 ? "bg-red-100" : status == 1 ? "bg-green-100" : "bg-blue-100"}`}
    >
      <div id="main" className="flex flex-col place-content-center ">
        <div id="status" className="w-full flex flex-row place-content-center">
          <div
            className={`flex flex-row place-content-center py-2 px-4 place-items-center rounded-full w-fit space-x-2 text-2xl border-2 ${status == 0 ? "border-red-950 text-red-950 bg-red-200" : status == 1 ? "border-green-950 text-green-950 bg-green-200" : "bg-blue-200 border-blue-950 text-blue-950"}`}
          >
            {status ? <LuCoffee /> : <LuBrain />}
            <h1 className="font-fjalla">{statusDict[status]}</h1>
          </div>
        </div>

        <div
          id="timer"
          className={`flex flex-col place-items-center  font-bold text-[16rem] leading-none  my-4 font-bebas-neue place-content-center ${status == 0 ? "text-red-950" : status == 1 ? "text-green-950" : "text-blue-950"}`}
        >
          <span className="-mb-10">{String(minutes).padStart(2, "0")}</span>
          <span className="-mb-8">{String(seconds).padStart(2, "0")}</span>
        </div>

        <div
          id="buttons"
          className={`flex flex-row text-5xl place-content-center place-items-center space-x-2 ${status == 0 ? "text-red-950" : status == 1 ? "text-green-950" : "text-blue-950"}`}
        >
          <button
            className={`${status == 0 ? "bg-red-200" : status == 1 ? "bg-green-200" : "bg-blue-200"}  p-2 rounded-xl`}
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <MdMenu />
          </button>
          <button
            className={`${status == 0 ? "bg-red-400" : status == 1 ? "bg-green-400" : "bg-blue-400"} py-4 px-8 rounded-3xl text-6xl`}
            onClick={() => setPause(!pause)}
          >
            {pause ? <MdPlayArrow /> : <MdPause />}
          </button>

          <button
            className={`${status == 0 ? "bg-red-200" : status == 1 ? "bg-green-200" : "bg-blue-200"}  p-2 rounded-xl`}
          >
            <MdSkipNext
              onClick={() => {
                if (status == 0) {
                  if (!autoBreak) setPause(true);

                  if (count >= longBreakInterval) {
                    setTime(longBreak);
                    setStatus(2);
                    setCount(1);
                  } else {
                    setTime(shortBreak);
                    setStatus(1);
                    setCount(count + 1);
                  }

                  new Audio(breakSound).play();
                } else {
                  if (!autoStart) setPause(true);
                  setTime(pomoTime);
                  setStatus(0);

                  new Audio(pomoSound).play();
                }
              }}
            />
          </button>
        </div>
        <h1 className="text-5xl">
          {autoStart} {autoBreak}
        </h1>
      </div>
    </div>
  );
};

export default Timer;
