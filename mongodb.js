const questionsSchema = new mongoose.Schema({
  product_id: {type: String, required: true},
  results: [
    question_id: {type: Number, required: true},
    question_body: {type: String},
    question_date: {type: Date}
    asker_name: {type: String},
    question_helpfulness: {type: Number},
    reported: {type: Boolean},
    answers: {
      {type: String} : {
        id: {type: Number},
        body: {type: String},
        answerer_name: {type: String},
        helpfulness: {type: Number},
        photos: [String]
      },
    }
  ],
});
