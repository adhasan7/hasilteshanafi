import bcrypt from "bcrypt";
import jwt from "../middleware/jsonWebToken.js";
import User from "../models/UserModel.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: false, msg: "Mohon masukkan email dan password" });
    }

    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: false, msg: "Email atau Password salah 1" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ status: false, msg: "Email atau Password salah 2" });
    }

    const payload = {
      data: {
        id: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    };
    const token = jwt.generateToken(payload);
    const refreshToken = jwt.generateRefreshToken(payload);

    // req.session.userId = user.uuid;

    return res.status(200).json({
      status: true,
      token,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }

  // OLD CODE
  //   const user = await User.findOne({
  //     where: {
  //       email: req.body.email,
  //     },
  //   });
  //   if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  //   const match = await bcrypt.compare(req.body.password, user.password);

  //   if (!match) return res.status(400).json({ msg: "Wrong Password " });
  //   req.session.userId = user.uuid;
  //   const uuid = user.uuid;
  //   const name = user.name;
  //   const email = user.email;
  //   const role = user.role;
  //   res.status(200).json({ uuid, name, email, role });
};

export const Me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "name", "email", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    res.status(200).json({ msg: "Anda telah logout" });
  });
};
