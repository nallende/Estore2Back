const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const product = require("./Routes/product");
app.use("/product/api", product);

app.use("/", express.static("Uploads"));

const PORT = 5000;

const server = app.listen(process.env.PORT || PORT, () => {
  console.log("Servidor activo en Puerto- " + PORT);
});
