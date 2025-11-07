import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

type OptionProps = {
  propData: any;
};

const SEARCH_ATTRACTIONS = gql`
  query SearchAttractions($longitude: Float!, $latitude: Float!) {
    searchAttractions(longitude: $longitude, latitude: $latitude) {
      name
      price {
        amount
        currencyCode
      }
      id
      bookingLink
      pictures
    }
  }
`;
export default function Options({ propData }: OptionProps) {
  const [attractions, setAttractions] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);


  const { data, loading, error } = useQuery(SEARCH_ATTRACTIONS, {
    variables: { longitude: propData.longitude, latitude: propData.latitude },
  }) as any;

  useEffect(() => {
    if (data?.searchAttractions) {
      setAttractions(data.searchAttractions);
    }
  }, [data]);

  useEffect(() => {
    const preloadImages = () => {
      const nextIndex = (index + 1) % attractions.length;
      const prevIndex = (index - 1 + attractions.length) % attractions.length // if at 0, and hit previous, it should loop to the end of the array, for ex. 0 - 1 + 3 % 3 = 2, whih is end    
      if(attractions[nextIndex]?.pictures[1]) {
        const img1 = new Image();
        img1.src = attractions[nextIndex]?.pictures[1];
      }

      if(attractions[prevIndex]?.pictures[1]) {
        const img2 = new Image();
        img2.src = attractions[prevIndex]?.pictures[1];
      }
    }

      if(attractions.length > 0) {
        preloadImages();
      }


  }, [attractions, index])


  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;

  return (
    <div className="mt-2 shadow-md flex justify-center">
      <div className="w-180 h-100">
        <div className={`flex justify-center mt-5 transition-all duration-300 ease-in-out ${
          isAnimating ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}>
          <img src={attractions[index]?.pictures[1]} className="h-50" alt="no picture haha "/>
        </div>
        <div
          key={`content-${attractions[index]?.id}`}
          className={`mt-5 transition-all duration-300 ease-in-out ${
            isAnimating
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <p className="text-xl font-bold">{attractions[index]?.name}</p>
          <p className="text-lg mt-2">Price: {attractions[index]?.price?.amount} {attractions[index]?.price?.currencyCode}</p>
        </div>
        <div className="h-10 w-100 mt-5 flex justify-between mx-auto">
          <div>
            <button
              onClick={() => {
                if (isAnimating) {
                  return;
                }
                setIsAnimating(true);
                setTimeout(() => {
                  setIndex((index + 1) % attractions.length);
                  setIsAnimating(false);
                }, 300);
              }}
              className="hover:cursor-pointer disabled:cursor-not-allowed"
            >
              <FaXmark color="red" className="ml-2 mt-1" />
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                if (isAnimating) {
                  return;
                }

                setIsAnimating(true);
                setTimeout(() => {
                  setIndex(index + 1);
                  setIsAnimating(false);
                }, 300);
              }}
              className="hover:cursor-pointer"
            >
              <FaPlus  className="mr-2 mt-1 h-6" color="#18DE48" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
