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
