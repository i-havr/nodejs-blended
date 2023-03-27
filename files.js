const fsPromises = require("fs").promises;
const path = require("path");

const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

exports.createFile = async (req, res) => {
  try {
    const { content, filename } = req.body;

    const result = dataValidator(req.body);

    if (result.error) {
      res.status(400).json({
        message: `Please specify ${result.error.details[0].context?.key} parameter`,
      });
      return;
    }

    const checkExt = checkExtention(filename);

    if (!checkExt.isCorrectExtention) {
      res.status(400).json({
        message: `Sorry, application doesn't support ${checkExt.extention} extention`,
      });
      return;
    }

    await fsPromises.writeFile(
      path.join(__dirname, "./files", filename),
      content,
      "utf-8"
    );

    res.status(201).json(filename);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await fsPromises.readdir(path.join(__dirname, "./files"));
    if (!files.length) {
      res.status(404).json({ message: "There are no files in this directory" });
      return;
    }

    res.status(200).json(files);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getFile = async (req, res) => {
  try {
    const { filename } = req.params;

    const files = await fsPromises.readdir(path.join(__dirname, "./files"));
    if (!files.includes(filename)) {
      res.status(404).json({ message: `The file ${filename} wasn't found` });
      return;
    }

    const file = files.find((file) => file === filename);
    const text = await fsPromises.readFile(
      path.join(__dirname, "./files", filename),
      "utf-8"
    );

    const stat = await fsPromises.stat(path.join(__dirname, "./files", file));

    res.status(200).json({
      file,
      content: text,
      extention: checkExtention(file).extention,
      size: stat.size,
      date: stat.birthtime.toString(),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
