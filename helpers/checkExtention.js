const checkExtention = (filename) => {
  const EXTENTIONS = ["yml", "xml", "js", "json", "txt"];

  const extention = filename.slice(filename.lastIndexOf(".") + 1);
  const isCorrectExtention = EXTENTIONS.some((item) => item === extention);

  return {
    isCorrectExtention,
    extention,
  };
};

module.exports = checkExtention;
