HelloWorld = React.createClass({
    getDefaultProps: function() {
        return { number: this.randomNumber() };
    },
    randomNumber: function() {
        return Math.random();
    },
    render: function() {
        return React.DOM.div('Hello ' + this.props.number);
    }
});

describe("HelloWorld", function() {
    beforeEach(function() {
        $('<div id="jasmine_content"></div>').appendTo('body');
    });

    it("can spy on a function for a React class", function() {
        jasmineReact.spyOnClass(HelloWorld, "randomNumber").andReturn(42);

        // jasmineReact wraps React.renderComponent, so you don't have to worry
        //  about the async nature of when the actual DOM get's rendered, or selecting
        //  where your component needs to get rendered (default is #jasmine_content)
        var myWorld = jasmineReact.renderComponent(HelloWorld());

        expect(myWorld.props.number).toBe(42);
    });

    it("can assert that a spy has been called", function() {
        jasmineReact.spyOnClass(HelloWorld, "randomNumber");

        jasmineReact.renderComponent(HelloWorld());

        // because we spy on the class and not the instance, we have to assert that the
        //   function on the class' prototype was called.
        expect(jasmineReact.classPrototype(HelloWorld).randomNumber).toHaveBeenCalled();
    });
});