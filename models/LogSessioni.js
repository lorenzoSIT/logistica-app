// models/LogSessioni.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize.js';

const LogSessioni = sequelize.define('LogSessioni', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  ora: {
    type: DataTypes.DATE,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  tipo_sessione: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  note: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  stato: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ora_inizio: {
    type: DataTypes.DATE,
    allowNull: true
  },
  data_fine: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  ora_fine: {
    type: DataTypes.DATE,
    allowNull: true
  },
  descrizione: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  magazzino: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  locked: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0
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
  tableName: 'log_sessioni',
  timestamps: false
});

export default LogSessioni;