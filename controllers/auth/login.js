const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// const bcrypt = require("bcryptjs");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password))
    throw new Unauthorized(`Email or password is wrong`);
  //   if (!user) {
  //     throw new Unauthorized(`user with email ${email} not found`);
  //   }
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) throw new Unauthorized(`password wrong`);

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "succes",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
