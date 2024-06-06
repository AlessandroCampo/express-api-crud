const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require('slugify');

const create = async (req, res, next) => {
    const { name, content, published } = req.body;
    const data = {
        name, content, published, slug: slugify(name)
    }
    try {
        const newPost = await prisma.post.create({ data })
        return res.json({
            message: 'New post has been succesfully created',
            newPost
        })
    } catch (err) {
        next(err)
    }
};

const index = async (req, res, next) => {
    try {
        const allPosts = await prisma.post.findMany();
        return res.json({
            message: `${allPosts.length} ${allPosts.length > 1 ? 'posts' : 'post'} have been found`,
            allPosts
        })
    } catch (err) {
        next(err)
    }
};


const show = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const foundPost = await prisma.post.findUnique({
            where: { slug }
        });
        if (foundPost) {
            return res.json({
                message: `Post with slug ${slug} has succesfully been retrieved`,
                foundPost
            })
        }
        //TODO - add custom error
        throw new Error(`Post with slug ${slug} has not been found`)
    } catch (err) {
        next(err)
    }
};



const update = async (req, res, next) => {
    try {
        const allPosts = await prisma.post.findMany();
    } catch (err) {
        next(err)
    }
};


const destroy = async (req, res, next) => {
    try {
        const allPosts = await prisma.post.findMany();
    } catch (err) {
        next(err)
    }
};


module.exports = {
    index, show, create, update, destroy
}