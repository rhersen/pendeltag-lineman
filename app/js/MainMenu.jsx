/** @jsx React.DOM */

window.MainMenu = React.createClass({
    getInitialState: function () {
        return {
            stations: {
                northwest: [],
                northeast: [],
                central: [],
                southwest: [],
                southeast: []
            }
        };
    },

    componentDidMount: function () {
        getStations(this.handleStations);
    },

    handleStations: function (stations) {
        this.setState({
            stations: stations
        });
    },

    render: function () {
        return <div>
            <nav className='pull-left'>{_.map(_.initial(this.state.stations.northwest, 1), stationLink)}</nav>
            <nav className='pull-right'>{_.map(_.initial(this.state.stations.northeast, 1), stationLink)}</nav>
            <nav className='pull-left narrow'>{_.map(_.last(this.state.stations.northwest, 1), stationLink)}</nav>
            <nav className='center'>{_.map(_.first(this.state.stations.central, 1), stationLink)}</nav>
            <nav className='pull-right narrow'>{_.map(_.last(this.state.stations.northeast, 1), stationLink)}</nav>
            <nav className='center wide'>{_.map(_.rest(_.initial(this.state.stations.central)), stationLink)}</nav>
            <nav className='pull-left narrow'>{_.map(this.state.stations.southwest, stationLink)}</nav>
            <nav className='center'>{_.map(_.last(this.state.stations.central, 1), stationLink)}</nav>
            <nav className='pull-right narrow'>{_.map(this.state.stations.southeast, stationLink)}</nav>
        </div>;

        function stationLink(station) {
            return <StationLink key={station.SiteId} StopAreaName={station.StopAreaName} />;
        }
    }
});
