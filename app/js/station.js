/*global time: false, names: false, countdown: false, _: false */

var Station = React.createClass({
    getInitialState: function() {
        return {
            trains: [],
            requestTime: undefined,
            responseTime: undefined,
            intervalId: undefined,
            now: new Date()
        };
    },

    clear: function() {
        clearInterval(this.state.intervalId);
        this.setState({intervalId: undefined});
    },

    render: function() {
        return React.DOM.div({
            className: this.isPending() ? 'pending' : undefined,
            children: _.compact([
            this.state.intervalId ? React.DOM.span({onClick: this.clear}, '0000') : MainMenu(),
                this.state.current && RefreshMenu({current: this.state.current, trains: this.state.trains}),
                this.state.intervalId && Expiry({requestTime: this.state.requestTime, responseTime: this.state.responseTime}),
                Table({trains: this.state.trains, now: this.state.now})
            ])
        });
    },

    isPending: function() {
        return !this.state.responseTime || this.state.responseTime < this.state.requestTime;
    }
});