// src/models/account.model.js
/**
 
@typedef {Object} Account
@property {number} accountNumber - Account number
@property {string} accountType - Type of account
@property {string} branchAddress - Branch address
@property {Date} createDt - Account creation date*/

export const createAccount = (accountData = {}) => ({
  accountNumber: accountData.accountNumber || null,
  accountType: accountData.accountType || "",
  branchAddress: accountData.branchAddress || "",
  createDt: accountData.createDt || new Date(),
});
