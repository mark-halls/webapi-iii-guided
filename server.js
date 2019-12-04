const express = require("express"); // importing a CommonJS module
const helmet = require(`helmet`);

const hubsRouter = require("./hubs/hubs-router.js");

const server = express();

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl}`);
  next();
}

function auth(req, res, next) {
  const headers = req.headers;
  if (headers.password === `mellon`) {
    next();
  } else {
    res.status(401).json({ message: `you shall not pass` });
  }
}

server.use(helmet());
server.use(express.json());
server.use(logger);

server.use("/api/hubs", hubsRouter);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get("/area51", auth, (req, res) => {
  res.send(req.headers);
});

module.exports = server;
