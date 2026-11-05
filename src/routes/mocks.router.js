
import { Router } from "express";

import User from "../models/user.model.js";
import Pet from "../models/pet.model.js";

import {
  generateMockUsers,
  generateMockPets
} from "../utils/mocking.js";

const router = Router();

router.get("/mockingpets", (req, res) => {
  const pets = generateMockPets(100);

  res.json({
    status: "success",
    payload: pets
  });
});

router.get("/mockingusers", async (req, res) => {
  try {
    const count = Number(req.query.count ?? 50);

    if (!Number.isInteger(count) || count < 1 || count > 500) {
      return res.status(400).json({
        status: "error",
        message: "count debe ser un entero entre 1 y 500"
      });
    }

    const users = await generateMockUsers(count);

    res.json({
      status: "success",
      payload: users
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

router.post("/generateData", async (req, res) => {
  try {
    const { users, pets } = req.body;

    const valid = (value) =>
      typeof value === "number" &&
      Number.isInteger(value) &&
      value >= 0 &&
      value <= 500;

    if (!valid(users) || !valid(pets)) {
      return res.status(400).json({
        status: "error",
        message: "users y pets deben ser números enteros entre 0 y 500"
      });
    }

    const mockUsers = await generateMockUsers(users);
    const mockPets = generateMockPets(pets);

    const insertedUsers = users > 0
      ? await User.insertMany(mockUsers)
      : [];

    const insertedPets = pets > 0
      ? await Pet.insertMany(mockPets)
      : [];

    res.status(201).json({
      status: "success",
      message: "Datos generados correctamente",
      insertedUsers: insertedUsers.length,
      insertedPets: insertedPets.length
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

export default router;
