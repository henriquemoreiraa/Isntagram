const multer = require('multer');
const path = require('path');
const crypto = require('crypto');


module.exports = {
    dest: path.resolve(__dirname, '..', 'public'),
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, path.resolve(__dirname, '..', 'public'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);

                const filename = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, filename);
            });
        }
    }),
    limits: {
        filesize: 2 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const alowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];

        if (alowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        };
    }
};