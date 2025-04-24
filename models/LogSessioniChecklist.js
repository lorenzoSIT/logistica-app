// models/LogSessioniChecklist.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const LogSessioniChecklist = sequelize.define('LogSessioniChecklist', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sd_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  session_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  barcode: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  art: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  col: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  taglia: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  postaglia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  qtap: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  qtar: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  completed: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orderd_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  box_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  customer_id: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ragsped: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  zonasped: {
    type: DataTypes.STRING(255),
    allowNull: true
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
  tableName: 'log_sessioni_checklist',
  timestamps: false
});

export default LogSessioniChecklist;