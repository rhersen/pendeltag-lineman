var StationLink = React.createClass({
   render: function() {
      var self = this;

      return React.DOM.li(
         {
            className: 'siteid',
            onClick: function() {
               var requestSender = getRequestSender(
                  new XMLHttpRequest(),
                  reactRoot
               );
               requestSender(self.props.number);
               reactRoot.requestIsPending();
            }
         },
         names.get(this.props.number));
   }
});
