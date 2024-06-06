const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');
const slugify = require('slugify');
const prisma = new PrismaClient();

// model Post {
//     id         Int @id @default (autoincrement())
//     name       String
//     slug       String @unique
//     image      String ?
//         content    String @db.Text
//     published  Boolean @default (true)
//     createdAt  DateTime @default (now())
//     updatedAt  DateTime @updatedAt
//     category   Category @relation(fields: [categoryId], references: [id])
//     categoryId Int
//     tags       Tag[]
//     User       User ? @relation(fields: [userId], references: [id])
//     userId     Int ?
//         comments   Comment[]
// }



const createRandomPosts = async function (totalPosts) {
    const categories = await prisma.category.findMany();
    const tags = await prisma.tag.findMany();
    const users = await prisma.user.findMany({
        take: 50
    });
    const newPosts = []

    for (let i = 0;i < totalPosts;i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomTags = faker.helpers.arrayElements(tags, Math.floor(Math.random() * tags.length) + 1);
        const randomUser = users[Math.floor(Math.random() * users.length)];
        const name = faker.lorem.words(3);
        newPosts.push({
            name,
            slug: slugify(name),
            image: faker.image.urlLoremFlickr({ category: 'cats' }),
            content: faker.lorem.paragraphs(1),
            published: faker.datatype.boolean(),
            categoryId: randomCategory.id,
            userId: randomUser.id,
            tags: {
                connect: randomTags.map(tag => ({ id: tag.id }))
            }
        })
    }

    const createdPosts = [];

    try {
        for await (const newPost of newPosts) {
            const createdPost = await prisma.post.create({
                data: newPost
            });
            createdPosts.push(createdPost);
        }


    } catch (error) {
        console.error(error);
    }

    console.log(`${createdPosts.length} posts have been succesfully created`);
    return createdPosts;
};

createRandomPosts(50);