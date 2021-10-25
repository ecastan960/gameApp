const { v4: uudiv4 } = require("uuid");

class Answer {
  id = "";
  text = "";
  isCorrect = null;

  constructor(text) {
    this.id = uudiv4();
    this.text = text;
    this.isCorrect = null;
  }
}

module.exports = Answer;
