function getRequestSender(ajax, reactRoot) {
    var handleResult;
    handleResult = function(resultTrains) {
        return reactRoot.responseReceived(resultTrains);
    };
    return function(id) {
        var callback;
        callback = function() {
            if (ajax.readyState === 4) {
                if (ajax.status === 200) {
                    handleResult(JSON.parse(ajax.responseText));
                }
                if (ajax.status === 401) {
                    return reactRoot.responseReceived(false);
                }
            }
        };
        reactRoot.requestSent();
        ajax.onreadystatechange = callback;
        ajax.open("GET", '/departures/' + id, true);
        return ajax.send();
    };
}
