const { Router } = require("express");
const products = require("./products");
const auth = require("./auth.js");
const user = require("./user");
const router = Router();

router.use("/products", products);
router.use("/users", user);
router.use("/auth", auth);

module.exports = router;
