<<<<<<< HEAD
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.destination.deleteMany();
=======
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  await prisma.destinations.deleteMany({})
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851

  const destinations = [
    {
      name: "Paris",
      location: "France",
      description: "The City of Light, known for the Eiffel Tower and Louvre Museum.",
      imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      name: "Tokyo",
      location: "Japan",
      description: "A bustling metropolis blending ultramodern and traditional.",
      imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
    },
    {
      name: "New York",
      location: "USA",
      description: "The Big Apple, featuring iconic landmarks like Times Square and Central Park.",
      imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
    },
<<<<<<< HEAD
  ];

  await Promise.all(
    destinations.map((destination) =>
      prisma.destination.create({
        data: destination,
      })
    )
  );

  console.log("✅ Seed data inserted successfully");
=======
  ]

  Promise.all(
    destinations.map((destination) =>
      prisma.destinations.create({
        data: destination,
      }),
    ),
  )

  console.log("Seed data inserted successfully")
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
}

main()
  .catch((e) => {
<<<<<<< HEAD
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
=======
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
>>>>>>> a3c8059ba15d313e565573fe079cef40d7902851
