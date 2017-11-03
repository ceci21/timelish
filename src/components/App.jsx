import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer.jsx';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalData: [],
      addInterval: false,
      intervalIndex: 0,
      userInput: 0
    };
    this.elapsedTime = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  setAppState(stateToChange) {
    this.setState(stateToChange);
  }

  updateIntervals() {
    if (this.state.intervalData.length - 1 >= this.state.intervalIndex) {
      var arr = this.state.intervalData.slice();
      arr[this.state.intervalIndex]['started'] = true;
      this.setAppState({intervalData: arr});
    }
  }

  getSeconds() {
    var seconds = Number(this.elapsedTime.seconds) + Number(this.elapsedTime.minutes) * 60 + Number(this.elapsedTime.hours) * 60 * 60 + Number(this.elapsedTime.days) * 60 * 60 * 24;
    return seconds;
  }

  createInterval () {
    var arr = this.state.intervalData.slice();
    arr.push({started: false, timeOut: Number(this.getSeconds())});
    this.setState({intervalData: arr});
  }

  clearIntervals() {
    var arr = [];
    this.setState({intervalData: arr, intervalIndex: 0});
  }

  getInputField() {
    var days = (<input
      type="number"
      id="day-input"
      className="inputs"
      step="1"
      min="0"
      max="365"
      placeholder="days"
      onChange={(event) => {
        this.elapsedTime['days'] = event.target.value;
      }}
      ></input>);

    var hours = (<input
      type="number"
      id="hour-input"
      className="inputs"
      step="1"
      min="0"
      max="24"
      placeholder="hr"
      onChange={(event) => {
        this.elapsedTime['hours'] = event.target.value;
      }}
      ></input>);

    var minutes = (<input
      type="number"
      id="minute-input"
      className="inputs"
      step="1"
      min="0"
      max="60"
      placeholder="min"
      onChange={(event) => {
        this.elapsedTime['minutes'] = event.target.value;
      }}
      ></input>)

    var seconds = (<input
      type="number"
      id="seconds-input"
      className="inputs"
      step="1"
      min="0"
      max="60"
      placeholder="sec"
      onChange={(event) => {
        this.elapsedTime['seconds'] = event.target.value;
      }}
      ></input>)

    var time = [days, hours, minutes, seconds];

    return time;
  }

  getStartButton() {
    return <button className="start" onClick={this.updateIntervals.bind(this)}>Start!</button>
  }

  getClearButton() {
    return <button className="clear" onClick={this.clearIntervals.bind(this)}>Clear!</button>
  }

  getCreateButton() {
    return <button className="create" onClick={(event) => {
      if (!isNaN(Number(this.getSeconds())) && Number(this.getSeconds()) > 0) {
        this.createInterval();
        document.getElementById("day-input").value = "";
        document.getElementById("hour-input").value = "";
        document.getElementById("minute-input").value = "";
        document.getElementById("seconds-input").value = "";
        for (var key in this.elapsedTime) {
          this.elapsedTime[key] = 0;
        }
      } else {
        console.log("That is not a number!");
      }
    }}>+</button>
  }

  getIntervals() {
    var appStateChange = this.setAppState.bind(this);
    var state = this.state;
    var updateIntervals = this.updateIntervals.bind(this);
    return this.state.intervalData.map((data, index) =>
      <Timer
        setAppState={appStateChange}
        appState={state}
        updateIntervals={updateIntervals}
        started={data['started']}
        id={index}
        timeOut={data['timeOut']}
      />
    );
  }

  render() {

    return (
      <div className="main">
        <div className="whitespace"></div>
        <div className="container">
          <div className="title">Timelish!<span className="subtitle"> A pretty interval timer.</span></div>
          <div className="input-container">{this.getInputField()}{this.getCreateButton()}</div>
          <div>{this.getStartButton()}{this.getClearButton()}</div>
          <div className="interval-container">{this.getIntervals()}</div>
        </div>
        <div className="whitespace"></div>
    </div>
    );
  }
}
