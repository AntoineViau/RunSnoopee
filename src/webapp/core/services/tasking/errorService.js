angular.module("tasking").factory("errorService", ["toaster", function(toaster) {

    var _errorMessages = [];

    return {
        reset: function() {
            _errorMessages = [];
        },

        pushErrorMessage: function(errorMessage) {
            _errorMessages.push(errorMessage);
            toaster.pop('error', 'UNE ERREUR EST SURVENUE !', errorMessage, 10 * 1000);
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
        }
    };
}]);
