const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
app.use(express.json());
app.use(cors());

app.use(helmet());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "HEAD", "OPTIONS", "PATCH", "PUT", "DELETE"],
    contentlength: undefined,
  })
);

app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' https://apis.google.com",
    "'font-src 'self' https://fonts.gstatic.com",
    "img-src 'self'",
    "'script-src 'self'"
  );
  return next();
});

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}

app.use(ignoreFavicon);

const products = require("./Routes/product.js");
app.use("/product/api", products);

app.use("/", express.static("Uploads"));

const PORT = 5000;

const db = require("./models");

db.sequelize
  .sync()
  .then(() => {
    const server = app.listen(process.env.PORT || PORT, () => {
      console.log("Servidor activo en Puerto- " + PORT);
    });
  })
  .catch((err) => {
    console.log(`Error connecting : ${err.message}`);
  });
