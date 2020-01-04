import nodemailer from "nodemailer";
import { v4 } from "uuid";

import { redis } from "./redis";

const createConfirmationUrl = async (userID: number) => {
  const token = v4();
  await redis.set(token, userID, "ex", 60 * 60 * 24);
  return `${process.env.APP_URL}/confirm/${token}`;
};

export const sendConfirmationEmail = async (email: string, userID: number) => {
  const url = await createConfirmationUrl(userID);
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass // generated ethereal password
    }
  });

  const mailOptions = {
    from: "Laddy", // sender address
    to: email, // list of receivers
    subject: "Laddy Account Confirmation", // Subject line
    text: `Hi!\n\nThanks for using Laddy. Follow this link to activate your account.\n\nGood luck!`, // plain text body
    html: `Hi!<br/><br/>Thanks for using Laddy. Follow this <a href="${url}">link</a> to activate your account.<br/><br/>Good luck!` // html body
  };

  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
