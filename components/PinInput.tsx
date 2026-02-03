import React from "react";
import { useState } from "react";


export default function PinInput() {

  function generatePin() {
    return Math.floor(Math.random() * 900) + 100;
  }

  const PIN_LEN = 3;
  const [guess, setGuess] = useState<number[]>([]);
  const [pin, setPin] = useState(() => generatePin());
  

  return (
    <div className="grid grid-cols-2 place-items-center h-125 w-250 bg-gray-600 rounded-4xl ">
      <div className="flex gap-4">
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
