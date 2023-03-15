const fs = require("fs");
const path = require("path");
const uploadConfig = require("../configs/upload");

class DiskStorageForPlate {
    async saveFile(file) {
            await fs.promises.rename(
                path.resolve(uploadConfig.TMP_FOLDER_PLATE, file),
                
                path.resolve(uploadConfig.UPLOADS_FOLDER_PLATE, file)
            );
            return file; 
        }

    async deleteFile(file) {
        const filePathPlates = path.resolve(uploadConfig.UPLOADS_FOLDER_PLATE, file);

        try {
            await fs.promises.stat(filePathPlates);
        } catch {
            return;
        }
        await fs.promises.unlink(filePathPlates);
    }
}

module.exports = DiskStorageForPlate;
