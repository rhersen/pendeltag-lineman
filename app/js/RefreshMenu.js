var RefreshMenu = React.createClass({
    render: function () {
        var c;
        c = this.props.current;
        return React.DOM.nav({
            className: 'refresh'
        }, StationLink({
            SiteId: c - 1
        }), StationLink({
            className: 'current',
            SiteId: c,
            StopAreaName: this.props.StopAreaName
        }), StationLink({
            SiteId: c + 1
        }), React.DOM.div({
            className: 'link',
            onClick: this.props.clear
        }, 'Meny'));
    }
});