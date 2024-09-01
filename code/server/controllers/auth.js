const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/users'); // Import User model
const dotenv = require('dotenv');
dotenv.config();

// Function to handle user login
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(200).json({ error: 'Invalid email or password' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(200).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });

    delete user.dataValues.password;

    res.status(200).json({ data: { user, token } });
  } catch (error) {
    res.status(500).json({ error: 'Database query error' + error });
  }
};

// Function to handle user registration
const userRegister = async (req, res) => {
  const { fullName, email, password, phoneNo, address, role, orgId } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(200).json({ error: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    const id = crypto.randomBytes(8).toString('hex');
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      id,
      phoneNo,
      address,
      role,
      orgId,
    });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '14d',
    });

    delete user.dataValues.password;

    res.status(201).json({ success: 'User registered successfully', data: { user, token } });
  } catch (error) {
    res.status(500).json({ error: 'Database query error:' + error });
  }
};
module.exports = { userLogin, userRegister };
