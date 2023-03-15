const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

const TMP_FOLDER_PLATE = path.resolve(__dirname, "..", "..", "tmp", "uploadsPlates");
const UPLOADS_FOLDER_PLATE = path.resolve(TMP_FOLDER_PLATE);

const MULTER_PLATE = {
   storage: multer.diskStorage({
       destination: TMP_FOLDER_PLATE,
       filename(request, file, callback) {
           const fileHash = crypto.randomBytes(10).toString("hex");
           const fileName = `${fileHash}-${file.originalname}`;

           return callback(null, fileName);
       },
   }),
};

module.exports = {
   TMP_FOLDER_PLATE,
   UPLOADS_FOLDER_PLATE,
   MULTER_PLATE,
}