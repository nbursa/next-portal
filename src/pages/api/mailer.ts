import type {NextApiRequest, NextApiResponse} from 'next';
import nodemailer from 'nodemailer';

type Data = {
  success: boolean;
};

interface SendEmailProps {
  name: string;
  email: string;
  message: string;
}

const sendEmail = async ({name, email, message}: SendEmailProps): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const formBody = `
  <div style="font-family: sans-serif; font-size: 16px;">
    <h1 style="text-align: center;">Contact Form Submission</h1>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.EMAIL_USERNAME,
    subject: `Contact Form Submission from ${name}`,
    text: message,
    html: formBody,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${process.env.EMAIL_USERNAME}: ${info.response}`);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const emailSent = await sendEmail(req.body as SendEmailProps);
    res.status(200).json({success: emailSent});
  } else {
    res.status(405).json({success: false});
  }
}
