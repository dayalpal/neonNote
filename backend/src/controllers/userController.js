import User from "../models/User.js";
import jwt from "jsonwebtoken";

const createToken = (user) => {
  const secret = process.env.JWT_SECRET || "change_this_secret";
  return jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });
};

export async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        const user = new User({
            name, email, password
        })
        const savedUser = await user.save();
        const token = createToken(savedUser);

        res.status(201).json({
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
            },
            token,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = createToken(user);
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in user");
    }
}

export async function getAllUsers(req, res) {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("Fetching user error");
    }
}