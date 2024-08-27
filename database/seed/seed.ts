import { PrismaClient, account_user } from "@prisma/client";

const prisma = new PrismaClient();

const account_user_data: account_user[] = [
  {
    id: 1,
    username: "Jack",
    name: "Chris",
    password: "12345",
    is_parent: true,

    // Add other field values as needed
  },
  // Add more objects for additional seed data
];

async function seed() {
  try {
    await prisma.account_user.createMany({
      data: account_user_data,
    });
    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();

// INSERT INTO account_user (name, username, password, is_parent) VALUES
// ('Chris', 'Chris', '123456', TRUE),
// ('Kelly', 'Kelly', '123456', TRUE),
// ('Troy', 'Troy', '6265', FALSE);
