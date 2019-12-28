const router = require("express").Router();
const { AuthController } = require("../controllers");

router.get("/:id", AuthController.getUser);

module.exports = router;
