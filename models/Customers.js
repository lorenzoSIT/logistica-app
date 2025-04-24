// models/Customers.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const Customers = sequelize.define('Customers', {
  id: {
    type: DataTypes.STRING(255),
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  zonasped: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'customers',
  timestamps: false
});

export default Customers;