import jwtEncrypt from "jsonwebtoken";

const encodeToken = async (
  secret: string,
  payload: Record<string, any>,
  expire: string
) => {
  return await jwtEncrypt.sign(payload, secret, {
    expiresIn: expire,
  });
};

const decodeToken = async (token: string, secret: string) => {
  return await jwtEncrypt.verify(token, secret);
};

export const jwt = {
  encodeToken,
  decodeToken,
};
