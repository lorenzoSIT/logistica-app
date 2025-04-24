// models/Stores.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const Stores = sequelize.define('Stores', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  linea: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'stores',
  timestamps: false
});

export default Stores;