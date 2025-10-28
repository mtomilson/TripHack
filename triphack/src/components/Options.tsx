import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

type OptionProps = {
  data: any;
};

export default function Options({ data }: OptionProps) {
  const [activities, setActivities] = useState();
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/amadeus/search?longitude=${data.longitude}&latitude=${data.latitude}&radius=4`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const result = await response.json();
        setActivities(result);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivities();
  }, [data]);



  return (
    <div className="mt-2 shadow-md flex justify-center">
      <div className="w-180 h-100">
        <h1 className="font-bold">Activities</h1>

        <p className="text-xl">{activities?.data[index].name}</p>
        <div className="flex justify-center mt-5">
          <img src={activities?.data[index].pictures[1]} className="h-50" />
        </div>
        <div className="h-10 w-100 mt-5 flex justify-between mx-auto">
          <div>
            <button disabled={index === 0} onClick={() => {setIndex(index - 1)}} className="hover:cursor-pointer disabled:cursor-not-allowed">
              <FaArrowLeft className="ml-2 mt-1" />
            </button>
          </div>
          <div>
            <button onClick={() => {setIndex(index + 1)}} className="hover:cursor-pointer">
              <FaArrowRight className="mr-2 mt-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
