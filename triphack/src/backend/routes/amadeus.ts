import { Router } from "express";
import { getAccessToken } from "../utils/amadeusAuth";


const router = Router();

router.get("/search", async (req, res) => {
  try {
    const token = await getAccessToken();
    const { longitude, latitude } = req.query;
    console.log(longitude, latitude);

    const response = await fetch(`https://test.api.amadeus.com/v1/shopping/activities?longitude=${longitude}&latitude=${latitude}&radius=4`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.get("/search/flights", async (req, res) => {
  try {
    const token = await getAccessToken();
    const { origin, destination, departure, returnDate, roundTrip }= req.query;
    if(origin === "" || destination === "" || departure === "") {
      return res.status(400).json({error: "missing fields"});
    }

    const isRoundTrip = roundTrip === "true";

    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departure}&adults=1${isRoundTrip ? `&returnDate=${returnDate}` : ""}&currencyCode=USD`;
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
  }

  
})

export default router;