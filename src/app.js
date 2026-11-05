
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import mocksRouter from "./routes/mocks.router.js";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend III - Preentrega 1 funcionando"
  });
});

app.use("/api/mocks", mocksRouter);
app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("Falta configurar MONGO_URI en .env");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado correctamente");

    app.listen(PORT, () => {
      console.log(`Servidor funcionando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar:", error.message);
    process.exit(1);
  }
}

startServer();
