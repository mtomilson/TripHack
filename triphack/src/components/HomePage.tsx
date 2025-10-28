import { CiSearch } from "react-icons/ci";
import React, { useEffect, useRef, useState } from "react";
import Options from "./Options";
import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

export default function HomePage() {
  const autocompleteRef = useRef<ReturnType<
    typeof Radar.ui.autocomplete
  > | null>(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    Radar.initialize(import.meta.env.VITE_RADAR_API_PUBLISH as string);

    autocompleteRef.current = Radar.ui.autocomplete({
      container: "autocomplete",
      width: "600px",
      debounceMS: 400,
      limit: 4,
      placeholder: "Enter Destination...",

      onSelection: (address) => {
        setAddress(address);
      },
    });
    return () => {
      autocompleteRef.current?.remove();
    };
  }, []);

  const callBackend = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/amadeus/search");
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={callBackend} className="hover:cursor-pointer ml-200">
        CLICK ME
      </button>
      <div className="flex flex-col text-center items-center justify-center pt-20 text-3xl">
        <p className="font-bold text-black">
          Welcome to TripHack! Find all your trip planning needs in one spot!
        </p>
        <div className="mt-5">
          <p className="font-bold text-black">Where to?</p>
        </div>

        <div id="autocomplete" className="mt-5 flex w-400 h-12 justify-center">
          {/* <form className="flex items-center w-full max-w-lg border border-black rounded-full overflow-hidden">
            <button className="pl-3 hover:cursor-pointer">
              <CiSearch/>
            </button>
            <input
              type="text"
              placeholder="Enter Destination..."
              id="auto-complete"
              className="flex-1 p-3  outline-none placeholder:text-gray-500 text-sm"
            />
          </form> */}
        </div>
        <div className="mt-4">
          {address === null ? <div>empty</div> : <Options data={address} />}
        </div>
      </div>
    </>
  );
}
