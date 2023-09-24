import nodemailer from 'nodemailer';
// import User from '../models/user';
import bcryptjs from 'bcryptjs';
import User from '../models/user';

const sendMail = async ({ email, emailType, userId }) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    console.log('verifyToken', hashedToken);

    if (emailType === 'VERIFY') {
      console.log('Verifying user', userId);
      const temp = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
      console.log('hello', temp);
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'e438710b200245',
        pass: '70a5d242e7499c',
      },
    });

    const mailOption = {
      from: 'kewintitus@gmail.com',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<div>
          Click to verify email
          <a href=${process?.env?.DOMAIN}/verifyEmail?token=${hashedToken}>Click</a>
        </div>`,
    };
    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default sendMail;
