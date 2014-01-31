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
            className: this.isPending() && 'pending',
            children: _.compact([
                this.state.intervalId ? React.DOM.span({onClick: this.clear}, '0000') : MainMenu(),
                this.state.current && RefreshMenu({current: this.state.current, trains: this.state.trains}),
                this.state.intervalId && Expiry({requestTime: this.state.requestTime, responseTime: this.state.responseTime}),
                Table({trains: this.state.trains, now: this.state.now})
            ])
        });
    },

    isPending: function() {
        if (!this.state.responseTime) {
            return this.state.requestTime;
        }

        return this.state.responseTime < this.state.requestTime;
    },

    requestIsPending: function() {
        if (!this.state.intervalId) {
            this.setState({intervalId: setInterval(this.tick, 0x100)});
        }
    },

    tick: function() {
        if (this.isExpired()) {
            sendRequest(this.state.current);
            this.requestIsPending();
        }
        this.setState({now: new Date()});
    },

    isExpired: function() {
        return !this.isPending() && this.state.responseTime && this.state.now - this.state.responseTime > 0x4000;
    }
});