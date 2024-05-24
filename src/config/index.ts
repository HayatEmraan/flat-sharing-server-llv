import path from "path";
import env from "dotenv";
env.config({ path: path.join(process.cwd(), ".env") });

export const JWT_CREDENTIALS = {
  access_key: process.env.JWT_ACCESS_KEY,
  refresh_key: process.env.JWT_REFRESH_KEY,
  access_expire: process.env.JWT_REFRESH_EXPIRE,
  refresh_expire: process.env.JWT_ACCESS_EXPIRE,
};

export const BCRYPT_CREDENTIALS = {
  bcrypt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};

export const NODE_MAILER = {
  NODE_MAILER_SENDER: process.env.NODE_MAILER_SENDER,
  NODE_MAILER_PASS: process.env.NODE_MAILER_PASS,
};

export const DOMAIN_CLIENT = {
  domain_client_url: process.env.CLIENT_DOMAIN,
};

export const port = process.env.SERVER_PORT;
