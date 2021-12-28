const express = require("express");
const {
  getAllServiceByUserId,
addService,
getServiceId,
deleteService,
  updateService,
} = require("./../controllers/seller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const ServiceRouter = express.Router();

postRouter.get("/Service/all/:id", getAllServiceByUserId);
postRouter.post("/Service", addService);
postRouter.get("/Service/:id", getServiceId);
postRouter.put("/Service/:id",  deleteService);
postRouter.put("/Service/:id", updateService);
module.exports = ServiceRouter;

// authentication, authorization("1"),
