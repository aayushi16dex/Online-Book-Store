const jwt = require("jsonwebtoken");

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  token = authHeader ? authHeader.replace("Bearer ", "").trim() : "";
  if (token == null || token === "" || token == "null") {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  }

  if (!token || token == null || token == "") {
    return res
      .status(401)
      .json({ message: "Authorization token missing or malformed" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
      if (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid or expired token" }); // Forbidden
      }
      req.userData = userData;
      next();
    });
  }
}

module.exports = authenticateJWT;
