const Userdetails = require('../models/Userdetails');

// @desc      Get all users
// @route     GET /api/v1/users
// @access    Public
exports.getUsers = async (req, res) => {
  const userdetails = await Userdetails.find();
  res
    .status(200)
    .json({ success: true, count: userdetails.length, data: userdetails });
};

// @desc      Get single user by id
// @route     GET /api/v1/users/:id
// @access    Public
exports.getUser = async (req, res) => {
  const userdetail = await Userdetails.findById({ _id: req.params.id });

  if (!userdetail) {
    return res.status(401).json({
      success: false,
      error: `No user found for the endtered id: ${req.params.id}`,
    });
  }

  res.status(200).json({ success: true, data: userdetail });
};

// @desc      Create new user
// @route     POST /api/v1/users
// @access    Public
exports.createnewUser = async (req, res) => {
  try {
    const userdetail = await Userdetails.create(req.body);
    res.status(201).json({ success: true, data: userdetail });
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
};

// @desc      Update user by id
// @route     PUT /api/v1/users/:id
// @access    Public
exports.updateUser = async (req, res) => {
  let userdetail = await Userdetails.findById({ _id: req.params.id });

  if (!userdetail) {
    return res.status(401).json({
      success: false,
      error: `No user found for the following id: ${req.params.id}`,
    });
  }
  
  userdetail = await Userdetails.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: userdetail });
};

// @desc      Delete user by id
// @route     DELETE /api/v1/users/:id
// @access    Public
exports.deleteUser = async (req, res) => {
  const userdetail = await Userdetails.findById(req.params.id);

  if (!userdetail) {
    return res.status(401).json({
      success: false,
      error: `No user found for the following id: ${req.params.id}`,
    });
  }

  userdetail.remove();

  res.status(200).json({ success: true, data: {} });
};