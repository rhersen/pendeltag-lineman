var Expiry = React.createClass({
   render: function() {
      if (!this.props.requestTime) {
         return React.DOM.div();
      }
      var now = this.props.now.getTime();
      var timeSinceRequest = this.getTimeSinceRequest(now);
      var timeSinceResponse = this.getTimeSinceResponse(now);

      function formatTimeSinceResponse() {
         return timeSinceResponse ? '/' + timeSinceResponse.toFixed(1) : '';
      }

      return React.DOM.div(
         {},
         timeSinceRequest.toFixed(1) + formatTimeSinceResponse()
      );
   },

   diff: function diff(toMillis, fromMillis) {
      return (toMillis - fromMillis) / 1000;
   },

   getTimeSinceRequest: function(now) {
      return this.diff(now, this.props.requestTime);
   },

   getTimeSinceResponse: function(now) {
      return this.diff(now, this.props.responseTime);
   }
});
