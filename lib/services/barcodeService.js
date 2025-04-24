// lib/services/barcodeService.js
import Barcode from '../../models/Barcode.js';
import Items from '../../models/Items.js';
import Colors from '../../models/Colors.js';

export async function findBarcodeByCode(code) {
  try {
    return await Barcode.findByPk(code, {
      include: [
        { model: Items },
        { model: Colors }
      ]
    });
  } catch (error) {
    console.error('Error finding barcode:', error);
    throw error;
  }
}

export async function createBarcode(barcodeData) {
  try {
    return await Barcode.create({
      ...barcodeData,
      created_at: new Date(),
      updated_at: new Date('1970-01-01')
    });
  } catch (error) {
    console.error('Error creating barcode:', error);
    throw error;
  }
}

export async function updateBarcode(code, barcodeData) {
  try {
    const barcode = await Barcode.findByPk(code);
    if (!barcode) return null;
    
    return await barcode.update({
      ...barcodeData,
      updated_at: new Date()
    });
  } catch (error) {
    console.error('Error updating barcode:', error);
    throw error;
  }
}

export async function deleteBarcode(code) {
  try {
    const barcode = await Barcode.findByPk(code);
    if (!barcode) return false;
    
    await barcode.destroy();
    return true;
  } catch (error) {
    console.error('Error deleting barcode:', error);
    throw error;
  }
}

export async function findAllBarcodes(options = {}) {
  try {
    return await Barcode.findAll({
      ...options,
      include: [
        { model: Items },
        { model: Colors }
      ]
    });
  } catch (error) {
    console.error('Error finding barcodes:', error);
    throw error;
  }
}