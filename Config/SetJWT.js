// import cookie from "cookie";
import { getJWTToken } from "./GenerateToken.js";

// TODO : when ever a user login or Register it will create a token and cookies will be set in the browser
export default function SetJWT(user, statuscode, res) {
  const token = getJWTToken(user._id);

  //TODO : options for cookies
  let date = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const options = {
    expires: date,
    // httpOnly: true,
    sameSite: "lax",
    secure: false,
  };

  // TODO : cookies are set and sended to server
  res.cookie("Etoken", token, options).status(statuscode).json({
    success: true,
    user,
    token,
  });
}
