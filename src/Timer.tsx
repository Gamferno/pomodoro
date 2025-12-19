import { useEffect, useState, useRef } from "react";
import type { Status } from "./types";
import { LuBrain, LuCoffee } from "react-icons/lu";
import { FaPause } from "react-icons/fa";
import { MdSkipNext, MdMenu, MdPause, MdPlayArrow } from "react-icons/md";
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
  let total_second = parseInt(Math.floor(miliseconds / 1000)); // 160
  let total_minutes = Math.floor(total_second / 60); // 2 // 2:40

  let seconds = parseInt(total_second % 60);
  let minutes = parseInt(total_minutes % 60);

  return { seconds: seconds, minutes: minutes };
};

interface DisplayTime {
  minutes: number;
  seconds: number;
}

const Timer = ({
  pomoTime,
  shortBreak,
  longBreak,
  toggle,
  setToggle,
  longBreakInterval,
}) => {
  const [time, setTime] = useState<Number>(pomoTime);
  const [short_break, setSB] = useState<Number>(shortBreak);
  const [long_break, setLB] = useState<Number>(longBreak);
  const [status, setStatus] = useState<number>(0);
  const [count, setCount] = useState<number>(1);
  const [pause, setPause] = useState<boolean>(true);
  const [displayTime, setDisplayTime] = useState<DisplayTime>({
    minutes: pomoTime / 60000,
    seconds: pomoTime % 60000,
  });

  const [color, setColor] = useState<String>("red");

  const statusDict: String[] = ["Focus Time", "Short Break", "Long Break"];
  // const colorList: String[] = ["red", "green", "blue"];

  useEffect(() => {
    if (!pause) {
      const currentDisplayTime = getTime(time);
      setDisplayTime({
        minutes: currentDisplayTime.minutes,
        seconds: currentDisplayTime.seconds,
      });
      const timer = setTimeout(() => {
        if (time) {
          setTime(time - 1000);
        } else if (time == 0) {
          if (status == 0) {
            new Audio("./assets/break.wav").play();
            if (count == longBreakInterval) {
              setTime(longBreak);
              setStatus(2);
              setCount(1);
            } else {
              setTime(shortBreak);
              setStatus(1);
              setCount(count + 1);
            }
          } else {
            setTime(pomoTime);
            setStatus(0);

            new Audio("./assets/focus.wav").play();
          }
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [time, pause]);

  return (
    <div
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
          <span className="-mb-10">
            {String(displayTime.minutes).padStart(2, "0")}
          </span>
          <span className="-mb-8">
            {String(displayTime.seconds).padStart(2, "0")}
          </span>
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
                  if (count == longBreakInterval) {
                    setTime(longBreak);
                    setStatus(2);
                    setCount(1);
                  } else {
                    setTime(shortBreak);
                    setStatus(1);
                    setCount(count + 1);
                  }

                  new Audio("./assets/break.wav").play();
                } else {
                  setTime(pomoTime);
                  setStatus(0);

                  new Audio("./assets/focus.wav").play();
                }
              }}
            />
          </button>
        </div>
        <h1 className="text-5xl">{count}</h1>
      </div>
    </div>
  );
};

export default Timer;
