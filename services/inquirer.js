const inquirer = require("inquirer");
require("colors");

const mainOptions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: "Play the game",
      },
      {
        value: "2",
        name: "Edit the game",
      },
      {
        value: "0",
        name: "Exit",
      },
    ],
  },
];

const editOptions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: "1",
        name: "Create a round of question",
      },
      {
        value: "2",
        name: "List questions",
      },
      {
        value: "0",
        name: "Return",
      },
    ],
  },
];
const roundOptions = [
  {
    type: "list",
    name: "option",
    message: "Select a round",
    choices: [
      {
        value: "1",
        name: "Round #1",
      },
      {
        value: "2",
        name: "Round #2",
      },
      {
        value: "3",
        name: "Round #3",
      },
      {
        value: "4",
        name: "Round #4",
      },
      {
        value: "5",
        name: "Round #5",
      },
      {
        value: "0",
        name: "Return",
      },
    ],
  },
];

const mainMenu = async () => {
  console.clear();
  console.log("================================".green);
  console.log("  Welcome to the Game challenge".green);
  console.log("================================\n".green);

  const { option } = await inquirer.prompt(mainOptions);

  return option;
};

const pause = async () => {
  const question = [
    {
      type: "text",
      name: "Enter",
      message: "Please press Enter to continue",
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};

const editMenu = async (message) => {
  console.clear();
  console.log("================================".green);
  console.log("  Welcome to the Game challenge".green);
  console.log("================================\n".green);

  const { option } = await inquirer.prompt(editOptions);

  return option;
};

const roundMenu = async () => {
  console.clear();
  console.log("================================".green);
  console.log("  Welcome to the Game challenge".green);
  console.log("================================\n".green);
  const { option } = await inquirer.prompt(roundOptions);

  return option;
};

const selectAnswer = async (answers = []) => {
  const choices = answers.map((answer) => {
    return {
      value: answer.id,
      name: `${answer.text}`,
    };
  });
  choices.push({
    value: "0",
    name: "Cancel".red,
  });
  const questions = [
    {
      type: "list",
      name: "id",
      message: "Please select the correct answer",
      choices,
    },
  ];
  const { id } = await inquirer.prompt(questions);
  return id;
};

const listAllQuestions = async (listRounds) => {
  listRounds.forEach((round) => {
    // console.log(round);
    let k = "";
    for (const [key, value] of Object.entries(round._listQuestions)) {
      console.log();
      console.log(`Question Round ${round.category}`);
      console.log(round._listQuestions[key].text);
      k = key;
      console.log();
      console.log("Answers");
      for (const [key1, value1] of Object.entries(
        round._listQuestions[k]._listAnswers
      )) {
        const correct = round._listQuestions[k]._listAnswers[key1].isCorrect;
        const value = round._listQuestions[k]._listAnswers[key1].text;
        const state = correct ? `${value}`.green : `${value}`.red;
        console.log(`   ${state}`);
      }
      console.log();
    }
  });
};

module.exports = {
  mainMenu,
  pause,
  readInput,
  editMenu,
  roundMenu,
  selectAnswer,
  listAllQuestions,
};
