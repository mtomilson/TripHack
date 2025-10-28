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
    console.log(data);
    return res.json(data);
  } catch (error) {
    console.log(error);
  }
});

export default router;