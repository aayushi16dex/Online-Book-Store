const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
    if (err) {
      console.log(err);

      return res.status(403).json({ message: "Invalid or expired token" }); // Forbidden
    }
    req.userData = userData;
    next();
  });
}

module.exports = authenticateJWT;
