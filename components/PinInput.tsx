import React from "react";
import { useState, useEffect } from "react";

export default function PinInput() {
  function generatePin() {
    return String(Math.floor(Math.random() * 1000)).padStart(3, "0");
  }
  function handleBuy() {
    if (!selectedItem) return;

    const item = items.find((i) => i.id === selectedItem);
    if (!item) return;

    if (money < item.price) return;

    setMoney((m) => m - item.price);
    // apply upgrade
    if (item.id === "vest") setHasVest(true);
    if (item.id === "reveal") setRevealCount((c) => c + 1);
    if (item.id === "life") setExtraLives((l) => l + 1);


    setSelectedItem(null);

    setRound((r) => r + 1)

  }

  function winOrLose() {
    let win = 0

    if (isCorrect) {
      win += 10
    }

    win += 1


  }

  type ShopItemId = "vest" | "reveal" | "life"


  const PIN_LEN = 3;

  const [selectedItem, setSelectedItem] = useState<ShopItemId | null>(null);

  const [hasVest, setHasVest] = useState(false)
  const [revealCount, setRevealCount] = useState(0);
  const [extraLives, setExtraLives] = useState(0)

  const [guess, setGuess] = useState<number[]>([]);
  const [pin, setPin] = useState(() => generatePin());
  const [round, setRound] = useState<number>(1);
  const [money, setMoney] = useState<number>(0);

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
      setRound((r) => {
        setMoney((m) => m + 1000 + Math.round(100 * r * Math.random()));
        winOrLose()

        return r + 1;
      });

      const timeout = setTimeout(() => {
        setGuess([]);
        setPin(generatePin());
      }, 800);

      return () => clearTimeout(timeout);
    }
  }, [isCorrect]);

  console.log(pin);

  const items = [
    { id: "vest" as const, name: "Bulletproof Vest", price: 1000 },
    { id: "reveal" as const, name: "Digit Reveal", price: 1500 },
    { id: "life" as const, name: "Extra Life", price: 2000 },
  ]

  const store = (
    <div className="fixed inset-0 bg-amber-500 flex items-center justify-center z-50">
      <div className="bg-white h-3/4 w-3/4 rounded-3xl flex flex-col items-center justify-center">
        SHOP
        <div className="mt-3">
          ${money}
        </div>
        <div className="self-center flex w-full justify-between mt-42 px-4">
          {items.map((item) => {
            const isSelected = selectedItem === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item.id)}
                className={[
                  "text-center h-30 w-35 rounded-2xl bg-purple-400",
                  "flex flex-col items-center justify-center",
                  "border-4",
                  isSelected ? "border-black" : "border-transparent",
                ].join(" ")}
              >
                <p>{item.name}</p>
                <p className="mt-2">${item.price}</p>
              </button>
            );
          })}
        </div>
        <button className="mt-auto mb-6 bg-black border-4 border-amber-50"
          onClick={handleBuy}
        > Buy </button>
      </div>

    </div>)
  const inventory = (
    <div className="flex flex-col items-center justify-center h-20 w-20 bg-cyan-400 rounded-3xl">
      <p className="text-center text-black"> Inventory </p>
      {round % 5 == 0 && store}
    </div>
  );

  return (

    <div className="grid grid-cols-2 place-items-center h-125 w-250 bg-gray-600 rounded-4xl ">
      <div className="flex gap-4">
        <div>
          <p>${money}</p>
          <h2>Round {round}</h2>
        </div>
        <div>
          <p>{helpPin()}</p>
        </div>
        <div>
          <p> {inventory} </p>
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
