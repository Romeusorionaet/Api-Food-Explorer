const {Router} = require("express");

const requestsRoutes = Router();

const RequestsController = require("../Controllers/RequestsController.js");

const requestsController = new RequestsController();

requestsRoutes.get("/:id", requestsController.show);
requestsRoutes.post("/", requestsController.create);
requestsRoutes.delete("/:plate_id/:user_id", requestsController.delete);

module.exports = requestsRoutes;