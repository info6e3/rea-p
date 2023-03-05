const FlatService = require('../services/flat-service');
const ImageService = require('../services/image-service');
const AuthError = require("../exceptions/auth-error");

class FlatController {
    async getFlatsById(req, res, next) {
        try {
            const {id} = req.query;
            const points = await FlatService.getFlatsById(id)
            res.status(200).send(points);
        } catch(e) {
            next(e);
        }
    }
    async getFlatsWithinBounds(req, res, next) {
        try {
            const {bounds} = req.query;
            const points = await FlatService.getFlatsWithinBounds(...bounds)
            res.status(200).send(points);
        } catch(e) {
            next(e);
        }
    }
    async getNearestFlats(req, res, next) {
        try {
            const {point, lim} = req.query;
            const points = await FlatService.getNearestFlats(point, lim)
            res.status(200).send(points);
        } catch(e) {
            next(e);
        }
    }

    async postFlat(req, res, next) {
        try {
            const flat = req.body;
            const user = req.user;
            flat.owner = user.id;
            flat.coordinates = flat.coordinates.split(',');
            const photos = req.files;
            const links = await ImageService.addPhotos(photos);
            if(!links) {
                return next(AuthError.BadRequest('Нет фото.'));
            }
            flat.photos = links;
            const flatId = await FlatService.postFlat(flat)
            res.status(200).send(flatId);
        } catch(e) {
            next(e);
        }
    }

    async getFlatsByOwner(req, res, next) {
        try {
            const user = req.user;
            const owner = user.id;
            const flats = await FlatService.getFlatsByOwner(owner)
            res.status(200).send(flats);
        } catch(e) {
            next(e);
        }
    }
}

module.exports = new FlatController();