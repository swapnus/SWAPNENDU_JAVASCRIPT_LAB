function question(questionText, choices, answer) {
    this.questionText = questionText;
    this.choices = choices;
    this.answer = answer;
};

quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}

quiz.prototype.getQuestionByIndex = function () {
    /*var question1 = this.questions[this.questionIndex]
    */
    return this.questions[this.questionIndex]
}

quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++
}


function quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
};

question.prototype.isCorrectAnswer = function (answer) {
    return this.answer === answer;
};

//question choices
var questions = [
    new question("Which of the following functions is a valid type of function that javascript supports?", ["named function", "anonymous function", "Both A and B are true", "None of the above"], "Both A and B are true"),
    new question("Which method returns the character at the specified index?", ["characterAt()", "charAt()", "getCharAt()", "None of the above"], "charAt()"),
    new question("Which of the following is not a mouse event?", ["onmousescroller", "onclick", "onmouseover", "onmousemove"], "onmousescroller"),
    new question("The opposite of onmouseover is_____?", ["onmouseoff", "onmouseout", "onmouseunder", "onnotmouseover"], "onmouseout"),
    new question("Which method returns the string starting at the specified position?", ["substr()", "getSubstring()", "slice()", "None of the above"], "substr()")
]

var jsQuiz = new quiz(questions);

function loadQuestions() {
    if (jsQuiz.isEnded()) {
        showScores();
    }
    else {
        //displaying Questions
        var element = document.getElementById('question')
        element.innerHTML = jsQuiz.getQuestionByIndex().questionText;

        var choices = jsQuiz.getQuestionByIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            document.getElementById('choice' + i).innerHTML = choices[i];
            handleOptionButton('btn' + i, choices[i])
        }
    }
    showProgress()
}


function showProgress() {
    var currentQuestionNumber = jsQuiz.questionIndex + 1;
    var element = document.getElementById('progress');
    element.innerHTML = "Question " + currentQuestionNumber + " of " + jsQuiz.questions.length;
};

//function for adding and calculating total scores
function showScores() {

    var quizOver = "<h1> Quiz Results </h1>";
    quizOver += "<h2 id='score'> Your score is " + jsQuiz.score + " ans your percentage is - " + ((jsQuiz.score / questions.length) * 100) + " % <h2>";
    var element = document.getElementById('quiz')
    element.innerHTML = quizOver;
};

function handleOptionButton(id, choice) {
    document.getElementById(id).onclick = function () {
        jsQuiz.checkOptionWithAnswer(choice);
        loadQuestions();
    };

};
loadQuestions();
