angular.module('app').factory('signupService', ['parseClientService', 'signupFacebookService',
    function(parseClientService, signupFacebookService) {

        var _service = {};

        _service = {
            signupWithEmail: function(email, password) {
                var now = new Date();
                return parseClientService.post('/users', null, {
                        'username': email,
                        'email': email,
                        'password': password,
                        'deleted': false
                    })
                    .then(function(data) {
                        return data.objectId;
                    });
            },
            signupWithFacebook: function() {
                return signupFacebookService.signup();
            }
        };
        return _service;
    }
]);
