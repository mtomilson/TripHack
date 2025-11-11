import { useState } from "react";
import { CiSearch } from "react-icons/ci";

type AirportQuery = {
  origin: string;
  destination: string;
  departure: string;
  returnDate: string;
  roundTrip: boolean;
};

export default function Flights() {
  const [selectedButton, setSelectedButton] = useState<
    "round-trip" | "One-Way"
  >("round-trip");

  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [roundTrip, setRoundTrip] = useState<boolean>(true);

  const handleSearch = async () => {
    const query: AirportQuery = {
      origin,
      destination,
      departure,
      returnDate,
      roundTrip,
    };

    const params = new URLSearchParams({
      origin: query.origin,
      destination: query.destination,
      departure: query.departure,
      returnDate: query.returnDate,
      roundTrip: String(query.roundTrip),
    });

    try {
      const res = await fetch(
        `http://localhost:5000/api/amadeus/search/flights?${params}`
      );

      const data = await res.json();
      console.log("FLIGHT RESULTS", data);

      // Do something with data...
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="w-[1200px] h-[650px] mb-5 shadow-2xl p-6">
        <p className="text-2xl font-bold mb-6">Find your Flight</p>

        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setSelectedButton("round-trip")}
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
            onClick={handleSearch}
          >
            {" "}
            Search Flights
          </button>
        </div>
      </div>
    </div>
  );
}
