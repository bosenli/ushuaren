const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, 'A role must have a name'],
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
  permissions: {
    type: [String],
    default: [],
  },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

// Guest: For users who aren't logged in but have limited access to read certain types of posts or access public information.
// Contributor: Similar to a regular user, but specifically designated to contribute content like blog posts, without administrative privileges.
// Moderator: A step above the mediator, responsible for moderating content and interactions within the platform to ensure they adhere to community guidelines.
// Editor: Can edit and approve posts or content submitted by contributors before they go live.
// Analyst: Has access to business analytics and user data insights but no administrative control over users or content.
// Support: Can interact with users to resolve issues but doesn't have access to modify content or user accounts extensively.
// VIP: A special user role that could have enhanced privileges or access to specific content, often used in contexts where user engagement directly impacts access or features.
//Super User (CEO)
//restaurant owner
// Role: Super User
// Permissions: ['*'] (a wildcard permission granting all possible actions within the application).
// Developer

// Role: Developer
// Permissions: This could include permissions like modify_code, deploy_application, access_logs, but not permissions that could affect the overall business direction or sensitive user data, such as delete_users or access_financial_reports.
