const express = require("express");
const db = require("../data/db-helpers");

const resource = express.Router();

resource.get("/", async (req, res) => {
  try {
    const resources = await db.getResources();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json(error);
  }
});

resource.post("/", validateResource, async (req, res) => {
  try {
    const resource = await db.addResources(req.body);
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json(error);
  }
});

function validateResource(req, res, next) {
  const reqBody = req.body;

  if (!reqBody.resourceName) {
    return res.status(400).json({ message: "Missing resource name" });
  } else {
    next();
  }
}

module.exports = resource;
