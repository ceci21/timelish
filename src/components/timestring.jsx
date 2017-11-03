import React from 'react';

var timestring = function(ms) {
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

export default timestring;
