var Station = React.createClass({
   getInitialState: function() {
      return {
         trains: [],
         requestTime: undefined,
         responseTime: undefined,
         intervalId: undefined,
         now: new Date(),
         unauthorized: false
      };
   },

   clear: function() {
      clearInterval(this.state.intervalId);
      this.setState({intervalId: undefined});
   },

   render: function() {
      var self = this;

      if (this.state.unauthorized) {
         return React.DOM.h1({}, 'unauthorized');
      }

      return React.DOM.div({
         className: this.isPending() && 'pending',
         children: _.compact([
            mainMenuOrStop(),
            refreshMenu(this.state),
            expiry(this.state),
            table(this.state)
         ])
      });

      function mainMenuOrStop() {
         return self.state.intervalId ?
            React.DOM.span({onClick: self.clear}, '0000') :
            MainMenu();
      }

      function refreshMenu(state) {
         return state.current && RefreshMenu({
            current: state.current,
            trains: state.trains
         });
      }

      function expiry(state) {
         return state.intervalId && Expiry({
            requestTime: state.requestTime,
            responseTime: state.responseTime
         });
      }

      function table(state) {
         return Table({trains: state.trains, now: state.now});
      }
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
         getRequestSender(new XMLHttpRequest(), this)(this.state.current);
         this.requestIsPending();
      }
      this.setState({now: new Date()});
   },

   isExpired: function() {
      return !this.isPending() &&
         this.state.now - this.state.responseTime > 0x4000;
   }
});