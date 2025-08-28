// MongoDB Models Index
// This file exports all Mongoose models for easy importing

const User = require('./User');
const Wallet = require('./Wallet');
const Transaction = require('./Transaction');
const MiningSession = require('./MiningSession');
const MobileMiningSession = require('./MobileMiningSession');
const ContactSubmission = require('./ContactSubmission');
const SupportTicket = require('./SupportTicket');
const NewsletterSubscription = require('./NewsletterSubscription');
const NewsletterCampaign = require('./NewsletterCampaign');
const MentorshipApplication = require('./MentorshipApplication');
const AdminSettings = require('./AdminSettings');

// Note: Additional models to be created:
// - MentorshipConnection
// - MentorshipSession  
// - ScholarshipApplication
// - ScholarshipAward
// - ScholarshipDisbursement

module.exports = {
  User,
  Wallet,
  Transaction,
  MiningSession,
  MobileMiningSession,
  ContactSubmission,
  SupportTicket,
  NewsletterSubscription,
  NewsletterCampaign,
  MentorshipApplication,
  AdminSettings
};
