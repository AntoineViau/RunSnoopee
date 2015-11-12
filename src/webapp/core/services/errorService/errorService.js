angular.module("app").factory("errorService", ['$timeout', '$q', function($timeout, $q) {

    var _errorMessages = [];

    return {
        reset: function() {
            _errorMessages = [];
        },
        pushErrorMessage: function(errorMessage) {
            _errorMessages.push(errorMessage);
        },
        popErrorMessage: function() {
            return _errorMessages.pop();
        },
        getLastErrorMessage: function() {
            var lastErrorMessage = _errorMessages[_errorMessages.length - 1];
            return lastErrorMessage;
        },
        getNbErrorMessages: function() {
            return _errorMessages.length;
        },
        getErrorMessages: function() {
            return [].concat(_errorMessages);
        },
        setErrorMessages: function(errorMessages) {
            _errorMessages = [].concat(errorMessages);
        },
        showLocalError: function(errorMessage) {
            return $q.when(alert(errorMessage));
        }
    };
}]);
