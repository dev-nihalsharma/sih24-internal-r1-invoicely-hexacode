const crypto = require('crypto');
const Invoice = require('../models/invoice');
const sendEmail = require('../utils/sendEmail');
const User = require('../models/users');
const { send } = require('process');
// Fetch invoices by id
const fetchInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Database query error: ' + error.message });
  }
};

const fetchMyInvoices = async (req, res) => {
  const id = req.id;
  try {
    const invoices = await Invoice.findAll({ where: { createdBy: id } });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: 'Database query error: ' + error.message });
  }
};

//fetch invoice by its id without login
const fetchInvoiceById = async (req, res) => {
  const id = req.params.id;
  try {
    const invoice = await Invoice.findOne({ where: { id } });
    res.status(200).json({ invoice });
  } catch (error) {
    res.status(500).json({ error: 'error in fetching invoice' });
  }
};

// Create a new invoice
const createInvoice = async (req, res) => {
  const {
    fromName,
    invoiceType,
    invoiceName,
    fromAddress,
    fromPhone,
    toPhone,
    toName,
    toAddress,
    items,
    totalAmount,
  } = req.body;
  const id = crypto.randomBytes(16).toString('hex');
  const date = new Date().toISOString().split('T')[0];

  try {
    // Create invoice and fetch emails in parallel
    const invoice = await Invoice.create({
      id,
      createdBy: req.id,
      invoiceType: invoiceType,
      invoiceName: invoiceName,
      fromName: fromName,
      fromPhone: fromPhone,
      fromAddress: fromAddress,
      toName: toName,
      toPhone: toPhone,
      toAddress: toAddress,
      date,
      items: items,
      totalAmount: totalAmount,
    });

    res.status(201).json({ success: 'Invoice created successfully', data: invoice });
  } catch (error) {
    res.status(500).json({ error: 'Database query error: ' + error.message });
  }
};

// delete an invoice by invoideId
const deleteInvoice = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await Invoice.destroy({ where: { id } });
    if (result === 0) {
      res.status(404).json({ error: 'Invoice not found' });
    } else {
      res.status(200).json({ success: 'Invoice deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query error: ' + error.message });
  }
};
// edit an invoice by id
const editInvoice = async (req, res) => {
  // const { fromName, fromAddress, toName, toAddress, items, totalAmount } = req.body;
  const id = req.params.id;
  try {
    let invoice = await Invoice.findOne({ where: { id } });

    if (!invoice) {
      res.status(404).json({ error: 'Invoice not found' });
    }

    const result = await Invoice.update(req.body, { where: { id } });
    console.log(result);
    if (result[0] === 0) {
      res.status(404).json({ error: 'Failed to update Invoice' });
    } else {
      invoice = await Invoice.findOne({ where: { id } });
      res.status(200).json({ success: 'Invoice updated successfully', invoice });
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query error: ' + error.message });
  }
};

module.exports = {
  fetchInvoices,
  fetchMyInvoices,
  createInvoice,
  deleteInvoice,
  editInvoice,
  fetchInvoiceById,
};
