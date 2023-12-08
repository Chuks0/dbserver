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

async function updateUser(req, res) {
  try {
    let user = await getUsersByEmail(req.body.email);
    if (user[0].length == 0)
      user = await addUser(req.body.name, req.body.email);
    if (user == 200) user = await getUsersByEmail(req.body.email);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}

async function getMC(req, res) {
  try {
    const val = await getUsersWhoAnsweredTheMostQuestions();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}
async function getHP(req, res) {
  try {
    const val = await getTopUsersByCorrectPercentage();
    res.json(val);
  } catch (error) {
    console.log(error);
    res.json({ error: 500 });
  }
}

module.exports = { updateUser, getMC, getHP };
