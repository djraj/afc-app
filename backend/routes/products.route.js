module.exports = (app) => {
    const router = require("express").Router();
    const config = require("../config/config.js");
    const productControl = require('../controller/products.controller.js')

    router.get('/', productControl.getProducts);
    router.post('/', productControl.addProducts);

    app.use('/api/products', router);
};