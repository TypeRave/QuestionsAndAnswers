const { Router } = require("express");
const controller = require('./controllers.js')

const router = Router();

router.get('/questions/', controller.getQuestions);
router.get('/questions/:question_id/answers/', controller.getAnswers);
router.put('/questions/:question_id/helpful/', controller.markQuestionHelpful)
router.put('/answers/:answer_id/helpful/', controller.markAnswerHelpful)
router.post('/questions/', controller.addQuestion)

module.exports = router;