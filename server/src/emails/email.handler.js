import { resendClient, sender } from '../lib/resend.js';
import { createWelcomeEmailTemplate } from './email.template.js';

export const sendWelcome = async (email, name, clientURL) => {
  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: 'Welcome to STC',
    html: createWelcomeEmailTemplate(name, clientURL),
  });

  if (error) {
    console.log(`Error sending welcome email: ${error}`);
  }

  console.log({ data });
};
