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
  addHintNoUID,
} = require("../util/sql");

async function addUserHint(req, res) {
  try {
    let val = await addHint(req.body.Q_id, req.body.Id);

    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function addNoUserHint(req, res) {
  try {
    let val = await addHintNoUID(req.body.Q_id, req.body.Id);

    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function getHintQ(req, res) {
  try {
    let val = await getHintUsageCountForQuestion(req.params.id);

    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function getHintU(req, res) {
  try {
    let val = await getHintUsageCountForUser(req.params.id);

    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
module.exports = { addNoUserHint, addUserHint, getHintU, getHintQ };
