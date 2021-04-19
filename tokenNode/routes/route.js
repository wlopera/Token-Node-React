const controller = require("../controllers/controller");
const router = require("express").Router();

router.post("/v1/token/login", controller.getLogin);
router.get("/v1/token/secure", controller.getSecure);
router.get("/v1/token/data", controller.middleware, controller.getData);

router.post("/v1/token/sendEmail", controller.middleware, controller.sendEmail);

module.exports = router;
