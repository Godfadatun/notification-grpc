module.exports = {
  apps: [
    {
      script: 'npm',
      name: 'notifications-service',
      args: 'start',
    },
    {
      script: 'dist/consumers/sms.js',
      name: 'sms-consumer',
    },
    {
      script: 'dist/consumers/whatsapp.js',
      name: 'whatsapp-consumer',
    },
    {
      script: 'dist/consumers/email.js',
      name: 'email-consumer',
    },
    {
      script: 'dist/consumers/onboardingEmails.js',
      name: 'onboarding-email-consumer',
    },
    {
      script: 'dist/consumers/slack.js',
      name: 'slack-consumer',
    },
    {
      script: 'dist/consumers/push.js',
      name: 'push-notification-consumer',
    },
    {
      script: 'dist/consumers/otp.js',
      name: 'dojah-otp-consumer',
    },
  ],
};
