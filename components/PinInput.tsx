import React from "react";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function PinInput() {
  const [pinNumber, setPinNumber] = useState("");
  const [counter, setCounter] = useState(0);

  const pin: number[] = [];

  function handlePinChange(number) {
    setPinNumber(number.target.value);
  }

  const incrementCounter = () => {
    setCounter(counter + 1);
  };

  const decrementCounter = () => {
    if (counter !== 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-125 w-250 bg-gray-300 rounded-4xl ">
      <ChevronUp />
      <div className="flex flex-row justify-between">
        <p className="text-4xl font-extrabold">*</p>
        <p className="text-4xl font-extrabold">*</p>
        <p className="text-4xl font-extrabold">*</p>
      </div>
      <ChevronDown />
    </div>
  );
}
