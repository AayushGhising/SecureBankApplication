// src/models/account.transactions.model.js
/**
 
@typedef {Object} AccountTransaction
@property {string} transactionId - Transaction ID
@property {number} accountNumber - Account number
@property {number} customerId - Customer ID
@property {Date} transactionDt - Transaction date
@property {string} transactionSummary - Transaction summary
@property {string} transactionType - Transaction type
@property {number} transactionAmt - Transaction amount
@property {number} closingBalance - Closing balance
@property {Date} createDt - Record creation date*/

export const createAccountTransaction = (transactionData = {}) => ({
  transactionId: transactionData.transactionId || "",
  accountNumber: transactionData.accountNumber || null,
  customerId: transactionData.customerId || null,
  transactionDt: transactionData.transactionDt || new Date(),
  transactionSummary: transactionData.transactionSummary || "",
  transactionType: transactionData.transactionType || "",
  transactionAmt: transactionData.transactionAmt || 0,
  closingBalance: transactionData.closingBalance || 0,
  createDt: transactionData.createDt || new Date(),
});
