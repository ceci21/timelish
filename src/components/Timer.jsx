import React from 'react';
import ReactDOM from 'react-dom';
import howler from 'howler';

var timeString = function(ms) {
  var ts = "";
  var milli = (ms % 1000);
  var s = Math.floor((ms / 1000) % 60);
  var mins = Math.floor((ms / (1000 * 60)) % 60);
  var hrs = Math.floor((ms / (1000 * 60 * 60)) % 24);
  var days = Math.floor((ms / (1000 * 60 * 60 * 24)));

  var dayString = (days === 1) ? " day, " : " days, ";
  var hrString = (days === 1) ? " hour, " : " hours, ";
  var minString = (days === 1) ? " minute, " : " minutes, ";
  var secString = " seconds";

  var milString = <span className="milliseconds">{"." + milli}</span>;

  if (ms < 0) {
    ts = "not valid";
  } else if (ms >= 0 && ms < 1000 * 60) {
    ts = <span>{s}<span className="milliseconds">{"." + milli}</span>{secString}</span>;
  } else if (ms >= 1000 * 60 && ms < 1000 * 60 * 60) {
    ts = <span>{mins + minString + s}<span className="milliseconds">{"." + milli}</span>{secString}</span>;
  } else if (ms >= 1000 * 60 * 60 && ms < 1000 * 60 * 60 * 24) {
    ts = <span>{hrs + hrString + mins + minString + s}<span className="milliseconds">{"." + milli}</span>{secString}</span>;
  } else if (ms >= 1000 * 60 * 60 * 24) {
    ts = <span>{days + dayString + hrs + hrString + mins + minString + s}<span className="milliseconds">{"." + milli}</span>{secString}</span>;
  } else {
    ts = 'complete.'
  }

  return ts;
}

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTil: this.props.timeOut * 1000,
      timerDone: false
    };
    this.start = true;
    this.endTime = (this.props.timeOut * 1000) + (new Date().getTime());
  }

  startTimer() {
    this.endTime = (this.props.timeOut * 1000) + (new Date().getTime());
    if (this.state.timerDone === false && this.props.started === true) {
      this.timerID = setInterval(
        () => this.tick(),
        10
      );
    }
  }

  componentDidMount() {
    window.howl = howler;
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    var timeDifference = this.endTime - (new Date().getTime());
    if (timeDifference > 0) {
      this.setState({
        timeTil: this.endTime - (new Date().getTime())
      });
    } else {
      clearInterval(this.timerID);
      this.setState({
        timerDone: true,
        timeTil: 0
      });
      this.props.setAppState({intervalIndex: this.props.appState.intervalIndex + 1});
      this.props.updateIntervals();
      var sound = new howler.Howl({
          src: ['189237193.mp3']
      });
      sound.play();
    }
  }


  render() {
    if (!this.props.started) {
      return (
        <div className="timer">
          <div className="timer-title">Timer {this.props.id}</div>
          <div className="timer-content">{timeString(this.state.timeTil)}</div>
        </div>
      );
    } else if (this.props.started && !this.state.timerDone) {
      if (this.start) {
        this.startTimer();
        this.start = false;
      }
      var timeTil = Math.ceil(this.state.timeTil / 1000);
      return (
        <div className="timer">
          <div className="timer-title">Timer {this.props.id}</div>
          <div className="timer-content">{timeString(this.state.timeTil)}</div>
        </div>
      );
    } else {
      return (
        <div className="finished">
        <div className="timer-title">Timer {this.props.id} complete.</div>
        </div>
      )
    }
  }
}
