import React from "react";

type PropData = {
  flight: any;
};

export default function FlightsOptions({ flight }: PropData) {
    return (
    <div>
      <div className="mt-5 rounded-xl border h-30">
        <p>
            {flight.price.total} {flight.price.currency}
        </p>
        <p>
            {flight.departureFlight.duration}
        </p>
      </div>
    </div>
  );
}
