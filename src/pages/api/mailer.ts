import type {NextApiRequest, NextApiResponse} from 'next';

import nodemailer from 'nodemailer';

type Data = {
  success: boolean;
  error?: string;
};

interface SendEmailProps {
  name: string;
  email: string;
  message: string;
}

class EmailError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailError';
  }
}

interface MailTransporter {
  sendMail: (options: any) => Promise<any>;
  verify: () => Promise<void>;
}

let transporter: MailTransporter;
const emailHost = process.env.EMAIL_HOST as string;
const emailUsername = process.env.EMAIL_USERNAME as string;
const emailPassword = process.env.EMAIL_PASSWORD as string;

const getTransporter = async () => {
  if (!transporter) {
    if (!emailHost || !emailUsername || !emailPassword) {
      throw new EmailError('Email environment variables not configured.');
    }
    transporter = nodemailer.createTransport({
      host: emailHost,
      port: 465,
      secure: true,
      auth: {
        user: emailUsername,
        pass: emailPassword,
      },
    }) as unknown as MailTransporter;

    try {
      await transporter.verify();
      console.log("Server is ready to take messages");
    } catch (error) {
      console.error("SMTP Verification Error: ", error);
      throw new Error("SMTP Verification failed");
    }
  }
  return transporter;
};

const sendEmail = async ({name, email, message}: SendEmailProps): Promise<boolean> => {
  const transporter = await getTransporter();

  const formBody = `
  <div style="font-family: sans-serif; font-size: 16px;">
    <h2 style="text-align: center;">Contact Form - nenadbursac.com</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  </div>
  `;

  const mailOptions = {
    from: emailUsername,
    to: emailUsername,
    subject: `Contact Form Submission from ${name}`,
    text: message,
    html: formBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${emailUsername}: ${info.response}`);
    return true;
  } catch (error) {
    console.error('Email sending error:', error);
    console.error('Nodemailer transport configuration:', transporter);
    if (error instanceof EmailError) {
      throw error;
    } else {
      throw new EmailError('Failed to send email.');
    }
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    if (!emailHost || !emailUsername || !emailPassword) {
      throw new EmailError('Email environment variables not configured.');
    }

    const {name, email, message} = req.body as SendEmailProps;

    const emailSent = await sendEmail({name, email, message});

    if (emailSent) {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: 'Email sending failed but no error thrown.' });
    }

  } catch (error: any) {
    console.error('Email sending error:', error);
    return res.status(500).json({ success: false, error: 'Email sending failed.' });
  }
}
