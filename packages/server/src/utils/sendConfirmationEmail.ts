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

  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_LOGIN,
      pass: process.env.SMTP_PASS
    }
  });

  const mailOptions = {
    from: `"${process.env.SMTP_NAME}" <${process.env.SMTP_LOGIN}>`,
    to: email,
    subject: "Laddy Account Confirmation",
    html: `Hi!<br/><br/>Thanks for using Laddy. Follow this <a href="${url}">link</a> to activate your account.<br/><br/>Please note that the link will be valid for only 24 hours.`
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};
