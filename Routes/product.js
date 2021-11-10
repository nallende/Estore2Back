const express = require("express");
const router = express.Router();

const { categories } = require("../models");

router.get("/getCategories", async (req, res) => {
  let appData = {
    isError: false,
    data: [],
  };
  await categories.findAll((error, ...rows) => {
    if (error) {
      appData.isError = true;
      appData.data = err;
      res.status(500).json(appData);
    } else {
      appData.data = rows;
      res.status(200).json(appData);
    }
  });
});

const { products } = require("../models");

router.get("/getProducts", async (req, res) => {
  const product = await products.findByPk();
  res.json(product);
});

module.exports = router;
