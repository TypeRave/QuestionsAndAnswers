const questionsSchema = new mongoose.Schema({
  id: {type: Number, required: true},
  product_id: {type: String, required: true},
  body: {type: String},
  date_written: {type: Date}
  asker_name: {type: String},
  asker_email: {type: String},
  helpful: {type: Number},
  reported: {type: Boolean},
  answers: [],
});

const answerSchema = new mongoose.Schema({
  id: {type: Number},
  question_id: {type: Number}
  body: {type: String},
  date_written: {type: Date},
  answerer_name: {type: String},
  answerer_email: {type: String},
  reported: {type: Boolean},
  helpful: {type: Number},
  photos: [],
})

const answer_photosSchema = new mongoose.Schema({
  id: {type: Number},
  url: {type: String},
})
