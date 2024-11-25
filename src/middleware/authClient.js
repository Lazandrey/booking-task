import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.body.clientId = decoded.id;
    req.body.email = decoded.email;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authUser;
