// Imports are always at the top
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// Main function
async function main() {
  const newUser = await prisma.user.create({
    data: {
      name: "test-name 1",
      username: "test-username 1",
      email: "testEmail1@somehost.com",
      phoneNumber: "9905301273",
      password: "test-password 1",
      otp: "1234",
      otpExpires: new Date().toISOString(),
    },
  });
  const users = await prisma.user.findMany();
  console.log(users);
}

main();
