//@desc     service to handle logic based on the request. 

const Userdetails = require('../models/Userdetails');
const ErrorResponse = require('../utils/errorResponse');

// @desc      Get all users
// @route     GET /api/v1/users
exports.getUsers = async (req, res) => {
  const userdetails = await Userdetails.find();

  res
    .status(200)
    .json({ success: true, count: userdetails.length, data: userdetails });
};

// @desc      Get single user by id
// @route     GET /api/v1/users/:id
exports.getUser = async (req, res) => {
  const userdetail = await Userdetails.findById({ _id: req.params.id });

  if (!userdetail) {
    return res
      .status(400)
      .json(
        new ErrorResponse(
          400,
          false,
          `No user found for the entered id: ${req.params.id}`
        )
      );
  }

  res.status(200).json({ success: true, data: userdetail });
};

// @desc      Create new user
// @route     POST /api/v1/users
exports.createnewUser = async (req, res) => {
  try {
    //Create new user
    const userdetail = await Userdetails.create(req.body);
    res.status(201).json({ success: true, data: userdetail });
  } catch (err) {
    res
      .status(400)
      .json(
        new ErrorResponse(
          400,
          false,
          `Duplicate key found. The user id: ${req.body._id} already present.`
        )
      );
  }
};

// @desc      Update user by id
// @route     PUT /api/v1/users/:id
exports.updateUser = async (req, res) => {
  if (req.body._id != null && req.params.id !== req.body._id) {
    return res
      .status(400)
      .json(
        new ErrorResponse(
          400,
          false,
          `The parameter :id and the _id in the body does not match`
        )
      );
  }

  //Find the user by id
  let userdetail = await Userdetails.findById({ _id: req.params.id });

  if (!userdetail) {
    return res
      .status(400)
      .json(
        new ErrorResponse(
          400,
          false,
          `No user found for the following id: ${req.params.id}`
        )
      );
  }

  //Update the userdetails with the details from the req.body
  userdetail = await Userdetails.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: userdetail });
};

// @desc      Delete user by id
// @route     DELETE /api/v1/users/:id
exports.deleteUser = async (req, res) => {
  const userdetail = await Userdetails.findById(req.params.id);

  if (!userdetail) {
    return res
      .status(400)
      .json(
        new ErrorResponse(
          400,
          false,
          `No user found for the following id: ${req.params.id}`
        )
      );
  }

  //remove the user from DB
  userdetail.remove();

  res.status(200).json({ success: true, data: {} });
};
