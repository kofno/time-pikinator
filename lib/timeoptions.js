var React = require('react')
  , datalist = React.DOM.datalist
  , option = React.DOM.option
  , Times = require('./times')
  , _ = require('underscore')
  ;

module.exports = React.createClass({
  startDate: function() {
    if (this.props.startAt)
      return new Date(this.props.startAt);
    else
      return new Date();
  },

  timeOptions: function() {
    var intervals = Times().interval(this.props.interval).startAt(this.startDate()).toArray();
    return _.map(intervals, this.buildOption);
  },

  buildOption: function(moment) {
    return option({ key: moment.format('LT'), value: moment.format('LT') });
  },

  render: function() {
    return datalist({ id: this.props.id }, this.timeOptions());
  }
});
