import React from "react";

import DisplayQuestion from "./display-questions/display-questions.component";
import Timer from "./timer/timer.component";

import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQNo: 0,
      controlledStatus: "PAUSE",
      timeCount: 15,
      isNextQuesBtnEnabled: false,
      isTimeOver: false
    };
  }

  stopTimer = () => {
    this.setState({
      controlledStatus: "STOP",
      isNextQuesBtnEnabled: true,
      isTimeOver: true
    });
  };

  selectNextQuestion = () => {
    // debugger;
    this.setState(prevState => ({
      currentQNo: prevState.currentQNo + 1,
      controlledStatus: "PAUSE",
      timeCount: 15
    }));
  };

  onStart() {
    console.log("Congratulations! The timer has started!");
  }

  onPause() {
    console.log("Don't worry, time has been paused for you!");
  }

  onStop() {
    console.log("You missed the train, boss!");
  }

  render() {
    //debugger;
    let currentQIndex = this.state.currentQNo;
    let question = QUESTIONBANK[currentQIndex].question,
      answerOptions = QUESTIONBANK[currentQIndex].options,
      correctOption = QUESTIONBANK[currentQIndex].correct;
    let nextQuesBtnProps = this.state.isNextQuesBtnEnabled
      ? {}
      : { disabled: "disabled" };
    return (
      <div className="app-container">
        <DisplayQuestion
          question={question}
          answerOptions={answerOptions}
          correctOption={correctOption}
          onAnswerSelection={this.stopTimer}
          displayAnswer={this.isTimeOver}
        />

        <Timer
          isControlled={true}
          timeCount={this.state.timeCount}
          onStart={this.onStart}
          onPause={this.onPause}
          onStop={this.onStop}
          controlledStatus={this.state.controlledStatus}
        />
        <button
          className="next-question"
          onClick={this.selectNextQuestion}
          {...nextQuesBtnProps}
        >
          {" "}
          Next >>
        </button>
      </div>
    );
  }
}

const QUESTIONBANK = [
  {
    questionNo: 1,
    question: "What is the planet nearest to Sun?",
    options: ["Mars", "Earth", "Venus", "Mercury"],
    correct: 3
  },
  {
    questionNo: 2,
    question: "What is the planet nearest to Earth?",
    options: ["Mars", "Jupiter", "Venus", "Mercury"],
    correct: 2
  },
  {
    questionNo: 3,
    question: "Which is the largest mammal on Earth?",
    options: ["Blue Whale", "Elephant", "Humpback Whale", "Grizzly Bear"],
    correct: 0
  },
  {
    questionNo: 4,
    question: "Which is the national flower of India?",
    options: ["Rose", "Marigold", "Tulip", "Lotus"],
    correct: 3
  },
  {
    questionNo: 5,
    question: "Which is the smallest bird on planet?",
    options: [
      "Humming bird",
      "Diamond Firetail",
      "Pink Robin",
      "Scarlet Robin"
    ],
    correct: 0
  }
];

export default App;
