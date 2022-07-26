const express = require('express');
const {
  getUsers,
  getUser,
  createnewUser,
  updateUser,
  deleteUser,
} = require('../controllers/userdetails');

const router = express.Router();

router.route('/').get(getUsers).post(createnewUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
