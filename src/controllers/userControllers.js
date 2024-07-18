import bcrypt from "bcryptjs";
import db from "../config/db.js";

const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await db.user.findUnique({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return res.status(400).json({ message: "User not created" });
    }

    return res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await db.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    return res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await db.user.findMany();

    if (!users) {
      return res.status(400).json({ message: "Users not found" });
    }

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await db.user.findUnique({ where: { id: parseInt(id, 10) } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await db.user.delete({ where: { id: parseInt(id, 10) } });

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export { Register, Login, getAllUsers, deleteUser };
