// models/Invoice.js

const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../database/connection'); // Adjust the path as per your project structure

const Invoice = sequelize.define(
  'Invoice',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      references: {
        model: 'User',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false,
    },
    invoiceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fromAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    toAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    items: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: 'invoice',
    timestamps: false,
  }
);

module.exports = Invoice;
