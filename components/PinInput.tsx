import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PinInput() {
  //   const [pinNumber, setPinNumber] = useState("");
  //   const [counter, setCounter] = useState(0);

  // const pin: any = [];

  //   function handlePinChange(number) {
  //     setPinNumber(number.target.value);
  //   }

  //   const incrementCounter = () => {
  //     setCounter(counter + 1);
  //   };

  //   const decrementCounter = () => {
  //     if (counter !== 0) {
  //       setCounter(counter - 1);
  //     }
  //   };



  // for (let i = 1; i <= 9; i++) {
  //   pin.push(<button key={i}>{i}</button>)
  // }


  const [guess, setGuess] = useState<number[]>([])

  return (
    <div className="grid grid-cols-2 place-items-center h-125 w-250 bg-gray-600 rounded-4xl ">
      <div className="flex justify-between">
        <p className="text-4xl font-extrabold text-black">*</p>
        <p className="text-4xl font-extrabold text-black">*</p>
        <p className="text-4xl font-extrabold text-black">*</p>

        {guess}
      </div>

      <div className="grid grid-cols-3 grid-rows-4 aspect-3/4 h-full bg-red-300">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(key =>
          <button
            key={key}
            onClick={() => {
              setGuess(guess => [...guess, key])
            }}
            className={key === 0 ? "col-span-2" : undefined}
          >
            {key}
          </button>
        )}
        <button onClick={() => {
          setGuess(last => last.slice(0, -1))
        }}> del </button>
      </div>

    </div>
  );
}
