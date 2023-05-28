import User_Schema from "../Mongo_Models/User_Schema.js";
import bcrypt from "bcrypt";
import SetJWT from "../Config/SetJWT.js";
import cloudinary from "cloudinary";

export const Register = async (req, res) => {
  const avatar = req.file;
  // console.log(avatar);
  try {
    const myCloud = await cloudinary.v2.uploader.upload(avatar.path, {
      folder: "E-Commerce/userProfile",
      width: 150,
      crop: "scale",
    });
    // console.log("---------");
    // console.log(myCloud);
    const { name, email, password } = req.body;
    const create_user = new User_Schema({
      name,
      email,
      password,
      profile: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });
    await create_user.save();
    SetJWT(create_user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //if the email or password is empty
    if (!email || !password) {
      return res.status(400).json({
        success: "false",
        message: "please enter the email & password",
      });
    }
    const user = await User_Schema.findOne({ email });
    //if user is empty then it means it not find in db so user is not present

    if (!user) {
      return res.status(400).json({
        success: "false",
        message: "Invalid email or password",
      });
    }
    // as it present then we need to compared the hash passwords where they are equal or not
    const ispasswordmatch = await bcrypt.compare(password, user.password);

    // if they are not match then it means passwords are not match

    if (!ispasswordmatch) {
      return res.status(400).json({
        success: "false",
        message: "Invalid email or password",
      });
    }
    SetJWT(user, 200, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//logout option
export const Logout = (req, res, next) => {
  try {
    const options = {
      expires: new Date(),
      httpOnly: true,
    };
    // here we assign cookies as null to delete the cookie
    res.cookie("Etoken", null, options).status(200).json({
      success: true,
      message: "Logged out",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get user details
export const GetUserDetails = async (req, res) => {
  const user = await User_Schema.findById(req.user.id);
  return res.status(200).json({
    success: true,
    user,
  });
};

//update the data
export const UpadateUser = async (req, res) => {
  try {
    const updateuser = {
      email: req.body.email,
      name: req.body.name,
    };

    const user = await User_Schema.findByIdAndUpdate(req.user.id, updateuser, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    // console.log(user);
    res.status(200).json({
      success: true,
      message: "success fully updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all users only for admin
export const GetSingleUser = async (req, res) => {
  try {
    const user = await User_Schema.findById(req.params.id);
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all users only for admin
export const GetAllUsers = async (req, res) => {
  try {
    const users = await User_Schema.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//admin will update the user for role
export const UpadateUserAdmin = async (req, res) => {
  try {
    const updateuser = {
      email: req.body.email,
      name: req.body.name,
      role: req.body.role,
    };

    const user = await User_Schema.findByIdAndUpdate(
      req.params.id,
      updateuser,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "success fully updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//admin will delete the user
export const DeleteUserAdmin = async (req, res) => {
  try {
    const user = await User_Schema.findById(req.params.id);
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "user not found",
      });
    }

    await cloudinary.v2.uploader.destroy(user.profile.public_id);
    await user.remove();

    res.status(200).json({
      success: true,
      message: "success fully Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const TempUser = async (req, res) => {
  const user = await User_Schema.findById("63b91fb401187432908ad893");
  return res.status(200).json({
    success: true,
    user,
  });
};
