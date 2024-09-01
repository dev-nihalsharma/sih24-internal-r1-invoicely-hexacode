const express = require('express');
const verifyToken = require('../middlewares/jwtMiddleware');
const {
  fetchInvoices,
  fetchMyInvoices,
  createInvoice,
  deleteInvoice,
  editInvoice,
  fetchInvoiceById,
} = require('../controllers/invoice');

const router = express.Router();
router.get('/:id', fetchInvoiceById);
router.use(verifyToken);
router.post('/fetch-all', fetchInvoices);
router.post('/fetch-my', fetchMyInvoices);
router.post('/add', createInvoice);
router.post('/delete', deleteInvoice);
router.post('/edit/:id', editInvoice);
module.exports = router;
