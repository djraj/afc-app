module.exports = (app) => {
    const router = require("express").Router();
    const config = require("../config/config.js");
    const userControl = require('../controller/user.controller.js')

    router.post('/submit-payment', main.initiateTransaction);

    app.use('/api/user', router);
};