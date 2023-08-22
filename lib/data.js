//dependencies
const { dir } = require("console");
const fs = require("fs");
const path = require("path");

//module scaffolding
const lib = {};

lib.basedir = path.join(__dirname, "/../.data/");

//write data to file
lib.create = (dir, file, data, callback) => {
  //open file for writing
  fs.open(`${lib.basedir + dir}/${file}.json`, "wx", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //convert data to string
      const stringData = JSON.stringify(data);

      //write data to file and then close it
      fs.writeFile(fileDescriptor, stringData, (err) => {
        if (!err) {
          fs.close(fileDescriptor, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback("error closing the new file");
            }
          });
        } else {
          callback("error writing to new file");
        }
      });
    } else {
      callback("could not create new file");
    }
  });
};

//read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};

//update existing file
lib.update = (dir, file, data, callback) => {
  //open file for writing
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      //convert data to string
      const stringData = JSON.stringify(data);

      //truncate the file
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          //write to the file and close it
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              //close the file
              fs.close(fileDescriptor, (err) => {
                if (!err) {
                  callback(false);
                } else {
                  callback("error closing file");
                }
              });
            } else {
              callback("error writing to file");
            }
          });
        } else {
          console.log("error truncating file");
        }
      });
    } else {
      callback("file may not exist");
    }
  });
};

//delete the file
lib.delete = (dir, file, callback) => {
  //unlink the file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback("error deleting file");
    }
  });
};

module.exports = lib;
