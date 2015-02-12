/** @jsx React.DOM */

var Station = React.createClass({
    getInitialState: function () {
        return {
            trains: [],
            requestTime: undefined,
            responseTime: undefined,
            intervalId: undefined,
            now: new Date(),
            httpStatus: false
        };
    },

    clear: function () {
        clearInterval(this.state.intervalId);
        this.setState({
            trains: [],
            requestTime: undefined,
            responseTime: undefined,
            intervalId: undefined,
            current: undefined,
            StopAreaName: undefined,
            httpStatus: false
        });
    },

    render: function () {
        var self = this;

        return React.DOM.div({
            className: this.isPending() && 'pending',
            children: _.compact([
                errorMessage(),
                mainMenuOrNothing(),
                refreshMenu(this.state),
                expiry(this.state),
                table(this.state)
            ])
        });

        function errorMessage() {
            if (self.state.httpStatus) {
                return <div className="error">{self.state.httpStatus}</div>;
            }
        }

        function mainMenuOrNothing() {
            if (!self.state.intervalId) {
                return MainMenu();
            }
        }

        function refreshMenu(state) {
            return state.current && RefreshMenu({
                    current: state.current,
                    StopAreaName: state.StopAreaName,
                    trains: state.trains,
                    clear: self.clear
                });
        }

        function expiry(state) {
            return state.intervalId && Expiry({
                    requestTime: state.requestTime,
                    responseTime: state.responseTime,
                    now: state.now
                });
        }

        function table(state) {
            return Table({trains: state.trains, now: state.now});
        }
    },

    isPending: function () {
        if (!this.state.responseTime) {
            return this.state.requestTime;
        }

        return this.state.responseTime < this.state.requestTime;
    },

    requestIsPending: function () {
        if (!this.state.intervalId) {
            this.setState({intervalId: setInterval(this.tick, 0x100)});
        }
    },

    requestSent: function () {
        this.setState({
            requestTime: new Date().getTime(),
            now: new Date()
        });
    },

    responseReceived: function (result) {
        if (result.trains) {
            this.setState({
                responseTime: new Date().getTime(),
                trains: result.trains,
                current: parseInt(result.SiteId, 10),
                StopAreaName: result.StopAreaName
            });
        } else {
            clearInterval(this.state.intervalId);
            this.setState({
                trains: [],
                requestTime: undefined,
                responseTime: undefined,
                intervalId: undefined,
                current: undefined,
                StopAreaName: undefined,
                httpStatus: result
            });
        }
    },

    tick: function () {
        if (this.isExpired()) {
            getRequestSender(new XMLHttpRequest(), this)(this.state.current);
            this.requestIsPending();
        }
        this.setState({now: new Date()});
    },

    isExpired: function () {
        return !this.isPending() &&
            this.state.now - this.state.responseTime > 30000;
    }
});