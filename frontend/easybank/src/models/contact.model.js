// src/models/contact.model.js
/**
 
@typedef {Object} Contact
@property {string} contactId - Contact ID
@property {string} contactName - Contact name
@property {string} contactEmail - Contact email
@property {string} subject - Subject
@property {string} message - Message
@property {Date} createDt - Contact creation date*/

export const createContact = (contactData = {}) => ({
  contactId: contactData.contactId || "",
  contactName: contactData.contactName || "",
  contactEmail: contactData.contactEmail || "",
  subject: contactData.subject || "",
  message: contactData.message || "",
  createDt: contactData.createDt || new Date(),
});
