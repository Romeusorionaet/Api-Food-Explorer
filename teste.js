async index(request, response){
    //fazer o tratamento de error aq
    const { title, ingredients } = request.query;
    const user_id = request.params.id

    let favoritesPlateId = []
    let newListPlates = []
    
    const favorite = await knex('favorites')
    .where({user_id})

    const comparePlates = await knex('plates');

    favorite.map(item=>{
        favoritesPlateId.push(item.plate_id)
    })

    for(let item of comparePlates){
        if(favoritesPlateId.includes(item.id) === false){
            newListPlates.push(item)
        }
    }

    let newListPlatesWithFavorites = newListPlates.concat(favorite)

    //console.log(newListPlatesWithFavorites)    

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
            //console.log(plates)
            
            plates = await knex("plates")
            .whereLike("plates.title", `%${title}%`)
            
        }else{

            plates = newListPlatesWithFavorites
            //plates = await knex('plates');
        }

        console.log(plates)
        
    return response.json(plates);
}