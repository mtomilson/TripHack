import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { typeDefs } from "../backend/graphql/schemas/attractionsSchema"

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

  const { data, loading, error } = useQuery(SEARCH_ATTRACTIONS, {
    variables: { longitude: propData.longitude, latitude: propData.latitude },
  }) as any;


  useEffect(() => {
    if (data?.searchAttractions) {
      setAttractions(data.searchAttractions);
    }
  }, [data]);

  if (loading) return <p>Loading</p>;
  if (error) return <p>error</p>;


  return (
    <div className="mt-2 shadow-md flex justify-center">
      <div className="w-180 h-100">
        <h1 className="font-bold">Activities</h1>

        <p className="text-xl">{attractions[index]?.name}</p>
        <div className="flex justify-center mt-5">
          <img src={attractions[index]?.pictures[1]} className="h-50" />
        </div>
        <div className="h-10 w-100 mt-5 flex justify-between mx-auto">
          <div>
            <button
              disabled={index === 0}
              onClick={() => {
                setIndex(index - 1);
              }}
              className="hover:cursor-pointer disabled:cursor-not-allowed"
            >
              <FaArrowLeft className="ml-2 mt-1" />
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                setIndex(index + 1);
              }}
              className="hover:cursor-pointer"
            >
              <FaArrowRight className="mr-2 mt-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
