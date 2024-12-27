const sendEmail = require('./email');

(async () => {
  try {
    await sendEmail({
      email: 'test@example.com',
      subject: 'Test Email',
      message: 'This is a test email sent from the Node.js app.',
    });
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
})();
