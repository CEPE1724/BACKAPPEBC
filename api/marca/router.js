const express = require("express");
const router = express.Router();
const contoller = require("./controller");

router.post("/", contoller.create);
router.get("/", contoller.getAll);

module.exports = router;