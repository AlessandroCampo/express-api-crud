const { PrismaClient } = require("@prisma/client/extension");

const create = async (req, res, next) => {

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