require("colors");
const { v4: uudiv4 } = require("uuid");
const Answer = require("./answer");

class Question {
  _listAnswers = {};
  id = "";
  text = "";
  round = 1;

  get listAns() {
    const list = [];
    Object.keys(this._listAnswers).forEach((key) => {
      const answer = this._listAnswers[key];
      list.push(answer);
    });

    return list;
  }

  constructor(text, round) {
    this._listAnswers = {};
    this.id = uudiv4();
    this.text = text;
    this.round = round;
  }

  rightAnswer(id = "") {
    if (this._listAnswers[id]) {
      this._listAnswers[id].isCorrect = true;
    }
  }
}

module.exports = Question;
