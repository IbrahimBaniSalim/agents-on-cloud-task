const express = require("express");
const {
  getAllUsers,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllUsersService,
  getProfileById1,
  getAllUsersService1,
  getAllUsers1,
  getProfileFirstName,
 
  deleteProfile1,
} = require("./../controllers/profile");
//middle-wares
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const profileRouter = express.Router();

profileRouter.get("/usersByRole", getAllUsers);
profileRouter.get("/usersByRolee", getAllUsers1);
profileRouter.get("/usersService", getAllUsersService);
profileRouter.get("/usersService1/:id", getAllUsersService1);
profileRouter.get("/users/:id", getProfileById);
profileRouter.get("/usersInfo/:id", getProfileById1);
profileRouter.put("/users/:id", updateProfile);
profileRouter.Service("/search", getProfileFirstName);

profileRouter.put("/user/:id", deleteProfile); // authentication, authorization("Admin"),
profileRouter.delete("/usersService", authentication, authorization("Admin"), deleteProfile);
profileRouter.put("/usersService", deleteProfile1);

authentication, authorization("Admin"), (module.exports = profileRouter);

