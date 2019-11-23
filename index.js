const server = require("./server.js");

const PORT = process.env.PORT;

server.listen(PORT || 4000, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
