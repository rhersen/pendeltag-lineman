var TableRow = React.createClass({
   getTime: function(dateTime) {
      var zeroSeconds = /^.*T(.+):00$/.exec(dateTime);
      if (zeroSeconds) {
         return zeroSeconds[1];
      }
      var nonZeroSeconds = /^.*T(.+)$/.exec(dateTime);
      if (nonZeroSeconds) {
         return nonZeroSeconds[1];
      }
      return dateTime;
   },

   render: function() {
      var dateTime = this.props.train.ExpectedDateTime;
      return React.DOM.div({
         className: 'direction' + this.props.train.JourneyDirection,
         children: [
            React.DOM.time({}, this.getTime(dateTime)),
            React.DOM.span(
               {className: 'destination'},
               abbreviate(this.props.train.Destination)
            ),
            Countdown({dateTime: dateTime, now: this.props.now})
         ]
      });
   }
});

var Table = React.createClass({
   render: function() {
      var now = this.props.now;
      return React.DOM.div({
         className: 'table',
         children: this.props.trains.map(tableRow)
      });

      function tableRow(train) {
         return TableRow({train: train, now: now});
      }
   }
});
