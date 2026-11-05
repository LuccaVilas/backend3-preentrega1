
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export async function generateMockUsers(count = 50) {
  const users = [];
  const hashedPassword = await bcrypt.hash("coder123", 10);

  for (let i = 0; i < count; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      _id: new mongoose.Types.ObjectId(),
      first_name: firstName,
      last_name: lastName,
      email: `${faker.string.uuid()}@example.com`,
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
      __v: 0
    });
  }

  return users;
}

export function generateMockPets(count = 100) {
  const pets = [];

  for (let i = 0; i < count; i++) {
    pets.push({
      _id: new mongoose.Types.ObjectId(),
      name: faker.person.firstName(),
      species: faker.helpers.arrayElement([
        "perro",
        "gato",
        "conejo",
        "ave"
      ]),
      age: faker.number.int({ min: 0, max: 15 }),
      adopted: faker.datatype.boolean(),
      __v: 0
    });
  }

  return pets;
}
