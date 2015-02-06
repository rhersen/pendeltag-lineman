/** @jsx React.DOM */

var RefreshMenu = React.createClass({
    render: function () {
        var c = this.props.current;
        return <nav className="refresh">
            <StationLink SiteId={  c - 1 } />
            <StationLink className='current' SiteId={c} StopAreaName={this.props.StopAreaName} />
            <StationLink SiteId={c + 1} />
            <div className='link' onClick={this.props.clear }>Klar</div>
        </nav>
    }
});