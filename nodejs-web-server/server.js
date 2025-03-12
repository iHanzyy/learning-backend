const http = require("http");

const requestListener = (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;

  const { url, method } = request;

  if (url === "/") {
    if (method == "GET") {
      response.end("<p>Ini adalah Homepage</p>");
    } else {
      response.statusCode = 404;
      response.end(
        `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      );
    }
  } else if (url === "/about") {
    if (method == "GET") {
      response.end("<p>Halo! ini adalah halaman about</p>");
    } else if (method == "POST") {
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        const parsedBody = Buffer.concat(body).toString();
        const { name } = JSON.parse(parsedBody);
        response.end(`<p>Halo! ${name} Ini adalah halaman about</p>`);
      });
    } else {
      response.statusCode = 404;
      response.end(
        `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      );
    }
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const hostname = "localhost";

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
