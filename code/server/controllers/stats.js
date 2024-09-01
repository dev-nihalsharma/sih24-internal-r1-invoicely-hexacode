const Invoice = require('../models/invoice');
const { Op, fn, col, literal } = require('sequelize');

const generateResponse = (invoices, groupBy) => {
  const totalAmount = invoices.reduce((acc, curr) => acc + curr.totalAmount, 0);
  const totalInvoice = invoices.length;

  const groupedData = invoices.reduce((acc, curr) => {
    const key = curr[groupBy];
    if (!acc[key]) {
      acc[key] = { totalAmount: 0, totalInvoice: 0 };
    }
    acc[key].totalAmount += curr.totalAmount;
    acc[key].totalInvoice += 1;
    return acc;
  }, {});

  return {
    totalAmount,
    totalInvoice,
    details: groupedData,
  };
};

const giveStats = async (req, res) => {
  try {
    const { date, month, year } = req.body;
    let whereCondition = {};

    if (date) {
      const invoices = await Invoice.findAll({ where: { date } });
      const result = generateResponse(invoices, 'date');
      return res.json(result);
    }
    if (month) {
      const startDate = `${year}-${month}-01`;
      const endDate = `${year}-${month}-31`;
      whereCondition = {
        date: {
          [Op.between]: [startDate, endDate],
        },
      };
      const invoices = await Invoice.findAll({ where: whereCondition });
      const result = generateResponse(invoices, 'date');
      return res.json(result);
    }
    if (year) {
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      whereCondition = {
        date: {
          [Op.between]: [startDate, endDate],
        },
      };
      const invoices = await Invoice.findAll({
        where: whereCondition,
        attributes: [
          [fn('MONTH', col('date')), 'month'],
          [fn('SUM', col('totalAmount')), 'totalAmount'],
          [fn('COUNT', col('id')), 'totalInvoice'],
        ],
        group: [literal('MONTH(date)')],
        order: [literal('MONTH(date)')],
      });

      const monthlyData = invoices.map((invoice) => ({
        month: invoice.getDataValue('month'),
        totalAmount: parseFloat(invoice.getDataValue('totalAmount')),
        totalInvoice: parseInt(invoice.getDataValue('totalInvoice')),
      }));

      const totalAmount = monthlyData.reduce((acc, curr) => acc + curr.totalAmount, 0);
      const totalInvoice = monthlyData.reduce((acc, curr) => acc + curr.totalInvoice, 0);

      return res.json({
        totalAmount,
        totalInvoice,
        details: monthlyData,
      });
    }

    return res.status(400).json({ error: 'Please provide a valid date, month, or year filter.' });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'An error occurred while fetching stats.' });
  }
};

module.exports = giveStats;
