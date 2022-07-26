//@desc     controller to handle user detail related request and pass it to service. 

const userdetailsService = require('../services/userdetailsService');

// @desc      Get all users
// @route     GET /api/v1/users
exports.getUsers = async (req, res) => {
  await userdetailsService.getUsers(req, res);
};

// @desc      Get single user by id
// @route     GET /api/v1/users/:id
exports.getUser = async (req, res) => {
  await userdetailsService.getUser(req, res);
};

// @desc      Create new user
// @route     POST /api/v1/users
exports.createnewUser = async (req, res) => {
  await userdetailsService.createnewUser(req, res);
};

// @desc      Update user by id
// @route     PUT /api/v1/users/:id
exports.updateUser = async (req, res) => {
  await userdetailsService.updateUser(req, res);
};

// @desc      Delete user by id
// @route     DELETE /api/v1/users/:id
exports.deleteUser = async (req, res) => {
  await userdetailsService.deleteUser(req, res);
};
