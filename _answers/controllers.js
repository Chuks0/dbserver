const {
  getAllUsersNameEmail,
  getAllQuestions,
  getQuestionsGuessedCount,
  getAllAnswers,
  getUsersWhoAnsweredTheMostQuestions,
  getTopUsersByCorrectPercentage,
  getRandomQuestion,
  getRandomUnansweredQuestion,
  getTopQuestionsWithMostCorrectAnswers,
  getTopQuestionsByCorrectPercentage,
  getHintUsageCountForQuestion,
  getHintUsageCountForUser,
  getUserAccuracy,
  addUser,
  addQuestion,
  addAnswer,
  addHint,
  removeUser,
  removeQuestion,
  getUsersByEmail,
  addAnswerNoUID,
} = require("../util/sql");

async function addAnswerWithUser(req, res) {
  try {
    const val = await addAnswer(req.body.Q_id, req.body.Id, req.body.Answer);
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function addAnswerNoUser(req, res) {
  try {
    const val = await addAnswerNoUID(req.body.Q_id, req.body.Answer);
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}

async function userAccuracy(req, res, next) {
  try {
    const val = await getUserAccuracy(req.params.id);
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}

module.exports = { addAnswerNoUser, addAnswerWithUser, userAccuracy };
