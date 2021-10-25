const {
  mainMenu,
  pause,
  readInput,
  editMenu,
  roundMenu,
  selectAnswer,
  listAllQuestions,
} = require("./services/inquirer");
const User = require("./models/user");
const { saveDB, readDB } = require("./services/fileSystem");
const Round = require("./models/round");

console.clear();

const main = async () => {
  let optionMain = "";
  let listRound = [];
  let listUser = [];
  let _users = {};
  let roundDB = readDB("./db/data.json");
  let userDB = readDB("./db/user.json");
  let found = false;
  if (roundDB) {
    listRound = roundDB;
  }
  if (userDB) {
    listUser = userDB;
  }

  do {
    optionMain = await mainMenu();

    switch (optionMain) {
      case "1":
        const name = await readInput("Please enter your name:");
        let currentUser = {};
        listUser.forEach((user) => {
          if (user[name]) {
            found = true;
            console.log("Welcome Back");
            currentUser = user[name];
          }
        });
        if (!found) {
          const user = new User(name);
          _users[name] = user;

          currentUser = _users;
          console.log(currentUser);
          listUser.push(_users);

          console.log("User created. Please enter again to start the game");
        }
        found = false;

        if (currentUser.solved > 4) {
          console.log("You alredy completed the challenge");
          return;
        }

        for (let i = currentUser.solved; i < 5; i++) {
          const questions = Object.keys(listRound[i]._listQuestions);
          const question =
            questions[Math.floor(Math.random() * questions.length)];
          const list = [];
          Object.keys(
            listRound[i]._listQuestions[question]._listAnswers
          ).forEach((key) => {
            const answer =
              listRound[i]._listQuestions[question]._listAnswers[key];
            list.push(answer);
          });
          console.log(listRound[i]._listQuestions[question].text);
          const id = await selectAnswer(list);
          if (id == 0) {
            console.log("Game canceled");
            return;
          }
          for (let i = 0; i < list.length; i++) {
            if (list[i].id === id) {
              if (list[i].isCorrect) {
                console.log("Congratulations, you earn 100 points");

                listUser.forEach((user) => {
                  if (typeof user[name] !== "undefined") {
                    user[name].score += 100;
                    user[name].solved += 1;
                    if (user[name].solved === 5) {
                      console.log(`Excellent ${name}, you win the challenge`);
                    }
                  }
                });
              } else {
                console.log("Sorry, wrong answer. Try again later");
                return;
              }
            }
          }
        }
        _users = {};
        saveDB(listUser, "./db/user.json");
        break;
      case "2":
        const optionEdit = await editMenu();

        switch (optionEdit) {
          case "1":
            const optionRound = await roundMenu();
            switch (optionRound) {
              case "1":
                const round1 = new Round(1);
                for (let i = 0; i < 5; i++) {
                  let question = await readInput("Please enter a question:");
                  let currentQuestion = round1.addQuestion(question);

                  for (let j = 0; j < 4; j++) {
                    let answer = await readInput("Please enter a answer:");
                    round1.newAnswer(answer, currentQuestion.id);
                  }

                  const id = await selectAnswer(currentQuestion.listAns);
                  currentQuestion.rightAnswer(id);

                  listRound[0] = round1;
                }

                break;
              case "2":
                const round2 = new Round(2);
                for (let i = 0; i < 5; i++) {
                  let question = await readInput("Please enter a question:");
                  let currentQuestion = round2.addQuestion(question);

                  for (let j = 0; j < 4; j++) {
                    let answer = await readInput("Please enter a answer:");
                    round2.newAnswer(answer, currentQuestion.id);
                  }

                  const id = await selectAnswer(currentQuestion.listAns);
                  currentQuestion.rightAnswer(id);
                }

                listRound[2] = round2;

                break;
              case "3":
                const round3 = new Round(3);
                for (let i = 0; i < 5; i++) {
                  let question = await readInput("Please enter a question:");
                  let currentQuestion = round3.addQuestion(question);

                  for (let j = 0; j < 4; j++) {
                    let answer = await readInput("Please enter a answer:");
                    round3.newAnswer(answer, currentQuestion.id);
                  }

                  const id = await selectAnswer(currentQuestion.listAns);
                  currentQuestion.rightAnswer(id);
                }

                listRound[3] = round3;

                break;
              case "4":
                const round4 = new Round(4);
                for (let i = 0; i < 5; i++) {
                  let question = await readInput("Please enter a question:");
                  let currentQuestion = round4.addQuestion(question);

                  for (let j = 0; j < 4; j++) {
                    let answer = await readInput("Please enter a answer:");
                    round4.newAnswer(answer, currentQuestion.id);
                  }

                  const id = await selectAnswer(currentQuestion.listAns);
                  currentQuestion.rightAnswer(id);
                }

                listRound[4] = round4;

                break;
              case "5":
                const round5 = new Round(5);
                for (let i = 0; i < 5; i++) {
                  let question = await readInput("Please enter a question:");
                  let currentQuestion = round5.addQuestion(question);

                  for (let j = 0; j < 4; j++) {
                    let answer = await readInput("Please enter a answer:");
                    round5.newAnswer(answer, currentQuestion.id);
                  }

                  const id = await selectAnswer(currentQuestion.listAns);
                  currentQuestion.rightAnswer(id);
                }

                listRound[5] = round5;
                break;
              default:
                break;
            }
            saveDB(listRound, "./db/data.json");

            break;
          case "2":
            listAllQuestions(listRound);
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    if (optionMain !== "0") {
      await pause();
    }
  } while (optionMain !== "0");
};

main();
