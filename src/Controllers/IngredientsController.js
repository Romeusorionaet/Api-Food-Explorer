const knex = require("../database/knex");

class IngredientsController {
    async index(request, response){
        const { name } = request.query;
        
//         const database = await sqliteConnection();
// const ingredients = await database.get("SELECT * FROM ingredients WHERE plates_id = (?)", [name]);
        //const id = awaait knex("")

        const ingredients = await knex("ingredients")
        .select("plate_id")
        .whereLike("name", `%${name}%`)
        //console.log(ingredients)
        // if(title){
        //     plates = await knex("plates").whereLike("plates.title", `%${title}%`)
        // }else{
        //     plates = await knex('plates')
        //     //console.log(plates)
        // }

        return response.json(ingredients)

        // //const user_id = request.user.id;
        // const {ingredients} = request.query;

        // //const ingredients_id = request.params.id;
        // const ingredient = await knex("ingredients")
        // .where({name: ingredients})
        // .groupBy("name")
        
        // console.log(ingredient)
        // return response.json(ingredient);
    }

    async show(request, response){
        const plate_id = request.params;

        const ingredients = await knex("ingredients").where({plate_id: plate_id.id})

        return response.json(ingredients)
    }

    async update(request, response){
        const user_id = request.user.id;

        const plate_id = request.params.id;
        const {ingredients} = request.body;

        await knex('ingredients').where({plate_id}).delete();
       
        const insertIngredients = ingredients.map(name => {
            return {
                name,
                plate_id,
                user_id
            }
        })
    
        await knex('ingredients').insert(insertIngredients)

        return response.status(200).json();
    }
}

module.exports = IngredientsController;