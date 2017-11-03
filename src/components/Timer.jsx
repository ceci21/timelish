import React from 'react';
import ReactDOM from 'react-dom';
import howler from 'howler';
import timestring from './timestring.jsx';


export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeTil: this.props.timeOut * 1000,
      timerDone: false,
      timerName: "Timer " + this.props.id
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
    var timerName = <input type="text"
        className="timer-input-title"
        placeholder={this.state.timerName}
        onChange={(event) => {
        this.setState({timerName: event.target.value})
    }}/>

    if (!this.props.started) {
      return (
        <div className="timer">
          <div className="timer-title">{timerName}</div>
          <div className="timer-content">{timestring(this.state.timeTil)}</div>
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
          <div className="timer-title">{timerName}</div>
          <div className="timer-content">{timestring(this.state.timeTil)}</div>
        </div>
      );
    } else {
      return (
        <div className="finished">
        <div className="timer-title">{this.state.timerName} complete.</div>
        </div>
      )
    }
  }
}
