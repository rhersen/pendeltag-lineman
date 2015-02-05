/** @jsx React.DOM */

var StationLink = React.createClass({
    render: function () {
        var _this = this;
        return <li className={this.props.className || 'siteid'} onClick={handleClick}>
                   {this.props.StopAreaName ? abbreviate(this.props.StopAreaName) : this.props.SiteId}
               </li>;

        function handleClick() {
            var requestSender;
            requestSender = getRequestSender(new XMLHttpRequest(), reactRoot);
            requestSender(_this.props.SiteId);
            return reactRoot.requestIsPending();
        }
    }
});