
import { Router } from "express";
import Pet from "../models/pet.model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find();

    res.json({
      status: "success",
      count: pets.length,
      payload: pets
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

export default router;
