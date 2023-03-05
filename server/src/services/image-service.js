const uuid = require('uuid');
const fs = require('node:fs');
const sharp = require('sharp');

class ImageService {
    original_path = './images/original/'
    resized_path = './images/resized/'
    link_path = process.env.SERVER_URL + '/images/resized/';

    constructor() {
        if (!fs.existsSync(this.original_path))
            fs.mkdirSync(this.original_path, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Создана директория original.');
            });
        if (!fs.existsSync(this.resized_path))
            fs.mkdirSync(this.resized_path, (err) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Создана директория resized.');
            });
    }

    checkSignature(file) {
        const bytes = new Uint8Array(file.data);
        let signature = '';
        for (let i = 0; i < 3; i++) {
            signature += (bytes[i]).toString(16);
        }
        signature = signature.toUpperCase();
        if (signature === 'FFD8FF') {
            return '.jpg';
        }
        if (signature === '89504E') {
            return '.png';
        }
        return false;
    }

    async addPhotos(files) {
        const links = [];
        if (files) {
            for (const [key, file] of Object.entries(files)) {
                const format = this.checkSignature(file);
                if (format) {
                    const imageTitle = uuid.v4();
                    const original_path = this.original_path + imageTitle + format;
                    const resized_path = this.resized_path + imageTitle + format;
                    file.mv(original_path).then((err) => {
                        if (err) console.log(err)
                        sharp(original_path)
                            .resize(1200, 800)
                            .toFile(resized_path, (err, info) => {
                                if (err) console.log(err)
                            });
                    })
                    links.push(this.link_path + imageTitle + format);
                }
            }
        }
        return links.length > 0 ? links : false;
    }
}

module.exports = new ImageService();