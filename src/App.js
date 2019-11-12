import React from "react";
// import DisplayQuestion from "./display-questions/display-questions.component";
import Timer from "./timer/timer.component";
import "./App.css";

class App extends React.Component {
  render() {
    return (
      <div>
        ABCD
        <Timer isControlled={true} timeCount={15} />
      </div>
      //<DisplayQuestion />
    );
  }
}

export default App;
