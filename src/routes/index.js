const {Router} = require("express");

const usersRouter = require("./users.routes");
const platesRouter = require("./plates.routes");
const ingredientsRouter = require("./ingredients.routes");
const authenticationRouter = require("./authentication.routes");
const requestsRouter = require("./requests.routes");
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