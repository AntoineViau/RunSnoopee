angular.module("tasking").factory("waitingService", ["toaster", "$timeout", "blockUI", function(toaster, $timeout, blockUI) {

    var _isWaiting = false;
    var _message;
    var _toastElement;
    var _timeoutHandle;

    var _service = {
        start: function(msg) {
            _timeoutHandle = $timeout(function() {
                //console.log('waiting started...');
                _message = msg;
                //_toastElement = toaster.pop('wait', '', msg, 0, 'trustedHtml');
                if (_service.isWaiting() === false) {
                    blockUI.start();
                    //console.log('blockui started...');
                }
                _isWaiting = true;
            }, 250);
        },
        stop: function() {
            _isWaiting = false;
            _message = '';
            $timeout.cancel(_timeoutHandle);
            //toaster.clear();
            blockUI.stop();
            //console.log('blockui stopped...');
        },
        isWaiting: function() {
            return _isWaiting;
        },
        getMessage: function() {
            return _message;
        }
    };

    return _service;
}]);
