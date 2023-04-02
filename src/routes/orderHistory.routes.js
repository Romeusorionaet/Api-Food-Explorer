const {Router} = require("express");

const orderHistoryRoutes = Router();

const OrderHistoryController = require("../Controllers/OrderHistoryController.js");

const orderHistoryController = new OrderHistoryController();

orderHistoryRoutes.get("/:id", orderHistoryController.index);
orderHistoryRoutes.get("/", orderHistoryController.show);
orderHistoryRoutes.post("/:id", orderHistoryController.create);
orderHistoryRoutes.put("/", orderHistoryController.update);

module.exports = orderHistoryRoutes;