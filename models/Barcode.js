// models/Barcode.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const Barcode = sequelize.define('Barcode', {
  bcart: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bccol: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bccode: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true
  },
  bctaglia: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  bcpostag: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bccolle: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: '1970-01-01 00:00:00'
  }
}, {
  tableName: 'barcode',
  timestamps: false
});

export default Barcode;