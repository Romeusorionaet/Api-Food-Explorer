const {Router} = require("express");

const usersRouter = require("./users.routes.js");
const platesRouter = require("./plates.routes.js");
const ingredientsRouter = require("./ingredients.routes.js");
const authenticationRouter = require("./authentication.routes.js");
const requestsRouter = require("./requests.routes.js");
const favoritesRouter = require("./favorites.routes.js");
const orderHistoryRouter = require("./orderHistory.routes.js");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/plates", platesRouter);
routes.use("/ingredients", ingredientsRouter);
routes.use("/authentication", authenticationRouter);
routes.use("/requests", requestsRouter);
routes.use("/favorites", favoritesRouter);
routes.use("/orderHistory", orderHistoryRouter);

module.exports = routes;