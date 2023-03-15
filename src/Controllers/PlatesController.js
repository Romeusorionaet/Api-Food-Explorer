const knex = require("../database/knex");
const sqliteConnection = require("../database/sqlite")
const AppError = require("..//utils/AppError");
const DiskStorage = require("../providers/DiskStorageForPlate");
const store = require("store2");

class PlatesController{
    async create(request, response){
        const data = request.body.data;
        
        const {title, description, category, ingredients, price} = JSON.parse(data);
        const user_id = request.user.id;
        const imagem = request.file.filename;
        
        const diskStorage = new DiskStorage();
        const filename = await diskStorage.saveFile(imagem);
        
        const [plate_id] = await knex("plates").insert({
            title,
            imagem: filename,
            description,
            category,
            price,
            user_id
        });
      
        const ingredientsInsert = ingredients.map(name => {
            return{
                plate_id,
                name,
                user_id
            }
        });
        
        await knex("ingredients").insert(ingredientsInsert);
        return response.json().status(200);
    }

    async show(request, response){
        const {id} = request.params;

        const plate = await knex("plates").where({id}).orderBy("title");
        const ingredients = await knex("ingredients").where({plate_id: id}).orderBy("name");
    
        return response.json([
            ...plate,
            ingredients
        ]);
    }

    async delete(request, response){
        const {id} = request.params;
        const diskStorage = new DiskStorage();

        const plate = await knex("plates")
        .where({id}).first()
      
        if(plate.imagem){
            await diskStorage.deleteFile(plate.imagem);
        }
        await knex("plates").where({id}).delete();
        await knex("favorites").where({id}).delete();

        return response.json();
    }

    async index(request, response){
        const { title, ingredients } = request.query;
       
        let plates
        
        if(title){
            //a busca deu 50% certo, apenas com erro de quando existir dois prato com nomes parecidos por exemplo
            //feijoada e feijoada edit, ira me retonar apenas o feijodada edit que é o ultimo cadastrado e
            // isso sempre que pesquiso, ou seja. Nuca irá aparecer o prato feijoada.
            //precisa adiantar outras coisas pois creio que aqui seja apenas questão de lógica ou
            //do modo que estou pegando no banco de dados, tenho que ver isso mais na frente.
            // ingredientsParse.map(item=>{
                //     plates.push(item.plates_id)
                // })
                
                plates = await knex("plates")
                .whereLike("plates.title", `%${title}%`)
                .orderBy('title')
                
            }else{
                
                plates = await knex('plates').orderBy('title')
            }


            //console.log(plates)
            
        return response.json(plates);
    }
    
    async update(request, response){
        const plate_id = request.params.id;
        const {title, description, category, price} = request.body;
        
        const database = await sqliteConnection();
        const plate = await database.get("SELECT * FROM plates WHERE id = (?)", [plate_id]);
        
        const [saveId] = await knex('favorites')
        .where({id: plate_id})

        if(saveId){
            await knex('favorites')
            .where({id: plate_id}).delete()
            
            await knex('favorites')
            .insert({
                id: plate_id,
                title,
                category,
                description,
                price,
                user_id: saveId.user_id
            })
        }  

        if(!plate) {
            throw new AppError("Prato não encontrado");
        }

        plate.title = title ?? plate.title;
        plate.description = description ?? plate.description;
        plate.category = category ?? plate.category;
        plate.price = price ?? plate.price;

        await database.run(`
            UPDATE plates SET
            title = ?,
            description = ?,
            category = ?,
            price = ?
            WHERE id = ?`,
            [
                plate.title, 
                plate.description, 
                plate.category,
                plate.price, 
                plate_id
            ]
        );
    
        return response.status(200).json();
    }
}

module.exports = PlatesController;