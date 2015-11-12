angular.module("tasking").factory("completionService", ["toaster", function (toaster) {

        return {
            pushCompletionMessage: function (msg) {
                toaster.pop('success', msg);
            }
        };
    }]);
