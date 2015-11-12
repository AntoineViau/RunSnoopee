angular.module('app').factory('authFacebookService', ['$q', '$window', 'parseClientService', 'facebookService',
    function($q, $window, parseClientService, facebookService) {

        var _FB;
        var facebookUserId;
        var accessToken;
        var tokenExpires;

        var _loginUser = function(response) {
            console.log("I have fb userId and accessToken, now trying to login into Parse");
            facebookUserId = response.authResponse.userID;
            accessToken = response.authResponse.accessToken;
            tokenExpires = response.authResponse.expiresIn;
            // Donc le user a bien accepté la liaison FB-app, mais
            // il n'existe pas dans la DB. On sort du signin pour                        
            // aller au signup...
            // C'est un cas un peu particulier : le user a créé un compte 
            // normalement avec FB, donc a autorisé la liaison. Puis, il
            // efface son compte. Puis, il cherche à se connecter à nouveau
            // avec FB.
            // Mais fuck it pour le moment, c'est trop crade.
            // return parseClientService.get('/users', {
            //         'where': {
            //             'authData.facebook.id': facebookUserId
            //         }
            //     })
            return $q.when()
                .then(function() {
                    // cf juste au dessus
                    // if (!users || users.length > 0) {
                    //     return signupFacebookService.signup();
                    // }
                    var authData = {
                        'facebook': {
                            'id': facebookUserId,
                            'access_token': accessToken, // des heures de perdues parce que j'avais tapé "accessToken" au lieu de "access_token"
                            'expiration_date': new Date(tokenExpires * 1000 + (new Date()).getTime())
                        }
                    };
                    return parseClientService.post('/users', null, {
                        'authData': authData
                    });
                })
                .then(function(data) {
                    parseClientService.setSessionToken(data.sessionToken);
                    return data.objectId;
                });
        };

        var _getLoginStatus = function() {
            console.log('authFacebookService.getLoginStatus()');
            var promiseManager = $q.defer();
            _FB.getLoginStatus(function(response) {
                console.log('authFacebookService.getLoginStatus() -> resolve')
                promiseManager.resolve(response);
            });
            return promiseManager.promise;
        };

        var _service = {};
        _service = {
            loginUser: function() {
                console.log('authFacebookService.loginUser()');
                return facebookService.loadFacebook()
                    .then(function(FB) {
                        _FB = FB;
                        return _getLoginStatus();
                    })
                    .then(function(response) {
                        console.log('response from authFacebookService.getLoginStatus() : ' + response.status);
                        if (response.status === 'connected') {
                            console.log('FB says : connected !');
                            return _loginUser(response);
                        }
                        return false;
                    });
            }
        };
        return _service;
    }
]);
