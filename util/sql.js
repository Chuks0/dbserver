const { Connection } = require("../sql/database");
const uuid = require("uuid").v4;

async function getAllUsersNameEmail() {
  try {
    const [rows, fields] = await Connection().execute(
      "SELECT Name, Email FROM User"
    );
    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getAllQuestions() {
  try {
    const [rows, fields] = await Connection().execute(
      "SELECT * FROM Questions"
    );
    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}
async function getAllAnswers() {
  try {
    const [rows, fields] = await Connection().execute("SELECT * FROM Answers");
    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getQuestionsGuessedCount() {
  try {
    const [rows, fields] = await Connection().execute(
      "SELECT Q_id, COUNT(*) as Num_Guesses FROM Guessed GROUP BY Q_id"
    );
    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

//get top 5 users who answered the most questions correctly in order
async function getUsersWhoAnsweredTheMostQuestions() {
  try {
    const [rows, fields] = await Connection().execute(
      `SELECT U.Id, U.name, U.email, COUNT(A.Q_id) AS correct_answers_count 
      FROM User U 
      JOIN Answers A ON U.Id = A.Id 
      JOIN Questions Q ON A.Q_id = Q.Q_id AND A.answer = Q.answer 
      GROUP BY U.Id, U.name, U.email 
      ORDER BY correct_answers_count DESC 
      LIMIT 5;`
    );
    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

//get top 5 useres with highest answers correct %
async function getTopUsersByCorrectPercentage() {
  try {
    const [rows, fields] = await Connection().execute(
      `SELECT
          U.Id,
          U.name,
          U.email,
          COUNT(A.Q_id) AS total_questions_answered,
          SUM(CASE WHEN A.answer = Q.answer THEN 1 ELSE 0 END) AS correct_answers_count,
          SUM(CASE WHEN A.answer = Q.answer THEN 1 ELSE 0 END) / COUNT(A.Q_id) * 100 AS correct_percentage
      FROM
          User U
      JOIN
          Answers A ON U.Id = A.Id
      JOIN
          Questions Q ON A.Q_id = Q.Q_id
      GROUP BY
          U.Id, U.name, U.email
      ORDER BY
          correct_percentage DESC, total_questions_answered DESC
      LIMIT
          5;`
    );
    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

// get all from randome question
async function getRandomQuestion(questionId) {
  try {
    const [rows, fields] = await Connection().execute(
      `
      SELECT
          *
      FROM
          Questions
      ORDER BY
          RAND()
      LIMIT 1;
    `
    );

    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

// random question that the user has not answered yet
async function getRandomUnansweredQuestion(userId) {
  try {
    const [rows, fields] = await Connection().execute(
      `
      SELECT 
          Q.* 
      FROM
          Questions Q
      LEFT JOIN
          Answers A ON Q.Q_id = A.Q_id AND A.Id = ?
      WHERE
          A.A_id IS NULL
      ORDER BY
          RAND()
      LIMIT 1;
    `,
      [userId]
    );

    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

// questions witrh most correct answers
async function getTopQuestionsWithMostCorrectAnswers() {
  try {
    const [rows, fields] = await Connection().execute(`
      SELECT
        Q.Q_id,
        Q.prompt,
        Q.A,
        Q.B,
        Q.C,
        Q.D,
        Q.E,
        Q.answer,
        COUNT(A.Q_id) AS correct_answers_count
      FROM
        Questions Q
      LEFT JOIN
        Answers A ON Q.Q_id = A.Q_id AND Q.answer = A.answer
      GROUP BY
        Q.Q_id, Q.prompt, Q.A, Q.B, Q.C, Q.D, Q.E, Q.answer
      ORDER BY
        correct_answers_count DESC
      LIMIT 5;
    `);

    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

//get easyest questions
async function getTopQuestionsByCorrectPercentage() {
  try {
    const [rows, fields] = await Connection().execute(`
      SELECT
        Q.Q_id,
        Q.prompt,
        Q.A,
        Q.B,
        Q.C,
        Q.D,
        Q.E,
        Q.answer,
        COUNT(DISTINCT A.Id) AS total_users,
        COUNT(A.Q_id) AS correct_answers_count,
        (COUNT(A.Q_id) / COUNT(DISTINCT A.Id)) * 100 AS correct_percentage
      FROM
        Questions Q
      LEFT JOIN
        Answers A ON Q.Q_id = A.Q_id AND Q.answer = A.answer
      GROUP BY
        Q.Q_id, Q.prompt, Q.A, Q.B, Q.C, Q.D, Q.E, Q.answer
      ORDER BY
        correct_percentage DESC, total_users DESC
      LIMIT 5;
    `);

    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

// get amout of hints on a question
async function getHintUsageCountForQuestion(questionId) {
  try {
    const [rows, fields] = await Connection().execute(
      `
      SELECT
        Q.Q_id,
        Q.prompt,
        COUNT(H.Id) AS hint_usage_count
      FROM
        Questions Q
      LEFT JOIN
        Hint H ON Q.Q_id = H.Q_id
      WHERE
        Q.Q_id = ? -- Replace ? with the actual question ID
      GROUP BY
        Q.Q_id, Q.prompt;
    `,
      [questionId]
    );

    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

//user hint count
async function getHintUsageCountForUser(userId) {
  try {
    const [rows, fields] = await Connection().execute(
      `
      SELECT
        U.Id,
        U.name,
        U.email,
        COUNT(H.Id) AS hint_usage_count
      FROM
        User U
      LEFT JOIN
        Hint H ON U.Id = H.Id
      WHERE
        U.Id = ?
      GROUP BY
        U.Id, U.name, U.email;
    `,
      [userId]
    );

    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

// user accuracy check
async function getUserAccuracy(userId) {
  try {
    const [rows, fields] = await Connection().execute(
      `
      SELECT
        U.Id,
        U.name,
        U.email,
        COUNT(A.Q_id) AS total_answers,
        SUM(CASE WHEN A.answer = Q.answer THEN 1 ELSE 0 END) AS correct_answers,
        (SUM(CASE WHEN A.answer = Q.answer THEN 1 ELSE 0 END) / COUNT(A.Q_id)) * 100 AS accuracy_percentage
      FROM
        User U
      LEFT JOIN
        Answers A ON U.Id = A.Id
      LEFT JOIN
        Questions Q ON A.Q_id = Q.Q_id
      WHERE
        U.Id = ?
      GROUP BY
        U.Id, U.name, U.email;
    `,
      [userId]
    );

    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
  }
}

// add user
async function addUser(name, email) {
  try {
    const lastId = await getLastUserId();
    const [rows, fields] = await Connection().execute(
      "INSERT INTO User (Id ,name, email) VALUES (? ,?, ?);",
      [lastId + 1, name, email]
    );

    return 200;
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

//add new question
async function addQuestion(
  prompt,
  optionA,
  optionB,
  optionC,
  optionD,
  optionE,
  answer
) {
  try {
    const [rows, fields] = await Connection().execute(
      "INSERT INTO Questions (prompt, A, B, C, D, E, answer) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [prompt, optionA, optionB, optionC, optionD, optionE, answer]
    );

    return 200;
  } catch (error) {
    console.error("Error adding question:", error);
  }
}

//add new answer
async function addAnswer(questionId, userId, answer) {
  try {
    const lastId = await getLastAnswerId();
    const [rows, fields] = await Connection().execute(
      "INSERT INTO Answers (A_id ,Q_id, Id, answer) VALUES (?, ?, ?, ?);",
      [lastId + 1, questionId, userId, answer]
    );

    return 200;
  } catch (error) {
    console.error("Error adding answer:", error);
  }
}
async function addAnswerNoUID(questionId, answer) {
  try {
    const lastId = await getLastAnswerId();
    const [rows, fields] = await Connection().execute(
      "INSERT INTO Answers (A_id ,Q_id, answer) VALUES (?, ?, ?);",
      [lastId + 1, questionId, answer]
    );

    return 200;
  } catch (error) {
    console.error("Error adding answer:", error);
  }
}

//add new hint
async function addHint(questionId, userId) {
  try {
    const lastId = await getLastHintId();
    const [rows, fields] = await Connection().execute(
      "INSERT INTO Hint (H_id ,Q_id, Id) VALUES (?, ?, ?);",
      [lastId + 1, questionId, userId]
    );

    return 200;
  } catch (error) {
    console.error("Error adding hint:", error);
  }
}
async function addHintNoUID(questionId) {
  try {
    const lastId = await getLastHintId();
    const [rows, fields] = await Connection().execute(
      "INSERT INTO Hint (H_id ,Q_id) VALUES (?, ?);",
      [lastId + 1, questionId]
    );

    return 200;
  } catch (error) {
    console.error("Error adding hint:", error);
  }
}

//delete user
async function removeUser(userId) {
  try {
    const [rows, fields] = await Connection().execute(
      "DELETE FROM User WHERE Id = ?;",
      [userId]
    );

    return 200;
  } catch (error) {
    console.error("Error removing user:", error);
  }
}

//delete question
async function removeQuestion(questionId) {
  try {
    const [rows, fields] = await Connection().execute(
      "DELETE FROM Questions WHERE Q_id = ?;",
      [questionId]
    );

    return 200;
  } catch (error) {
    console.error("Error removing question:", error);
  }
}

// find user based on email
async function getUsersByEmail(email) {
  try {
    const [rows, fields] = await Connection().execute(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );
    return [rows, fields];
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

//DO NOT ADD
async function getLastUserId() {
  try {
    const [rows, fields] = await Connection().execute(
      "SELECT Id FROM User ORDER BY Id DESC LIMIT 1;"
    );
    if (rows.length > 0) {
      return rows[0].Id;
    } else {
      return null; // No users in the table
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getLastAnswerId() {
  try {
    const [rows, fields] = await Connection().execute(
      "SELECT A_id FROM Answers ORDER BY A_id DESC LIMIT 1;"
    );
    if (rows.length > 0) {
      return rows[0].A_id;
    } else {
      return null; // No Answers in the table
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getLastHintId() {
  try {
    const [rows, fields] = await Connection().execute(
      "SELECT H_id FROM Hint ORDER BY H_id DESC LIMIT 1;"
    );
    if (rows.length > 0) {
      return rows[0].A_id;
    } else {
      return null; // No Hint in the table
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
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
  addHintNoUID,
};
