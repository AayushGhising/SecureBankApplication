// src/models/user.model.js
/**
 
@typedef {Object} User
@property {number} id - User ID
@property {string} name - User's full name
@property {string} email - User's email address
@property {string} mobileNumber - User's mobile number
@property {string} pwd - User's password (hashed)
@property {string} role - User's role
@property {Date} createDt - Account creation date*/

export const createUser = (userData = {}) => ({
  id: userData.customerId || userData.id || null,
  name: userData.name || "",
  email: userData.email || "",
  mobileNumber: userData.mobileNumber || "",
  pwd: userData.pwd || "",
  role: userData.role || "USER",
  createDt: userData.createDt || new Date(),
});
