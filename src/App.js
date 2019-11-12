import React from "react";
// import DisplayQuestion from "./display-questions/display-questions.component";
import Timer from "./timer/timer.component";
import "./App.css";

class App extends React.Component {
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
    return (
      <div>
        <Timer
          isControlled={true}
          timeCount={15}
          onStart={this.onStart}
          onPause={this.onPause}
          onStop={this.onStop}
          controlledStatus={"PAUSE"}
        />
      </div>
      //<DisplayQuestion />
    );
  }
}

export default App;
