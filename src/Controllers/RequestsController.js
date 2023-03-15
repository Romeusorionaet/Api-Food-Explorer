const knex = require("../database/knex");

class RequestsContoller {
    async create(request, response){
        const {title, description, price, category, amount, plate_id, user_id} = request.body;

        const [checkIfExist] = await knex("requests")
        .where({plate_id})
        .where({user_id});

        const [plate] = await knex("plates")
        .where({id: plate_id});
        
        if(checkIfExist){
            await knex("requests")
            .where({plate_id})
            .update({amount: amount})
            //colocar uma alert aq do AppError
        }else{
            await knex("requests")
            .insert({
                title,
                description,
                price,
                category,
                amount,
                plate_id,
                user_id,
                imagem: plate.imagem     
            })
        }

        return response.status(201).json()
    }
    async show(request, response){
        //pensar em outro nome pq esse requests confundi
        //preciso filtrar a requisição pq ta sendo pedido tudo no banco sendo que
        //so estou usando no front o price, title e amount
        const user_id = request.params.id;
        const requests = await knex("requests").where({user_id})

        return response.json(requests)
    }
    async delete(request, response){
        const user_id = request.params.user_id;
        const plate_id = request.params.id;

        await knex("requests")
        .where({plate_id})
        .where({user_id})
        .delete()

        return response.json()
    }
}

module.exports = RequestsContoller;