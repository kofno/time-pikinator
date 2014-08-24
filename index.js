var React = require('react/addons')
  , _ = require('underscore')
  , input = React.DOM.input
  , TimeOptions = require('./lib/timeoptions')
  , moment = require('moment')
  ;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      id: _.uniqueId('list_')
    }
  },

  interval: function() {
    var intervalInMinutes = parseInt(this.props.step);
    if (isNaN(intervalInMinutes))
      intervalInMinutes = 30;

    return 60 * intervalInMinutes;
  },

  isValid: function(value) {
    return this.parseTime(value).isValid();
  },

  handleBlur: function(event) {
    if (this.props.onChange) {
      event.value = this.parseTime(event.target.value).format('LT');
      event.isValid = this.isValid(event.target.value);

      this.props.onChange(event);
    }

    return true;
  },

  parseTime: function(time) {
    var localizedTime = moment(time, "LT", true);
    if (localizedTime.isValid())
      return localizedTime;

    var militaryTime = moment(time, "HH:mm", true);
    return militaryTime;
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value })
  },

  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      invalid: !this.isValid(this.state.value)
    });
    return input({
      type: 'time'
    , step: this.interval()
    , list: this.state.id
    , value: this.state.value
    , className: classes
    , onChange: this.handleChange
    , onBlur: this.handleBlur
    }, [
      TimeOptions({
        id: this.state.id
      , key: this.state.id
      , interval: this.interval()
      })
    ])
  }
});
