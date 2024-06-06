const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categories = [
    'Technology',
    'Health',
    'Travel',
    'Food',
    'Fashion',
    'Lifestyle',
    'Education',
    'Entertainment',
    'Business',
    'Finance',
    'Sports',
    'Politics',
    'Science',
    'Art',
    'Music',
    'Photography',
    'Gaming',
    'Books',
    'Movies',
    'DIY',
    'Fitness',
    'Parenting',
    'Relationships',
    'Environment',
    'News'
];


const createCategories = async function (categories) {
    try {
        const newCategories = await prisma.category.createMany({
            data: categories.map(c => ({ name: c })),
            skipDuplicates: true
        });
        console.log(newCategories);
        return newCategories;
    } catch (error) {
        console.error(error);
    }
};

createCategories(categories);