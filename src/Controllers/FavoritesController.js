const knex = require("../database/knex");

class FavoritesController {
    async create(request, response){
        const {title, category, description, price, imagem, user_id, plate_id} = request.body;

        const [checkExist] = await knex("favorites")
        .where({user_id})
        .where({id: plate_id});

        const [plate] = await knex('plates')
        .where({id: plate_id});

        let currentValue = plate.favorited;

        if(checkExist){
            await knex("favorites")
            .where({user_id})
            .where({id: plate_id})
            .delete();

            await knex('plates')
            .update('favorited', currentValue - 1)
            .where({id: plate_id});
            
        }else{
            await knex("favorites").insert({
                title,
                imagem,
                category,
                description,
                price,
                id: plate_id,
                user_id
            });

            await knex('plates')
            .update('favorited', currentValue + 1)
            .where({id: plate_id});
        }
        
        response.status(200).json()
    }

    async index(request, response){
        const {title} = request.query;
        const user_id = request.params.user_id;

        let plateFavorites;

        if(title){
            plateFavorites = await knex("favorites")
            .whereLike("favorites.title", `%${title}%`)
            .where({user_id})
            .orderBy('title');
        }else{
            plateFavorites = await knex("favorites")
            .where({user_id})
            .orderBy('title');
        }
        

        return response.json(plateFavorites);
    }
    
    async delete(request, response){
        const id = request.params.id;
        const user_id = request.params.user_id;

        await knex("favorites")
        .where({user_id})
        .where({id})
        .delete();

        const [plate] = await knex('plates')
        .where({id});

        let currentValue = plate.favorited;

        await knex('plates')
        .update('favorited', currentValue - 1)
        .where({id});

        return response.json();
        
    }
}

module.exports = FavoritesController;