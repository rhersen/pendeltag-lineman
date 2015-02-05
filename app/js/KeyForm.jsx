/** @jsx React.DOM */

var KeyForm = React.createClass({
    render: function () {
        return <div>
            <h1>unauthorized</h1>
            <input ref="key"></input>
            <button onClick={this.post}>post</button>
        </div>;
    },
    post: function () {
        var request;
        request = new XMLHttpRequest();
        request.open('POST', '/key', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        return request.send("key=" + (this.refs.key.getDOMNode().value));
    }
});
