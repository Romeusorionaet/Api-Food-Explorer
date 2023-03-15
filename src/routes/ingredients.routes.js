const {Router} = require("express");

const IngredientsController = require("../controllers/IngredientsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const ingredientsRoutes = Router();

const ingredientsController = new IngredientsController();

ingredientsRoutes.use(ensureAuthenticated);

ingredientsRoutes.get("/", ingredientsController.index);
ingredientsRoutes.get("/:id", ingredientsController.show);
ingredientsRoutes.put("/:id", ingredientsController.update);

module.exports = ingredientsRoutes;