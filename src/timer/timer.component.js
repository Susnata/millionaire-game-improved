import React from "react";
import pauseImage from "./images/pause-button.png";
import playImage from "./images/play-button.png";
import stopImage from "./images/stop-button.png";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.timeCount || 10,
      isTimerOn: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerPause = this.handleTimerPause.bind(this);
    this.handleTimerStop = this.handleTimerStop.bind(this);
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

  handleTimerStart() {
    this.props.onStart();
    this.intervalId = setInterval(() => this.tick(), 1000);
  }

  handleTimerPause() {
    this.props.onPause();
    clearInterval(this.intervalId);
  }

  handleTimerStop() {
    this.props.onStop();
    clearInterval(this.intervalId);
    this.setState({
      isTimerOn: false,
      currentTime: 0
    });
  }

  componentDidMount() {
    //debugger;
    if (this.isControlled()) {
      this.setState(
        {
          isTimerOn: true
        },
        () => this.handleTimerStart()
      );
    }
  }

  handleClick() {
    //debugger;
    this.setState(
      prevState => ({
        isTimerOn: !prevState.isTimerOn
      }),
      () => {
        this.state.currentTime > 0
          ? this.state.isTimerOn
            ? this.handleTimerStart()
            : this.handleTimerPause()
          : this.handleTimerStop();
      }
    );
  }

  render() {
    //debugger;
    let countdownTime = this.state.currentTime;
    // if (countdownTime === 0) {
    //   this.handleTimerStop();
    // }
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
        &nbsp;
        <button className="timer-control" onClick={this.handleTimerStop}>
          <span>
            <img alt="STOP" src={stopImage} />
          </span>
        </button>
      </div>
    );
  }
}

export default Timer;
