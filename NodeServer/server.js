let http = require("http");
let db = require("./database");
let PORT = 3200;
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "OPTIONS,PUT,POST,DELETE,GET",
  "Access-Control-Request-Headers": "*",
  "Access-Control-Max-Age": 2592000
};

http
  .createServer((request, response) => {
    response.writeHead(200, headers);

    switch (request.method) {
      case "GET": {
        switch (request.url) {
          case "/":
            response.write("welcome to the server");
            response.end();
            break;

          case "/api/todos":
            db.getAllData().then(data => {
              response.end(data);
            });
            break;

          case "/api/todos/1":
            db.getDataById(1).then(data => {
              response.end(data);
            });
            break;
          case "/api/todos/2":
            db.getDataById(2).then(data => {
              response.end(data);
            });
            break;
        }
        break;
      }
      case "OPTIONS": {
        console.log("Called options");
        response.end();
        break;
      }
      case "POST": {
        console.log("post called");
        response.end();
        break;
      }
      case "DELETE": {

        let url = request.url.split('');
        let id = parseInt( url.slice(11, url.length).join(""))

        db.deleteDataByID(id)

        break;
      }
      case "PUT": {
        
        let body = "";
        request.on("data", data => {
          body += data;
        });
        request.on("end", () => {

          db.markCompleteByID(JSON.parse(body).id, JSON.parse(body).completed)
         
        });

        break;
      }
    }
  })
  .listen(PORT, () => {
    console.log(`Server is listening on port:${PORT}`);
  });


