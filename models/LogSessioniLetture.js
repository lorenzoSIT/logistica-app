// models/LogSessioniLetture.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const LogSessioniLetture = sequelize.define('LogSessioniLetture', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sessione_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sku: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  qta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  esito: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nota: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  box_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ordine_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ordined_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  checklist_id: {
    type: DataTypes.INTEGER,
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
  tableName: 'log_sessioni_letture',
  timestamps: false
});

export default LogSessioniLetture;