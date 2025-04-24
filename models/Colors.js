// models/Colors.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const Colors = sequelize.define('Colors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  art: {
    type: DataTypes.STRING(255),
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
  tableName: 'colors',
  timestamps: false
});

export default Colors;