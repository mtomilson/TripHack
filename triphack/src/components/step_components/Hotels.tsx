import React from "react";
import { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client/react";

const SEARCH_HOTELS = gql`
  query SearchHotels($cityCode: String!) {
    searchHotels(cityCode: $cityCode) {
      hotelId
      name
      chainCode
    }
  }
`;

interface Hotel {
  hotelId: string;
  name: string;
  chainCode: string;
}

interface hotelData {
  searchHotels: Hotel[];
}

export default function Hotels() {
  const [destination, setDestination] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [beds, setBeds] = useState<number>(1);
  const [searchHotels, { loading, error, data }] =
    useLazyQuery<hotelData>(SEARCH_HOTELS);

  const handleGuestChange = (e: number) => {
    if (e <= 0) {
      setGuests(1); // can't have less than 1 guest at a hotel
    } else {
      setGuests(e);
    }
  };

  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <div className="flex justify-center mt-10">
      <div className="w-[1200px] h-auto mb-5 shadow-2xl p-6">
        <p className="text-2xl font-bold mb-6">Find your Hotel</p>

        <div className="flex justify-center gap-3 mb-4"></div>
        <div className="w-[200px] h-[30px] flex ml-4">
          <p className="font-medium text-[15px] ">Destination</p>
        </div>
        <div className="w-full h-[40px] flex">
          <input
            className="placeholder:text-sm placeholder:text-unselected px-4 w-full text-sm focus:border-primary border-unselected border-2 rounded-xl ml-2"
            placeholder="Tokyo (TYO)"
            onChange={(e) => {
              setDestination(e.target.value);
            }}
          />
        </div>

        <div className="mt-5">
          <div className="w-[200px] h-[30px] flex ml-4">
            <p className="font-medium text-[15px] ">Guests</p>
          </div>
          <div className="w-full h-[40px] flex">
            <input
              className="w-full h-[40px] text-[15px] p-2 border rounded-xl bg-white ml-2 border-unselected border-2
              placeholder:text-sm placeholder:text-unselected px-4"
              placeholder="1 Guest"
              type="number"
              value={guests}
              onChange={(e) => handleGuestChange(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="w-[200px] h-[30px] flex ml-4">
            <p className="font-medium text-[15px] ">Check in</p>
          </div>
          <div className="w-full h-[40px] flex">
            <input
              type="date"
              className="w-full h-[40px] text-[15px] p-2 rounded-xl text-unselected bg-white ml-2 border-unselected border-2"
              onChange={(e) => {
                setCheckIn(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="w-[200px] h-[30px] flex ml-4">
            <p className="font-medium text-[15px] ">Check out</p>
          </div>
          <div className="w-full h-[40px] flex">
            <input
              type="date"
              className="w-full h-[40px] text-[15px] p-2 rounded-xl text-unselected bg-white ml-2 border-unselected border-2"
              onChange={(e) => {
                setCheckOut(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="mt-5">
          <div className="w-[200px] h-[30px] flex ml-4">
            <p className="font-medium text-[15px] ">Beds</p>
          </div>
          <div className="w-full h-[40px] flex">
            <input
              className="w-full h-[40px] text-[15px] p-2 rounded-xl bg-white ml-2 border-unselected border-2
              placeholder:text-sm placeholder:text-unselected px-4"
              placeholder="1 Guest"
              type="number"
              value={beds}
              onChange={(e) => {
                if (Number(e.target.value) <= 0) {
                  setBeds(1);
                } else {
                  setBeds(Number(e.target.value));
                }
              }}
            />
          </div>
        </div>
        <div>
          <button
            className="w-full bg-primary text-white rounded-xl h-12 justify-center mt-10 hover:cursor-pointer"
            onClick={() =>
              searchHotels({
                variables: {
                  cityCode: destination
                },
              })
            }
          >
            {" "}
            Search Hotels
          </button>
        </div>
      </div>
    </div>
  );
}
