const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const verifyToken = (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(403).send({ error: 'No token provided!' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: 'Unauthorized!' });
    }
    req.id = decoded.id;
    req.role = decoded.role;
    next();
  });
};
module.exports = verifyToken;
