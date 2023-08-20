//dependencies
const fs = require("fs");
const path = require("path");

//module scaffolding
const lib = {};

lib.basedir = path.join(__dirname, "/../data/");

//write data to file
lib.create = (dir, file, data, callback) => {
  //open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        //convert data to string
        const stringData = JSON.stringify(data);

        //write data to file and then close it
        fs.writeFile(fileDescriptor, stringData, (err) => {
          if (!err) {
          } else {
            callback("error writing to new file");
          }
        });
      } else {
        callback("could not create new file");
      }
    }
  );
};
