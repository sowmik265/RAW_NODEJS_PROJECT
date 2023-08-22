// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const data = require("./lib/data");

//app object - module scaffolding
const app = {};

//testing file system
// data.create(
//   "test",
//   "newFile",
//   {
//     name: "messi",
//     country: "argentina",
//     jersey: 10,
//   },
//   (err) => {
//     console.log("error is", err);
//   }
// );

// data.read("test", "newFile", (err, result) => {
//   console.log(err, result);
// });

// data.update(
//   "test",
//   "newFile",
//   { name: "lulus", surname: "polus" },
//   (err) => {
//     console.log(err);
//   }
// );

data.delete("test", "newFile", (err) => {
  console.log(err);
});

// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

app.handleReqRes = handleReqRes;

//start the server
app.createServer();
