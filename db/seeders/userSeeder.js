// model User {
//     id       Int       @id @default(autoincrement())
//     username String    @unique
//     email    String    @unique
//     posts    Post[]
//     Comment  Comment[]
//   }


const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient();
const prismaErrorHandler = require('../../utils/prismaErorrHandler.js')

const createRandomUsers = async (count) => {
    const newUsers = [];
    for (let i = 0;i < count;i++) {
        newUsers.push({
            username: faker.internet.userName(),
            email: faker.internet.email(),
        })
    }

    try {
        const count = await prisma.user.createMany({
            data: newUsers
        })
        console.log(count + ' users have been created ')
    } catch (err) {
        const newError = prismaErrorHandler(err)
        throw new newError
    }
}

createRandomUsers(50);