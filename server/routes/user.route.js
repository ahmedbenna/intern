const router = require("express").Router();
const passport = require("passport");
const useragent = require("express-useragent");
const requestIp = require("request-ip");

const {
  addUser,
  signin,
  logout,
  refreshToken,
  getUser,
  getPublicUsers,
} = require("../controllers/user.controller");

const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middlewares/users/usersValidator");

const { sendVerificationEmail } = require("../middlewares/users/verifyEmail");
const {
  sendLoginVerificationEmail,
} = require("../middlewares/users/verifyLogin");

const {
  signUpSignInLimiter,
} = require("../middlewares/limiter/limiter");

const decodeToken = require("../middlewares/auth/decodeToken");
const requireAuth = passport.authenticate("jwt", { session: false }, null);

router.get("/public-users", requireAuth, decodeToken, getPublicUsers);
router.get("/:id", requireAuth, getUser);

router.post(
  "/signup",
  signUpSignInLimiter,
  addUserValidator,
  addUserValidatorHandler,
  addUser,
  sendVerificationEmail
);
router.post("/refresh-token", refreshToken);
router.post(
  "/signin",
  signUpSignInLimiter,
  requestIp.mw(),
  useragent.express(),
  signin,
  sendLoginVerificationEmail
);
router.post("/logout", logout);


module.exports = router;