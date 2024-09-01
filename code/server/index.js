const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const invoiceRoutes = require('./routes/invoice');
const userRoute = require('./routes/users');
const statsRoute = require('./routes/stats');
const sequelize = require('./database/connection');

dotenv.config();
sequelize.sync();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/users', userRoute);
app.use('/stats', statsRoute);

app.listen(port, () => {
  console.log(`Server is running at PORT: ${port}`);
});
