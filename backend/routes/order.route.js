module.exports = (app) => {
    const router = require("express").Router();
    const auth = require("../config/auth.js")
    const orderControl = require('../controller/order.controller.js')

    router.post('/', auth.checkAuth, orderControl.createOrder);
    router.get('/', auth.checkAuth, orderControl.getOrders);
    router.get('/:orderId', auth.checkAuth, orderControl.getOrder);

    app.use('/api/order', router);
};