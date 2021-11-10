const express = require("express");
const router = express.Router();

const { categories } = require("../models");

router.get("/getCategories", async (req, res) => {
  const appData = await categories.findAll();
  res.json(appData);
});

const { products } = require("../models");

router.get("/getProducts", async (req, res) => {
  const product = await products.findByPk();
  res.json(product);
});

module.exports = router;
