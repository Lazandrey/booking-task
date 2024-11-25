import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import tenantModel from "../model/tenant.js";
import { isValidCreateTenant } from "../utils/validations.js";

const SIGNIN = async (req, res) => {
  const errors = await isValidCreateTenant(req.body);

  if (errors.length > 0) {
    return res
      .status(400)
      .json({ message: "we have some problems", errors: errors });
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const newTenant = {
    id: uuidv4(),
    name: req.body.name,
    email: req.body.email,
    password: hash,
  };

  try {
    const tenant = new tenantModel(newTenant);
    const response = await tenant.save();

    return res.status(201).json({
      response: "Tenant was created successfully",
      tenant: response,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "we have some problems" });
  }
};
const LOGIN = async (req, res) => {
  try {
    const tenant = await tenantModel.findOne({ email: req.body.email });
    if (req.query.passreset == "true") {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.query.password, salt);

      tenant.password = hash;
      await tenant.save();
    }
    if (!tenant) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      tenant.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "You have provided bad data" });
    }

    const token = jwt.sign(
      {
        id: tenant.id,
        email: tenant.email,
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
