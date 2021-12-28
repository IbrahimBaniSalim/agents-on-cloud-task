const express = require("express");
const {
  getAllUsersService,
 
  getAllUsersService1
} = require("../controllers/buyer");
//middle-wares
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const buyerRouter = express.Router();

buyerRouter.get("/usersByRole", getAllUsersService);
buyerRouter.get("/usersByRolee", getAllUsersService1);



authentication, authorization("Admin"), (module.exports = buyerRouter);

