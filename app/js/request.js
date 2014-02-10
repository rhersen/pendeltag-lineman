function getRequestSender(ajax, reactRoot) {
   return function sendRequest(id) {
      reactRoot.setState({requestTime: new Date().getTime()});
      ajax.onreadystatechange = callback;
      ajax.open("GET", '/departures/' + id, true);
      ajax.send();

      function callback() {
         if (ajax.readyState === 4 && ajax.status === 200) {
            handleResult(JSON.parse(ajax.responseText));
         }

         function handleResult(resultTrains) {
            reactRoot.setState({responseTime: new Date().getTime()});
            reactRoot.setState({trains: resultTrains});
            reactRoot.setState({
                  current: parseInt(_.first(resultTrains).SiteId, 10) }
            );
         }
      }
   };
}
