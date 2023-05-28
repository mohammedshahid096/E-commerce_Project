// import cookie from "cookie";
import { getJWTToken } from "./GenerateToken.js";

export default function SetJWT(user, statuscode, res) {
  const token = getJWTToken(user._id);

  //options for cookies
  let date = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const options = {
    expires: date,
    // httpOnly: true,
    sameSite: "lax",
    secure: false,
  };

  //   console.log(req.headers.cookie);
  //cookies are set and sended to server
  res.cookie("Etoken", token, options).status(statuscode).json({
    success: true,
    user,
    token,
  });
}
