// lib/services/sessionService.js
import { Op } from 'sequelize';
import LogSessioni from '../../models/LogSessioni.js';
import LogSessioniLetture from '../../models/LogSessioniLetture.js';
import LogSessioniChecklist from '../../models/LogSessioniChecklist.js';
import Users from '../../models/Users.js';
import Stores from '../../models/Stores.js';

export async function findSessionById(id) {
  try {
    return await LogSessioni.findByPk(id, {
      include: [
        { model: Users, attributes: ['id', 'username'] },
        { model: Stores },
        { model: LogSessioniLetture }
      ]
    });
  } catch (error) {
    console.error('Error finding session:', error);
    throw error;
  }
}

export async function findActiveSessions() {
  try {
    return await LogSessioni.findAll({
      where: {
        stato: { [Op.ne]: 3 } // Assumendo che stato=3 sia "completato"
      },
      include: [
        { model: Users, attributes: ['id', 'username'] },
        { model: Stores }
      ],
      order: [['created_at', 'DESC']]
    });
  } catch (error) {
    console.error('Error finding active sessions:', error);
    throw error;
  }
}

export async function createSession(sessionData) {
  try {
    return await LogSessioni.create({
      ...sessionData,
      created_at: new Date(),
      stato: sessionData.stato || 1 // Default a stato=1 (attivo)
    });
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
}

export async function updateSessionStatus(id, newStatus) {
  try {
    const session = await LogSessioni.findByPk(id);
    if (!session) return null;
    
    return await session.update({
      stato: newStatus,
      updated_at: new Date(),
      ...(newStatus === 3 ? { // Se completato
        data_fine: new Date(),
        ora_fine: new Date()
      } : {})
    });
  } catch (error) {
    console.error('Error updating session status:', error);
    throw error;
  }
}

export async function addSessionReading(readingData) {
  try {
    return await LogSessioniLetture.create({
      ...readingData,
      created_at: new Date()
    });
  } catch (error) {
    console.error('Error adding session reading:', error);
    throw error;
  }
}