var MainMenu = React.createClass({
   render: function() {
      var stations = [
         '9510',
         '9000',
         '9530',
         '9531',
         '9529',
         '9528',
         '9527',
         '9526',
         '9525',
         '9524',
         '9523',
         '9522',
         '9521',
         '9520'
      ];

      return React.DOM.nav({children: _.map(stations, function(number) {
         return StationLink({number: number});
      })});
   }
});

var RefreshMenu = React.createClass({
   render: function() {
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
