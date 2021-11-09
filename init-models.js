var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _products = require("./products");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);


  return {
    categories,
    products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
