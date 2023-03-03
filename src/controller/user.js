const userModel = require("../model/user");
const sendResponse = require("../helpers/response");

const getUser = async (req, res) => {
   try {
      const response = await userModel.getDataUser(req.params.userid);
      sendResponse.success(res, response.status, response);
   } catch (error) {
      console.log(error);
      sendResponse.error(res, error.status, error);
   }
};

const postUser = async (req, res) => {
   try {
      const response = await userModel.postDataUser(req.body);
      sendResponse.success(res, response.status, response);
   } catch (error) {
      console.log(error);
      sendResponse.error(res, error.status, error);
   }
};

const deleteUser = async (req, res) => {
   try {
      const response = await userModel.delDataUser(req.params.userid);
      sendResponse.success(res, response.status, response);
   } catch (error) {
      console.log(error);
      sendResponse.error(res, error.status, error);
   }
};

const userController = {
   getUser,
   postUser,
   deleteUser,
};

module.exports = userController;
