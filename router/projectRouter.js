const express = require("express");
const db = require("../data/db-helpers");

const project = express.Router();

project.get("/", async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json(error);
  }
});

project.post("/", validateProject, async (req, res) => {
  res.status(200).json(req.project);
});

async function validateProject(req, res, next) {
  const reqBody = req.body;

  if (!reqBody.projectName) {
    return res.status(400).json({ message: "Missing project name" });
  }

  try {
    const project = await db.addProjects(req.body);
    req.project = project;
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = project;
