const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const authService = {
  register: async ({
    username,
    email,
    password,
    repeatPassword,
    acceptedTerms,
  }) => {
    if (!username || !email || !password || !repeatPassword)
      throw new Error("All fields are required.");

    if (password !== repeatPassword) throw new Error("Passwords do not match.");

    if (!acceptedTerms) throw new Error("Terms must be accepted.");

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) throw new Error("User already exists.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      acceptedTerms,
    });

    return {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };
  },

  login: async ({ email, password }) => {
    if (!email || !password)
      throw new Error("Email and password are required.");

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found.");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid credentials.");

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return token;
  },
};

module.exports = authService;
