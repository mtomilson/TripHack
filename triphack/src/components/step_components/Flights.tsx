import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

import FlightsOptions from "./FlightsOptions";

const SEARCH_FLIGHTS = gql`
  query SearchFlights(
    $origin: String!
    $destination: String!
    $departure: String!
    $returnDate: String
    $roundTrip: Boolean
  ) {
    searchFlights(
      origin: $origin
      destination: $destination
      departure: $departure
      returnDate: $returnDate
      roundTrip: $roundTrip
    ) {
      price {
        total
        currency
      }
      departureFlight {
        duration
        segments {
          arrival {
            iataCode
            time
          }
          departure {
            iataCode
            time
          }
          duration
          carrierCode
        }
      }
      returnFlight {
        duration
        segments {
          arrival {
            iataCode
            time
          }
          departure {
            iataCode
            time
          }
          duration
          carrierCode
        }
      }
    }
  }
`;

export default function Flights() {
  const [selectedButton, setSelectedButton] = useState<
    "round-trip" | "One-Way"
  >("round-trip");

  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [roundTrip, setRoundTrip] = useState<boolean>(true);
  const [searchFlights, { loading, error, data }] =
    useLazyQuery(SEARCH_FLIGHTS);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[1200px] h-[650px] mb-5 shadow-2xl p-6">
        <p className="text-2xl font-bold mb-6">Find your Flight</p>

        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => {
              setSelectedButton("round-trip");
              setRoundTrip(true);
            }}
            className={`w-[120px] h-[40px] flex items-center justify-center text-sm ${
              selectedButton === "round-trip"
                ? "bg-primary text-gray-100"
                : "bg-gray-100 text-primary"
            } rounded-md font-medium transition-colors shadow-sm hover:cursor-pointer hover:opacity-80`}
          >
            Round Trip
          </button>

          <button
            onClick={() => {
              setSelectedButton("One-Way");
              setRoundTrip(false);
            }}
            className={`w-[120px] h-[40px] flex items-center justify-center text-sm ${
              selectedButton === "One-Way"
                ? "bg-primary text-gray-100"
                : "bg-gray-100 text-primary"
            } rounded-md font-medium transition-colors shadow-sm hover:cursor-pointer hover:opacity-80`}
          >
            One Way
          </button>
        </div>
        <div className="w-[200px] h-[30px] flex ml-4">
          <p className="font-medium text-[15px] ">From</p>
        </div>
        <div className="w-full h-[40px] flex">
          <input
            className="placeholder:text-sm placeholder:text-unselected px-4 w-full text-sm focus:border-primary border-unselected border-2 rounded-xl ml-2"
            placeholder="New York (JFK)"
            onChange={(e) => {
              setOrigin(e.target.value);
            }}
          />
        </div>
        <div className="mt-5">
          <div className="w-[200px] h-[30px] flex ml-4">
            <p className="font-medium text-[15px] ">To</p>
          </div>
          <div className="w-full h-[40px] flex">
            <input
              className="placeholder:text-sm placeholder:text-unselected px-4 w-full text-sm focus:border-primary border-unselected border-2 rounded-xl ml-2"
              placeholder="Tokyo (HND)"
              onChange={(e) => {
                setDestination(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="mt-5">
          <div className="w-[200px] h-[30px] flex ml-4">
            <p className="font-medium text-[15px] ">Departure</p>
          </div>
          <div className="w-full h-[40px] flex">
            <input
              type="date"
              className="w-full h-[40px] text-[15px] p-2 border rounded-xl text-unselected bg-white ml-2 border-unselected border-2"
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="w-[200px] h-[30px] flex ml-4">
            <p className="font-medium text-[15px] ">Return</p>
          </div>
          <div className="w-full h-[40px] flex">
            <input
              type="date"
              className="w-full h-[40px] text-[15px] p-2 rounded-xl text-unselected bg-white ml-2 border-unselected border-2"
              onChange={(e) => {
                setReturnDate(e.target.value);
              }}
            />
          </div>
        </div>

        <div>
          <button
            className="w-full bg-primary text-white rounded-xl h-12 justify-center mt-10 hover:cursor-pointer"
            onClick={() =>
              searchFlights({
                variables: {
                  origin: origin,
                  destination: destination,
                  departure: departure,
                  returnDate: returnDate,
                  roundTrip: roundTrip,
                },
              })
            }
          >
            {" "}
            Search Flights
          </button>
        </div>

        <div>
          <FlightsOptions propData={data} />
        </div>
      </div>
    </div>
  );
}
