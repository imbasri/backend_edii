const express = require("express");
const usersRouter = express.Router();
// controller
const { getUser, postUser, deleteUser } = require("../../controller/user");

usersRouter.get("/:userid", getUser);
usersRouter.post("/", postUser);
usersRouter.delete("/:userid", deleteUser);

module.exports = usersRouter;
