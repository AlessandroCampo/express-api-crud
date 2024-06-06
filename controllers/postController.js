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
        res.json({
            message: 'New post has been succesfully created',
            newPost
        })
    } catch (err) {
        throw new Error(err)
    }
};

const index = async (req, res, next) => {
    res.json('This is the index controller')
};


const show = async (req, res, next) => {

};



const update = async (req, res, next) => {

};


const destroy = async (req, res, next) => {

};


module.exports = {
    index, show, create, update, destroy
}