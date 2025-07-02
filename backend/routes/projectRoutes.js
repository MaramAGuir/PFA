// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const { createProject, getAllProjects } = require("../controllers/projectController");

router.post("/", createProject);       // POST /api/projects
router.get("/", getAllProjects);       // GET /api/projects

module.exports = router;
