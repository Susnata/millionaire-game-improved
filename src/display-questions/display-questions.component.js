import React from "react";

import "./display-questions.css";

class DisplayQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: -1
    };
    this.handleAnswerSelection = this.handleAnswerSelection.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.displayAnswer){
    //   correctOption
    // }
    if (nextProps.question !== this.props.question) {
      this.setState({
        selectedOption: -1
      });
    }
  }

  handleAnswerSelection(index, e) {
    //debugger;
    this.setState({ selectedOption: index });
    this.props.onAnswerSelection();
  }

  getClassNameForOption(index) {
    //debugger;
    const selectedOption = this.state.selectedOption;
    const correctOption = this.props.correctOption;
    let classNameList = "disabledOption";
    if (selectedOption >= 0) {
      if (index === selectedOption) {
        return `${classNameList} ${
          selectedOption === correctOption ? "matchedAnswer" : "selectedAnswer"
        }`;
      } else if (index === correctOption) {
        return `${classNameList} correctAnswer`;
      }
      return classNameList;
    }
    return "";
  }

  render() {
    const optionListIndex = ["A", "B", "C", "D"];
    //debugger;
    const options = this.props.answerOptions.map((option, index) => {
      let selectOption = this.handleAnswerSelection.bind(this, index);
      return (
        <li
          key={index}
          className={this.getClassNameForOption(index)}
          onClick={selectOption}
        >
          {optionListIndex[index]}. &nbsp; &nbsp; {option}
        </li>
      );
    });

    return (
      <div className="display-questions-container">
        <p className="display-question">{this.props.question}</p>
        <ul>{options}</ul>
      </div>
    );
  }
}
export default DisplayQuestion;
