import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

mongoose.set("strictQuery", true);

const Schema_model = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
    minLength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    // select:false //in database it will not show
  },
  profile: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//hashing for password
Schema_model.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const User_Schema = mongoose.model("users", Schema_model);

export default User_Schema;
