import * as nodemailer from 'nodemailer';

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PW,
    },
  });

  // change in production mode
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`; //temporary link

  const mailOptions = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: 'CYBERNET | Confirm your Email',
    html: `<p>This is a verification letter from CyberNet. Click <a href="${confirmLink}">here</a> to confirm.</p>`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}
