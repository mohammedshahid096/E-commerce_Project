import jwt from "jsonwebtoken";
import User_Schema from "../Mongo_Models/User_Schema.js";

//wether a user is login or not
const IsAuthenticated = async (req, res, next) => {
  const { Etoken } = req.cookies;

  if (!Etoken) {
    return res.status(401).json({
      success: false,
      message: "please login to access this resource",
    });
  }
  const decodetoken = jwt.verify(Etoken, process.env.JWT_SECRET);

  const userdetails = await User_Schema.findById(decodetoken.user.id);
  req.user = userdetails;
  next();
};

// ---------------------------------------------------------------

//only Admins role can access this rescources
export const AurthorizeRole = (req, res, next) => {
  const roles = ["admin"];
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `Role - ${req.user.role} is not allowed to access this resources`,
    });
  }
  next();
};

export default IsAuthenticated;
