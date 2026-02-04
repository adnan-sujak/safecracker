import React from "react";
import { useState, useEffect } from "react";

export default function PinInput() {
  function generatePin() {
  return String(Math.floor(Math.random() * 1000)).padStart(3, "0");
}

  
  const PIN_LEN = 3;
  const [guess, setGuess] = useState<number[]>([]);
  const [pin, setPin] = useState(() => generatePin());
  const [round, setRound] =useState<number>(1);
  
  const guessStr = guess.join("");
  const isComplete = guess.length === PIN_LEN;
  const isCorrect = isComplete && guessStr === pin;

  function helpPin() {
    if (!isComplete) return "";
    if (isCorrect) return "Correct! Next round";
    if (guessStr > pin) return "Too high!";
    return "Too low!";
  }

  useEffect(() => {
    if (isCorrect) {
      setRound((r) => r + 1);
  
      const timeout = setTimeout(() => {
        setGuess([]);
        setPin(generatePin());
      }, 800);
  
      return () => clearTimeout(timeout);
    }
  }, [isCorrect]);
  
  

  console.log(pin);

  

  return (
    <div className="grid grid-cols-2 place-items-center h-125 w-250 bg-gray-600 rounded-4xl ">
      <div className="flex gap-4">
        <div>
          <h2>Round {round}</h2>
        </div>
        <div>
          <p>{helpPin()}</p>
        </div>

        {Array.from({ length: PIN_LEN }).map((_, i) => (
          <p
            key={i}
            className="text-4xl font-extrabold text-black w-8 text-center"
          >
            {guess[i] !== undefined ? guess[i] : "*"}
          </p>
        ))}
      </div>

      <div className="grid grid-cols-3 grid-rows-4 aspect-3/4 h-115 rounded-3xl bg-red-300">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((key) => (
          <button
            key={key}
            className={key === 0 ? "col-span-2" : undefined}
            onClick={() => {
              setGuess((prev) =>
                prev.length >= PIN_LEN ? prev : [...prev, key],
              );
            }}
          >
            {key}
          </button>
        ))}

        <button onClick={() => setGuess((prev) => prev.slice(0, -1))}>
          del
        </button>
      </div>
    </div>
  );
}
