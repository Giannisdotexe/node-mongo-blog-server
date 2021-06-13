import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtsec = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  try {
    let token = null;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      res.status(401).json({ message: "Not Authenticated" });
    }

    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, jwtsec);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
