
import { Router } from "express";
import User from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      status: "success",
      count: users.length,
      payload: users
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

export default router;
