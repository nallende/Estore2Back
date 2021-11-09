const express = require("express");
const product = express();
const cors = require("cors");
const database = require("../Database");

product.get("/getCategories", async (req, res) => {
  let appData = {
    isError: false,
    data: [],
  };
  database.connection.getConnection((err, connection) => {
    if (err) {
      appData.isError = true;
      appData.data = err;
      res.status(500).json(appData);
    } else {
      await connection.query("Select * from categories", (error, rows) => {
        if (error) {
          appData.isError = true;
          appData.data = err;
          res.status(500).json(appData);
        } else {
          appData.data = rows;
          res.status(200).json(appData);
        }
      });
      connection.release();
    }
  });
});

product.get("/getProducts", async (req, res) => {
  let appData = {
    isError: false,
    data: [],
  };
  database.connection.getConnection((err, connection) => {
    if (err) {
      appData.isError = true;
      appData.data = err;
      res.status(500).json(appData);
    } else {
      await connection.query("Select * from products", (error, rows) => {
        if (error) {
          appData.isError = true;
          appData.data = err;
          res.status(500).json(appData);
        } else {
          appData.data = rows;
          res.status(200).json(appData);
        }
      });
      connection.release();
    }
  });
});

module.exports = product;
