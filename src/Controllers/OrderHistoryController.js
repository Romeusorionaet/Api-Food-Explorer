const knex = require("../database/knex");

class OrderHistory {
    async create(request, response){
        const user_id = request.params.id;
        const orderHistory = await knex('requests').where({user_id});

        let newOrderHistoryDetails = [];
        orderHistory.map(item => {
            newOrderHistoryDetails.push(`${item.amount} x ${item.title}`)
        });

        let details = newOrderHistoryDetails.join(", ");

        await knex('orderHistory').insert({
            details,
            user_id
        });

        return response.status(200).json();
    }

    async index(request, response){
        const user_id = request.params.id;

        const orderHistory = await knex('orderHistory')
        .where({user_id})
        .orderBy('status');

        orderHistory.reverse();

        return response.json(orderHistory);
    }

    async show(request, response){
        const orderHistory = await knex('orderHistory')
        .orderBy('status');

        orderHistory.reverse();

        return response.json(orderHistory);
    }

    async update(request, response){
        const {code, status} = request.body;
        
        if(code && status){
            await knex("orderHistory")
            .where({id: code})
            .update({status});
        }

        return response.json();
    }
}

module.exports = OrderHistory;