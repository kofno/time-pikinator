var moment = require('moment');
require('twix');

var _ = require('underscore');

function Times() {
  var _interval = 30 * 60;
  var _startAt = new Date();
}

Times.prototype.interval = function(anIntervalInSeconds) {
  this._interval = anIntervalInSeconds;
  return this;
}

Times.prototype.startAt = function(aDate) {
  this._startAt = aDate;
  return this;
}

Times.prototype.toArray = function() {
  var startMoment = roundToInterval(this._startAt, this._interval);
  var endMoment = moment(startMoment).add(1, 'days');
  var iterator = startMoment.twix(endMoment).iterate(this._interval, 'seconds');
  var results = [];

  while (iterator.hasNext()) {
    results.push(iterator.next());
  };

  return _.uniq(results, function(moment) {
    return moment.format('LT');
  });
}

function roundToInterval(aDate, intervalSecs) {
  var intervalGap = intervalSecs - (aDate.getMinutes() * 60);
  return moment(aDate).add(intervalGap, 'seconds');
}

module.exports = function() {
  return new Times();
}
