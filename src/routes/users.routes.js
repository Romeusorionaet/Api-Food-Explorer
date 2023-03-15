const {Router} = require("express");

const usersRoutes = Router();

const UsersController = require("../controllers/UsersController");

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
// usersRoutes.get("/", usersController.show);

module.exports = usersRoutes;