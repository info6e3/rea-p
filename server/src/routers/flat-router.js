const {Router} = require('express')
const flatController = require('../controllers/flat-controller')
const authMiddleware = require("../middleware/auth-middleware");
const errorMiddleware = require("../middleware/error-middleware");

const flatRouter = new Router();

flatRouter.get('/get-flats-by-owner', authMiddleware, flatController.getFlatsByOwner)
flatRouter.get('/get-flats-within-bounds', flatController.getFlatsWithinBounds);
flatRouter.get('/get-flat-by-id', flatController.getFlatsById);
flatRouter.get('/get-nearest-flats', flatController.getNearestFlats);
flatRouter.post('/post-flat', authMiddleware, flatController.postFlat)

flatRouter.use(errorMiddleware);

module.exports = flatRouter;