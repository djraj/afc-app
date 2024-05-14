module.exports = (app) => {
    const router = require("express").Router();
    const auth = require("../config/auth.js")
    const userControl = require('../controller/user.controller.js')

    router.post('/', userControl.registerUser);
    router.post('/login', userControl.login);
    router.get('/', auth.checkAuth, userControl.getUser);

    app.use('/api/user', router);
};