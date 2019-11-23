const express = require("express");
const db = require("../data/db-helpers");

const project = express.Router();

project.get("/", async (req, res) => {
  try {
    const projects = await db.getProjects();
    res.status(200).json(fixCompleteDisplay(projects));
  } catch (error) {
    res.status(500).json(error);
  }
});

project.post("/", validateProject, async (req, res) => {
  try {
    const project = await db.addProjects(req.body);
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json(error);
  }
});

function validateProject(req, res, next) {
  const reqBody = req.body;

  if (!reqBody.projectName) {
    return res.status(400).json({ message: "Missing project name" });
  } else {
    next();
  }
}

function fixCompleteDisplay(projects) {
  const fixedCompleted = projects.map(project => {
    if (project.completed === "false") {
      project.completed = false;
    } else {
      project.completed = true;
    }
    return project;
  });
  return fixedCompleted;
}

module.exports = project;
