const knex = require("../database/knex");
const AppError = require("..//utils/AppError");
const DiskStorage = require("../providers/DiskStorageForPlate");

class PlatesImagemController {
    async update(request, response){
        const plate_id = request.params;
        const imgPlateFilename = request.file.filename;
        const diskStorage = new DiskStorage();
        
        const plate = await knex("plates")
        .where(plate_id).first();
        
        if(!plate){
            throw new AppError("Ação negado.", 401);
        } 
        
        if(plate.imagem){
            await diskStorage.deleteFile(plate.imagem);
        }
        
        const filename = await diskStorage.saveFile(imgPlateFilename);
        plate.imagem = filename;
        
        await knex("plates").update({imagem: plate.imagem}).where({id: plate_id.id});
        await knex("favorites").update({imagem: plate.imagem}).where({id: plate_id.id});
        
        return response.json(plate);
    }
}

module.exports = PlatesImagemController;