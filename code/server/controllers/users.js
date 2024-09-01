const { json } = require('sequelize');
const User = require('../models/users');

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users) {
      return res.status(404).json({ error: 'no record found' });
    }
    return res.status(200).json({ users });
  } catch {
    return res.status(500).json({ error: 'Database error' });
  }
};
const getUserById = async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findOne({ where: id });
    if (!user) {
      return res.status(404).json({ error: 'no record found.' });
    }
    return res.status(200).json({ user });
  } catch {
    return res.status(500).json({ error: 'database error' });
  }
};
module.exports = { getUsers, getUserById };
