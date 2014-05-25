var MainMenu = React.createClass({
   getInitialState: function () {
      return {
         stations: [
            '9506',
            '9520'
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
      return React.DOM.nav({children: _.map(this.state.stations, function (number) {
         return StationLink({number: number});
      })});
   }
});

var RefreshMenu = React.createClass({
   render: function () {
      return React.DOM.nav({
         className: 'refresh',
         children: _.map(getStations(this.props.current), stationLink)
      });

      function getStations(c) {
         return [c - 1, c, c + 1];
      }

      function stationLink(number) {
         return StationLink({number: number});
      }
   }
});
