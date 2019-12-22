const router = require("express").Router();
const { SubscriberController } = require("../controllers");

router.post("/login", SubscriberController.signUp);

module.exports = router;
