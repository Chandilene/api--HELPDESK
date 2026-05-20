export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "default",
    expiresIn: "1d",
  },
};
