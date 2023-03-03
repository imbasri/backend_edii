const express = require("express");
const userRouter = require("./userRouter/users");
const mainRouter = express.Router();

const prefix = "/api";
mainRouter.use(`${prefix}/user`, userRouter);

mainRouter.get("/", (req, res) => {
   res.json({
      msg: "Server Connected!",
   });
});

//export
module.exports = mainRouter;
