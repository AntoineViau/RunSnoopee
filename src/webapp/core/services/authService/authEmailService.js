angular.module('app').factory('authEmailService', ['parseClientService',
    function(parseClientService) {
        var _FB;
        var _service = {};
        _service = {
            loginUser: function(email, password) {
                console.log('authEmailService.loginUser()');
                return parseClientService.get('/login', {
                        'username': email,
                        'password': password
                    })
                    .then(function(data) {
                        console.log('login succeed, parse token = ' + data.sessionToken);
                        parseClientService.setSessionToken(data.sessionToken);
                        return data.objectId;
                    });
            },
        };
        return _service;
    }
]);
