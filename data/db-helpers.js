const db = require("./dbConfig");

module.exports = {
  addProjects,
  addResources,
  addTasks,
  getProjects,
  getResources,
  getTasks,
  getProjectById
};

function addProjects(project) {
  return db("projects").insert(project);
}

function addResources(resource) {
  return db("resources").insert(resource);
}

function addTasks(task, id) {
  return db("tasks").insert({ ...task, projectId: id });
}

function getProjects() {
  return db("projects");
}

function getResources() {
  return db("resources");
}

function getTasks() {
  return db
    .select(
      "projectName as Project",
      "p.description as Project Description",
      "t.*"
    )
    .from("tasks as t")
    .join("projects as p", "p.id", "=", "t.projectId");
}

function getProjectById(id) {
  return db("projects").where("id", id);
}
