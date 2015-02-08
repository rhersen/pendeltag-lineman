/** @jsx React.DOM */

var RefreshMenu = React.createClass({
    render: function () {
        var c = this.props.current;
        return <nav className="refresh">
            <StationLink key={  c - 1 } />
            <StationLink className='current' key={c} StopAreaName={this.props.StopAreaName} />
            <StationLink key={c + 1} />
            <div className='link' onClick={this.props.clear }>Klar</div>
        </nav>
    }
});