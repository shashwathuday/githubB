/**
 * Makes sure that the user is accessing the API through with a token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers.authorization;
  
    if (token && token.startsWith("token ")) {
      token = token.slice(6, token.length);
    }
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Auth token is not supplied",
      });
    }
  
    req.token = token;
    return next();
}
  
  module.exports = {
    checkToken,
  };