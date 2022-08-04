const csvToJson = require("csvtojson");

module.exports = () => {
  const csvFilePath = "data.csv";
  const metricData = csvToJson()
    .fromFile(csvFilePath)
    .then(function (jsonArrayObj) {
      return jsonArrayObj;
    });

  return metricData;
};
