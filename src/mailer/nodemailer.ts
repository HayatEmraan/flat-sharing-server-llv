import nodemailer from "nodemailer";
import { NODE_MAILER } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: NODE_MAILER.NODE_MAILER_SENDER,
    pass: NODE_MAILER.NODE_MAILER_PASS,
  },
});

export const sendEmail = async (to: string, html: string, sub: string) => {
  await transporter.sendMail({
    from: NODE_MAILER.NODE_MAILER_SENDER, // sender address
    to, // list of receivers
    subject: sub, // Subject line
    html, // html body
  });
};
