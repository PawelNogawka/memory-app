import User from "../models/user.js";

import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const login = async (req, res) => {
  console.log(process.env.JWT_SECRET);
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordCorrect)
        return res
          .status(400)
          .json({ message: "Invalid credentials: email or password" });

      const token = jwt.sign(
        {
          email: existingUser.email,
          id: existingUser._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result: existingUser, token });
    } else {
      res.status(404).json({ message: "User doesn't exist." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmedPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords must match.",
    }),
  photo: Joi.string().required(),
});

export const register = async (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword, photo } =
    req.body;

  try {
    const { error } = registerValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = {
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
        photo, // Dodajemy pole photo do nowego użytkownika
      };

      const result = await User.create(newUser);

      const token = jwt.sign(
        {
          email: result.email,
          id: result._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ result, token });
    } else {
      res.status(400).json({ message: "User already exists." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong." });
  }
};
