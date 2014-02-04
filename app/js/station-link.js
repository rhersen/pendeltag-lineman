var StationLink = React.createClass({
    render: function() {
        var self = this;

        return React.DOM.li({
                className: 'siteid',
                onClick: function() {
                    getRequestSender(new XMLHttpRequest(), reactRoot)(self.props.number);
                    reactRoot.requestIsPending();
                }
            },
            this.props.number);
    }
});
