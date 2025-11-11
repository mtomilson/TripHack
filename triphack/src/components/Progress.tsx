import React from "react";
import { IoAirplaneSharp } from "react-icons/io5";
import { FaHotel } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

export type StepName = "Flights" | "Hotel" | "Itinerary";

type ProgressProps = {
    onStepChange: (step: StepName) => void;
    activeStep: StepName
}

export default function Progress({ onStepChange, activeStep}: ProgressProps) {
    

    type Step = {
    num: number;
    name: StepName;
    icon: React.ComponentType;
  };

  const steps: Step[] = [
    { num: 1, name: "Flights", icon: IoAirplaneSharp },
    { num: 2, name: "Hotel", icon: FaHotel },
    { num: 3, name: "Itinerary", icon: FaCalendar },
  ];

  return (
    <div className="mt-15 flex justify-between  w-100">

      {steps.map((step, i) => {
        const Icon = step.icon;
        const isActive = step.name === activeStep;
        

        const stepObj = steps.find(step => step.name === activeStep)
        const activeIndex = stepObj?.num || 0;
        
        return (
          <>
            <button className="flex flex-col items-center hover:cursor-pointer" onClick={() => onStepChange(step.name)}>
              <Icon size={50} color={`${i < activeIndex ? "#3F84E5" : "#a8a8a7"}`} />

              <div className="mt-2">
                <p className={`${isActive ? "text-primary font-bold" : "text-unselected"}`}>{step.name}</p>
              </div>
            </button>

            {i < steps.length - 1 && (
              <div className={`w-20 h-1  mt-6 ${i < activeIndex - 1 ? "bg-gradient-to-r from-primary to-secondary" : "bg-unselected"}`}/>

           
            )}
          </>
        );
      })}

      {/* <div className="mt-15 flex justify-between  w-100">
          <div className="">
            <button  className="hover:cursor-pointer">
              <IoAirplaneSharp size="50" color="#FF5E5B"/>
            </button>
          </div>
          <div className="w-20 h-1  mt-6 bg-gradient-to-r from-primary to-secondary"></div>

          <div className="">
            <button className="hover:cursor-pointer bg-primary w-17 h-17 flex justify-center items-center rounded-xl">
              <FaHotel size="50" color="white"/>
            </button>
          </div>
          <div className="w-20 h-1  mt-6 bg-gradient-to-r from-primary to-secondary"></div> 
          <div className="">
            <button className="hover:cursor-pointer">
              <FaCalendar size="50" color="#FF5E5B" />
            </button>
          </div>
        </div> */}
    </div>
  );
}
