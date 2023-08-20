//module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  console.log("not found");
  callback(404, {
    message: "your requested url is not found",
  });
};

module.exports = handler;
