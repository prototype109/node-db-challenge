const express = require("express");
const projectRouter = require("./router/projectRouter");
const resourceRouter = require("./router/resourceRouter");
const taskRouter = require("./router/taskRouter");

const server = express();

server.use(express.json());

server.use("/projects", projectRouter);
server.use("/resources", resourceRouter);
server.use("/tasks", taskRouter);

server.get("/", (req, res) => {
  res.send("Home page of Sprint project");
});
