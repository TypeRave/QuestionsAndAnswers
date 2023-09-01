const { Router } = require("express");
const controller = require('./controllers.js')

const router = Router();

router.get('/', controller.getQuestions);

module.exports = router;