require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const server = express();
const PORT = process.env.APP_PORT || 5000;
const bodyParser = require("body-parser");
const database = require("./src/config/postgre");
const mainRouter = require("./src/routes/mainRouter");

database
   .connect()
   .then(() => {
      console.log("Database Connected!");

      server.use(express.json());
      server.use(express.urlencoded({ extended: false }));
      server.use(cors());
      server.use(
         morgan(":method :url :status :res[content-length] - :response-time ms")
      );
      server.use(bodyParser.json());
      server.use(mainRouter);

      server.listen(PORT, () => {
         console.log(`Server is running at port ${PORT}`);
      });
   })

   .catch((err) => {
      console.log(err);
   });
