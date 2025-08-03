// src/models/cards.model.js
/**
 
@typedef {Object} Card
@property {number} cardId - Card ID
@property {number} cardNumber - Card number
@property {string} cardType - Type of card
@property {number} totalLimit - Total credit limit
@property {number} amountUsed - Amount used
@property {number} availableAmount - Available amount
@property {Date} createDt - Card creation date*/

export const createCard = (cardData = {}) => ({
  cardId: cardData.cardId || null,
  cardNumber: cardData.cardNumber || null,
  cardType: cardData.cardType || "",
  totalLimit: cardData.totalLimit || 0,
  amountUsed: cardData.amountUsed || 0,
  availableAmount: cardData.availableAmount || 0,
  createDt: cardData.createDt || new Date(),
});
