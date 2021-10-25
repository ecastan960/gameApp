const Question = require("./question");
const Answer = require("./answer");

class Round {
  _listQuestions = {};
  category = 0;
  countQuestions = 0;

  get listArr() {
    const list = [];
    Object.keys(this._listQuestions).forEach((key) => {
      const question = this._listQuestions[key];
      list.push(question);
    });

    return list;
  }

  constructor(category) {
    this._listQuestions = {};
    this.category = category;
  }

  addQuestion(text = "") {
    if (this.countQuestions < 5) {
      const question = new Question(text, this.number);
      this._listQuestions[question.id] = question;
      this.countQuestions++;
      return this._listQuestions[question.id];
    }
  }

  newAnswer(text = "", id = "") {
    if (this.countAnswers < 4) {
      this.listArr.forEach((question) => {
        if (question.id === id) {
          let answer = new Answer(text);
          question._listAnswers[answer.id] = answer;
        }
      });
    }
  }
}

module.exports = Round;
