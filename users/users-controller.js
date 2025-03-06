const express = require ('express');
const router = express.Router();
const Joi = require ('joi');
const validateRequest = require ('_middleware/validate-request');
const Role = require ('_helpers/role');
const userService = require ('./user.service');


router.get('/', getAll);
router.get('/', getById);
router.get('/', createSchema, create);
router.get('/', updateSchema, update);
router.get('/:id', _delete);

module.exports = router;


function getAll(req, res,next ) {
    userService.getAll()
    .then(users => res.json(users))
    .catch(next);
}

function getById(req, res, next){
    userService.getById(req.params.id)
    .then(user => res.json(user))
    .catch (next);
}

function create (req, res, next) {
    userService.create(req.body)
    .then(() => res.json({message: 'User creater'}))
    .catch(next);
}

function update (req, res, next) {
    userService.update(req.params.id, req.body)
    .then(() => res.json({message: 'User updated'}))
    .catch(next);
}

function update (req, res, next) {
    userService.delete(req.params.id)
    .then(() => res.json({message: 'User deleted'}))
    .catch(next);
}

function createSchema(req, res, next ){
    const schema = Joi.object({
        title : Joi.string().required(),
        firstname : Joi.string().required(),
        lastname : Joi.string().required(),
        role : Joi.string().valid(Role.Admin, Role.User).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required()
    });
    validateRequest(req,next,schema);
}
function updateSchema(req, res, next ){
    const schema = Joi.object({
        title : Joi.string().empty(''),
        firstname : Joi.string().empty(''),
        lastname : Joi.string().empty(''),
        role : Joi.string().valid(Role.Admin, Role.User).empty(''),
        email : Joi.string().email().empty(''),
        password : Joi.string().min(6).empty(''),
        confirmPassword: Joi.string().valid(Joi.ref('password')).empty('')})
        .with('password', 'confirmPassword');
        validateRequest(req, next ,schema);
    }