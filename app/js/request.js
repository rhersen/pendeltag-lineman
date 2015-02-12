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
                if (ajax.status >= 400) {
                    return reactRoot.responseReceived(ajax.status);
                }
            }
        };
        reactRoot.requestSent();
        ajax.onreadystatechange = callback;
        ajax.open("GET", '/departures/' + id, true);
        return ajax.send();
    };
}

function getStations(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', '/stations', true);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            callback(JSON.parse(this.response));
        }
    };
    request.send();
}
