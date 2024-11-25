import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import clientModel from "../model/client.js";
import { isValidCreateClient } from "../utils/validations.js";

const SIGNIN = async (req, res) => {
  const errors = await isValidCreateClient(req.body);

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: "we have some problems", errors: errors });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newClient = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };

  try {
    const client = new clientModel(newClient);
    const response = await client.save();

    return res.status(201).json({
      response: "Client was created successfully",
      client: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};
const LOGIN = async (req, res) => {
  try {
    const client = await clientModel.findOne({ email: req.body.email });
    if (!client) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      client.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const token = jwt.sign(
      {
        id: client.id,
        email: client.email,
      },
      process.env.TOKEN_KEY,
      { expiresIn: "12h" }
    );

    return res.status(200).json({ message: "Successfull login", token: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};

export { SIGNIN, LOGIN };
