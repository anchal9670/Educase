const express = require("express");
const router = express.Router();
const schoolController = require("../controller/schoolController");

// Route
router.post("/add", schoolController.addSchool);
router.get("/list", schoolController.listSchools);

module.exports = router;
