const fs = require("fs");
const util = require("util");
const path = require("path");
// const Note = require('Note' ;

const db_path = process.env.DB_PATH || "store";

const construct_path = (topic, title) => {
  return path.join(
    db_path,
    topic.toLowerCase().replace(/\s/g, "_"),
    title.toLowerCase().replace(/\s/g, "_")
  );
};

"kvin".replace();

// ensure that folder exists and if it doesn't, creates the new folder
const ensure = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

// Model methods to perform CRUD operations on a file system storage
const create = (topic, title, content) => {
  // ensure the directory exists..if it doesn't, create it.
  ensure(path.join(db_path, topic.toLowerCase().replace(/\s/g, "_")));
  const note = {
    title,
    content,
  };
  fs.writeFile(construct_path(topic, title), JSON.stringify(note), (err) => {
    console.log(err);
  });
};

const findAll = (topic) => {
  const files = fs.readdirSync(
    path.join(db_path, topic.toLowerCase().replace(/\s/g, "_"))
  );
  const notes = [];
  files.forEach((file) => {
    const fileContent = fs.readFileSync(construct_path(topic, file)).toString();
    // convert content to javascript object
    notes.push(JSON.parse(fileContent));
  });

  return notes;
};

const findOne = (topic, title) => {
  const fileContent = fs.readFileSync(construct_path(topic, title)).toString();
  // convert the file content to javascript object
  const note = JSON.parse(fileContent);
  return note;
};

module.exports = {
  create,
  findOne,
  findAll,
};
