var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const { v4: uuidv4 } = require('uuid');
//const { resetPassword } = require('./controller');
var Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    genero : {
        type: String,
        required: [true, "Genero is required"],
        enum: ["Masculino", "Femenino", "Otro"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Ensures password is not returned in queries
    },
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    photo: {
      type: String,
      default: "",
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date, // Add an expiry date for the token
    permission: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
    }
);

userSchema.methods = {
    authenticate: async function (password) {
      return await bcrypt.compare(password, this.password);
    }
};


module.exports = mongoose.model("User", userSchema);