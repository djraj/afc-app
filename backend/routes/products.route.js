module.exports = (app) => {
    const router = require("express").Router();
    const auth = require("../config/auth.js")
    const productControl = require('../controller/products.controller.js')

    router.post('/',auth.checkAuth, productControl.addProducts);
    router.get('/',auth.checkAuth,  productControl.getProducts);
    router.get('/:productId',auth.checkAuth,  productControl.getProduct);

    app.use('/api/products', router);
};