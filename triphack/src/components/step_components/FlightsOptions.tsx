import React from "react";

type PropData = {
  propData: any;
};

export default function FlightsOptions({ propData }: PropData) {
    if(!propData) {
        return (
            <div>

            </div>
        )
    }


  return (
    <div>
      <div>
        {propData?.searchFlights[0]?.departureFlight?.duration}
      </div>    
    </div>
  );
}
