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
    const { slug } = req.params;
    const { name, content, published } = req.body;
    console.log(slug, name, content, published)

    try {
        const updateData = {};
        if (name !== undefined) {
            updateData.name = name
            updateData.slug = slugify(name)
        };
        if (content !== undefined) updateData.content = content;
        if (published !== undefined) updateData.published = published;

        const updatedPost = await prisma.post.update({
            where: { slug },
            data: updateData,
        });

        return res.json({
            message: `Post with slug ${slug} has successfully been updated`,
            updatedPost,
        });
    } catch (err) {
        next(err);
    }
};



const destroy = async (req, res, next) => {
    const { slug } = req.params;
    try {
        const deletedPost = await prisma.post.delete({
            where: { slug }
        });
        res.json({
            message: `Post with slug ${slug} has successfully been deleted`,
            deletedPost,
        })
    } catch (err) {
        next(err)
    }
};


module.exports = {
    index, show, create, update, destroy
}