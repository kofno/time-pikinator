var React = require('react')
  , TimePicker = require('./index')
  , div = React.DOM.div
  , moment = require('moment')
  ;

var App = React.createClass({
  getInitialState: function() {
    return { value: '' }
  },

  handleTimeChange: function(event) {
    if (event.isValid) {
      this.setState({ value: event.value })
    }
  },

  render: function() {
    return div({}, [
      TimePicker({ key: 1, onChange: this.handleTimeChange, value: this.state.value }),
      div({}, ["This selected time: " + this.state.value])
    ]);
  }
});

React.renderComponent(
  App({}),
  document.body
);
