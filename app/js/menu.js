var MainMenu = React.createClass({
   getInitialState: function () {
      return {
         stations: [
            {SiteId: '9506'},
            {SiteId: '9520'}
         ]
      };
   },

   componentDidMount: function () {
      var self = this;
      var request = new XMLHttpRequest();
      request.open('GET', '/stations', true);

      request.onload = function () {
         if (this.status >= 200 && this.status < 400) {
            self.handleStations(JSON.parse(this.response));
         }
      };

      request.send();
   },

   handleStations: function (stations) {
      this.setState({stations: stations});
   },

   render: function () {
      return React.DOM.nav({
         children: _.map(this.state.stations, function (el) {
            return StationLink(el);
         })
      });
   }
});

var RefreshMenu = React.createClass({
   render: function () {
      var c = this.props.current;
      return React.DOM.nav({
            className: 'refresh'
         },
         StationLink({SiteId: c - 1}),
         StationLink({SiteId: c, StopAreaName: this.props.StopAreaName}),
         StationLink({SiteId: c + 1})
      );
   }
});
