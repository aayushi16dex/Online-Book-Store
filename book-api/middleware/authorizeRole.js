function authorizeRole(role) {
  return (req, res, next) => {
    if (req.userData.role === role) {
      next();
    } else {
      res.status(403).json({msg:"FORBIDDEN! You are not allowed to access this resource."}); 
    }
  };
}

module.exports = authorizeRole;
