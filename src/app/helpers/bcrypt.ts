import bcryptEncrypt from "bcrypt";

const hashPassword = async (salt: string, password: string) => {
  return await bcryptEncrypt.hash(password, Number(salt));
};

const comparePassword = async (hash: string, plain: string) => {
  return await bcryptEncrypt.compare(plain, hash);
};

export const bcrypt = {
  hashPassword,
  comparePassword,
};
