import jwt from "jsonwebtoken";

// TODO :to generate jwt token
export function getJWTToken(id) {
  let payload = {
    user: { id },
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
}
