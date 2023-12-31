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
} = require("../util/sql");

async function getRQ(req, res) {
  try {
    //const val = await getAllQuestions();
    const val = await getRandomQuestion();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function getRUQ(req, res) {
  try {
    const val = await getRandomUnansweredQuestion(req.params.id);
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function getMC(req, res) {
  try {
    const val = await getTopQuestionsWithMostCorrectAnswers();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function getHP(req, res) {
  try {
    const val = await getTopQuestionsByCorrectPercentage();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}

module.exports = { getRQ, getRUQ, getHP, getMC };
