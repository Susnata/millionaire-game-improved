import React from "react";

import pauseImage from "../assets/images/pause-button.png";
import playImage from "../assets/images/play-button.png";
import stopImage from "../assets/images/stop-button.png";

import "./timer.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: this.props.timeCount || 10,
      isTimerOn: this.props.isControlled ? false : true
    };
    this.init();
    this.handleClick = this.handleClick.bind(this);
    this.handleTimerStart = this.handleTimerStart.bind(this);
    this.handleTimerPause = this.handleTimerPause.bind(this);
    this.handleTimerStop = this.handleTimerStop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    const timerStatus = nextProps.controlledStatus;
    if (timerStatus !== this.props.controlledStatus) {
      this.setState({ currentTime: nextProps.timeCount || 10 }, () => {
        switch (timerStatus) {
          case "START":
            this.handleTimerStart();
            break;
          case "PAUSE":
            this.handleTimerPause();
            break;
          case "STOP":
            this.handleTimerStop();
            break;
          default:
            return;
        }
      });
    }
  }

  isControlled() {
    return this.props.isControlled;
  }

  showControlledStatus() {
    return this.props.controlledStatus;
  }

  init() {
    // debugger;
    if (!this.isControlled()) {
      this.handleTimerStart();
    } else {
      const controlledTimerStatus = this.showControlledStatus();
      if (controlledTimerStatus) {
        switch (controlledTimerStatus) {
          case "START":
            this.handleTimerStart();
            break;
          case "PAUSE":
            this.handleTimerPause();
            break;
          case "STOP":
            this.handleTimerStop();
            break;
          default:
            return;
        }
      }
    }
  }

  tick() {
    //debugger;
    this.setState(
      state => ({
        currentTime: state.currentTime > 0 ? state.currentTime - 1 : 0
      }),
      () => {
        if (this.state.currentTime === 0) {
          this.handleTimerStop();
        }
      }
    );
  }

  handleTimerStart() {
    // debugger;
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

  handleClick() {
    //debugger;
    if (this.state.currentTime > 0) {
      if (this.state.isTimerOn) {
        this.handleTimerPause();
      } else {
        this.handleTimerStart();
      }
    } else {
      this.handleTimerStop();
    }
    this.setState(prevState => ({
      isTimerOn: !prevState.isTimerOn
    }));
  }

  render() {
    //debugger;
    let countdownTime = this.state.currentTime;
    const isTimerTicking = this.state.isTimerOn && countdownTime > 0;
    return (
      <div className="timer-container">
        <div className="timer-display">{countdownTime}</div>
        <button className="timer-control" onClick={this.handleClick}>
          {isTimerTicking ? (
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
