const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');

const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/testDB",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg","image/jpg" , "image/img"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });