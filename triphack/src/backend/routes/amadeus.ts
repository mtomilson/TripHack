import { Router } from "express";
import { getAccessToken } from "../utils/amadeusAuth";

const router = Router();

router.get("/search", async (req, res) => {
  try {
    const token = await getAccessToken();
    res.json({access_token: token});
  } catch (error) {
    console.log("error");
  }
});

export default router;