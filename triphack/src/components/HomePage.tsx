import { CiSearch } from "react-icons/ci";
import React, { useEffect, useRef, useState } from "react";
import Options from "./Options";
import Progress from "./Progress";


import type { StepName } from "./Progress";

import Radar from "radar-sdk-js";
import "radar-sdk-js/dist/radar.css";

//import step components 

import Flights from "./step_components/Flights";
import Hotels from "./step_components/Hotels";
import Itinerary from "./step_components/Itinerary";



export default function HomePage() {
  const autocompleteRef = useRef<ReturnType<
    typeof Radar.ui.autocomplete
  > | null>(null);

  const [address, setAddress] = useState(null);
  const [activeStep, setActiveStep] = useState<StepName>("Flights");

  const StepComponentMap: Record<StepName, React.ComponentType> = { // component map, easy to expand and easy to set up Record<key, value> strongly typed cannot be different 
    Flights: Flights,
    Hotel: Hotels,
    Itinerary: Itinerary,
  }

  const handleStepChange = (step: StepName) => {
    // pass this function into the Progress component, when progress calls this function it directly runs in this component
    setActiveStep(step);
    console.log(step);
  };

  const Component = StepComponentMap[activeStep];


  // useEffect(() => {
  //   Radar.initialize(import.meta.env.VITE_RADAR_API_PUBLISH as string);

  //   autocompleteRef.current = Radar.ui.autocomplete({
  //     container: "autocomplete",
  //     width: "600px",
  //     debounceMS: 400,
  //     limit: 4,
  //     placeholder: "Enter Destination...",

  //     onSelection: (address) => {
  //       setAddress(address);
  //     },
  //   });
  //   return () => {
  //     autocompleteRef.current?.remove();
  //   };
  // }, []);

  return (
    <>
      <div className="flex flex-col text-center items-center justify-center pt-20 text-3xl">
        <p className="font-extrabold text-black text-5xl">
          Plan Your Perfect Trip
        </p>
        <div className="mt-5">
          <p className="text-2xl text-gray-500">
            Book flights, hotels, and plan your itinerary all in one place.
          </p>
        </div>

        {/* <div
          id="autocomplete"
          className="mt-5 flex w-400 h-12 justify-center"
        ></div> */}
        <div>
          <Progress onStepChange={handleStepChange} activeStep={activeStep} />
        </div>
          
        <Component/>



        {/* <div className="mt-4">
          {address === null ? <></> : <Options propData={address} />}
        </div> */}
      </div>
    </>
  );
}
