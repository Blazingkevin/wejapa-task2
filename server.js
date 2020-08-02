const http = require("http");
const model = require("./model");

const server = http.createServer(function (req, res) {
  if (req.method == "POST" && req.url == "/create") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      body = JSON.parse(body);
      model.create(body.topic, body.title, body.content);
      res.end(JSON.stringify(body));
    });
  } else if (req.method == "GET" && req.url == "/notes") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const notes = model.findAll(JSON.parse(body).topic);
      res.end(JSON.stringify({ notes }));
    });
  } else if (req.method == "GET" && req.url == "/note") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      body = JSON.parse(body);
      const note = model.findOne(body.topic, body.title);
      res.end(JSON.stringify(note));
    });
  }
});

server.listen(3000, "localhost", () =>
  console.log("server is listening on port 3000")
);
