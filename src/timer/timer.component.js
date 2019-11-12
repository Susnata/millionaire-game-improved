import React from "react";
import pauseImage from "./images/pause-button.png";
import playImage from "./images/play-button.png";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.timeCount || 10,
      isTimerOn: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.timerCountDown = this.timerCountDown.bind(this);
  }

  isControlled() {
    return this.props.isControlled;
  }

  tick() {
    //debugger;
    this.setState(state => ({
      currentTime: state.currentTime - 1
    }));
  }

  timerCountDown() {
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  componentDidMount() {
    debugger;
    if (this.isControlled()) {
      this.setState(
        {
          isTimerOn: true
        },
        () => this.timerCountDown()
      );
    }
  }

  handleClick() {
    debugger;
    this.setState(
      prevState => ({
        isTimerOn: !prevState.isTimerOn
      }),
      () => {
        !this.state.isTimerOn
          ? clearInterval(this.intervalId)
          : this.timerCountDown();
      }
    );

    console.log(this.state.isTimerOn);

    // !this.state.isTimerOn
    //   ? clearInterval(this.intervalId)
    //   : this.timerCountDown();
  }

  render() {
    //debugger;
    let countdownTime = this.state.currentTime;
    if (countdownTime <= 0) {
      clearInterval(this.intervalId);
    }
    return (
      <div className="timer-container">
        <div className="timer-display">{countdownTime}</div>
        <button className="timer-control" onClick={this.handleClick}>
          {this.state.isTimerOn && countdownTime > 0 ? (
            <span>
              <img alt="Pause" src={pauseImage} />
            </span>
          ) : (
            <span>
              <img alt="Play" src={playImage} />
            </span>
          )}
        </button>
      </div>
    );
  }
}

export default Timer;
