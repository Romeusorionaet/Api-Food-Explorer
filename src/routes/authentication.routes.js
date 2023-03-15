const {Router} = require('express');

const AuthenticationController = require("../Controllers/AuthenticationController");
const authenticationController = new AuthenticationController();

const authenticationRoutes = Router();
authenticationRoutes.post("/", authenticationController.create);

module.exports = authenticationRoutes;