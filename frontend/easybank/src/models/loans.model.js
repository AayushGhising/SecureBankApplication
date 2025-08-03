// src/models/loans.model.js
/**
 
@typedef {Object} Loan
@property {number} loanNumber - Loan number
@property {number} customerId - Customer ID
@property {Date} startDt - Loan start date
@property {string} loanType - Type of loan
@property {number} totalLoan - Total loan amount
@property {number} amountPaid - Amount paid
@property {number} outstandingAmount - Outstanding amount
@property {Date} createDt - Record creation date*/

export const createLoan = (loanData = {}) => ({
  loanNumber: loanData.loanNumber || null,
  customerId: loanData.customerId || null,
  startDt: loanData.startDt || new Date(),
  loanType: loanData.loanType || "",
  totalLoan: loanData.totalLoan || 0,
  amountPaid: loanData.amountPaid || 0,
  outstandingAmount: loanData.outstandingAmount || 0,
  createDt: loanData.createDt || new Date(),
});
