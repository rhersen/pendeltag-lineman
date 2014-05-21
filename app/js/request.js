function getRequestSender(ajax, reactRoot) {
   return function sendRequest(id) {
      reactRoot.setState({requestTime: new Date().getTime()});
      ajax.onreadystatechange = callback;
      ajax.open("GET", '/departures/' + id, true);
      ajax.send();

      function callback() {
         if (ajax.readyState === 4) {
            if (ajax.status === 200) {
               handleResult(JSON.parse(ajax.responseText));
            }

            if (ajax.status === 401) {
               reactRoot.setState({unauthorized: true});
            }
         }

         function handleResult(resultTrains) {
            reactRoot.setState({
               responseTime: new Date().getTime(),
               trains: resultTrains,
               current: parseInt(_.first(resultTrains).SiteId, 10)
            });
         }
      }
   };
}
