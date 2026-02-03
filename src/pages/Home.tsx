import PinInput from "../../components/PinInput";

function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center bg-white h-screen w-screen">
      <div className="flex flex-row items-center justify-between w-full px-4 -mt-12 mb-15">
        <p className="font-bold text-black"> $0 </p>

        <h1 className="text-black"> Guess the pin! </h1>

        <div className="flex flex-col items-center justify-center h-20 w-20 bg-cyan-400 rounded-3xl">
          <p className="text-center text-black"> Inventory </p>
        </div>
      </div>

      {/* <div className="flex flex-col items-center justify-center h-125 w-250 bg-gray-300 rounded-4xl ">
        <p className="text-4xl font-extrabold">* * *</p>
      </div> */}
      <PinInput />
    </div>
  );
}

export default Home;
