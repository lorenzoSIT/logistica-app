// models/index.js
import sequelize from '../lib/sequelize.js';
import Users from './Users.js';
import Barcode from './Barcode.js';
import Colors from './Colors.js';
import Items from './Items.js';
import Customers from './Customers.js';
import LogSessioni from './LogSessioni.js';
import LogSessioniChecklist from './LogSessioniChecklist.js';
import LogSessioniLetture from './LogSessioniLetture.js';
import Stores from './Stores.js';

// Definizione delle relazioni
// Items e Barcode (Relazione one-to-many)
Items.hasMany(Barcode, { foreignKey: 'bcart', sourceKey: 'code' });
Barcode.belongsTo(Items, { foreignKey: 'bcart', targetKey: 'code' });

// Colors e Barcode (Relazione one-to-many)
Colors.hasMany(Barcode, { foreignKey: 'bccol', sourceKey: 'code' });
Barcode.belongsTo(Colors, { foreignKey: 'bccol', targetKey: 'code' });

// LogSessioni e LogSessioniLetture (Relazione one-to-many)
LogSessioni.hasMany(LogSessioniLetture, { foreignKey: 'sessione_id' });
LogSessioniLetture.belongsTo(LogSessioni, { foreignKey: 'sessione_id' });

// LogSessioni e LogSessioniChecklist (Relazione one-to-many)
LogSessioni.hasMany(LogSessioniChecklist, { foreignKey: 'session_id' });
LogSessioniChecklist.belongsTo(LogSessioni, { foreignKey: 'session_id' });

// LogSessioni e Customers (Relazione one-to-many)
LogSessioni.hasMany(Customers, { foreignKey: 'session_id' });
Customers.belongsTo(LogSessioni, { foreignKey: 'session_id' });

// Users e LogSessioni (Relazione one-to-many)
Users.hasMany(LogSessioni, { foreignKey: 'user_id' });
LogSessioni.belongsTo(Users, { foreignKey: 'user_id' });

// Users e LogSessioniLetture (Relazione one-to-many)
Users.hasMany(LogSessioniLetture, { foreignKey: 'user_id' });
LogSessioniLetture.belongsTo(Users, { foreignKey: 'user_id' });

// Stores e LogSessioni (Relazione one-to-many)
Stores.hasMany(LogSessioni, { foreignKey: 'magazzino' });
LogSessioni.belongsTo(Stores, { foreignKey: 'magazzino' });

// Esporta tutti i modelli
export {
  sequelize,
  Users,
  Barcode,
  Colors,
  Items,
  Customers,
  LogSessioni,
  LogSessioniChecklist,
  LogSessioniLetture,
  Stores
};