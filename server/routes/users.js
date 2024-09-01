const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwtMiddleware');
const { getUsers,getUserById } = require('../controllers/users')

router.use(verifyToken)
router.post('/',getUsers);
router.post('/userById',getUserById);

module.exports = router;