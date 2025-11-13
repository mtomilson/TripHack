import React from "react";
import { MdArrowRightAlt } from "react-icons/md";
import { GoDot } from "react-icons/go";
import { CiClock2 } from "react-icons/ci";
import { MdFlight } from "react-icons/md";

import { airlineImages } from "../../metadata/airlines";

type PropData = {
  flight: any;
};

export default function FlightsOptions({ flight }: PropData) {
  const origin = flight.departureFlight.segments[0].departure.iataCode;
  let length = flight.departureFlight.segments.length;
  const arrival =
    flight?.departureFlight?.segments[length - 1]?.arrival.iataCode;
  let duration = flight.departureFlight.duration;

  const hoursMatch = duration.match(/(\d+)H/);
  const minutesMatch = duration.match(/(\d+)M/);

  let hours = hoursMatch ? hoursMatch[1] : "0";
  let minutes = minutesMatch ? minutesMatch[1] : "0";
  const carrierCode = flight.departureFlight.segments[0].carrierCode;

  const img = airlineImages[carrierCode];
  return (
    <div>
      <button className="appearance-none bg-transparent border-none p-0 m-0 text-left w-full hover:cursor-pointer">
        <div className="mt-5 rounded-xl border-3 border-unselected h-30 flex justify-between items-center">
          <div className="flex items-center gap-3 ml-3">
            <img
              src={img}
              alt={`${carrierCode} logo`}
              className="w-20 h-15 object-contain"
            />
            <div>
              <div className="ml-3 flex items-center">
                <p className="font-semibold">{origin}</p>
                <MdArrowRightAlt className="mt-1" size="25" />
                <p className="font-semibold">{arrival}</p>
              </div>
              <div className="flex items-center">
                <CiClock2 size="18" className="ml-1 mr-1" />
                <p className="text-[18px] text-gray-600">
                  {hours}h {minutes}m
                </p>
                <GoDot size="10" className="ml-1 mr-1 mt-1" />
                <p className="text-[15px] text-gray-600">
                  {length - 1 === 0 && `Direct`}{" "}
                  {length - 1 === 1 && `${length - 1} stop`}{" "}
                  {length - 1 > 1 && `${length - 1} stops`}{" "}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="mr-3 text-[20px] text-primary font-bold">
              ${flight.price.total}
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}
