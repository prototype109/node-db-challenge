const express = require("express");
const db = require("../data/db-helpers");

const task = express.Router();

task.get("/", async (req, res) => {
  try {
    const tasks = await db.getTasks();
    //res.status(200).json(tasks);
    res.status(200).json(fixCompleteDisplay(tasks));
  } catch (error) {
    res.status(500).json(error);
  }
});

task.post("/:id", validateId, validateTask, async (req, res) => {
  try {
    const task = await db.addTasks(req.body, req.params.id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
});

function validateTask(req, res, next) {
  const reqBody = req.body;

  if (!reqBody.description) {
    return res.status(400).json({ message: "Missing task description" });
  } else {
    next();
  }
}

async function validateId(req, res, next) {
  const id = req.params.id;

  try {
    await db.getProjectById(id);
    next();
  } catch (error) {
    res.status(500).json(error);
  }
}

function fixCompleteDisplay(tasks) {
  const fixedCompleted = tasks.map(task => {
    if (task.completed === "false") {
      task.completed = false;
    } else {
      task.completed = true;
    }
    return task;
  });
  return fixedCompleted;
}

module.exports = task;
