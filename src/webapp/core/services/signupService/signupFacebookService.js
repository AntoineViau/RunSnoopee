angular.module('app').factory('signupFacebookService', ['parseClientService', 'facebookService', '$q', 'authService', 'userService',
    function(parseClientService, facebookService, $q, authService, userService) {

        var _FB;
        var _facebookUserId;
        var _accessToken;
        var _tokenExpires;

        // Affichage de la dialog de FB pour demander à l'utilisateur
        // s'il veut bien jouer avec nous...
        var _login = function() {
            var promiseManager = $q.defer();
            _FB.login(function(response) {
                // Oui, il veut bien !
                if (response.status === 'connected') {
                    _facebookUserId = response.authResponse.userID;
                    _accessToken = response.authResponse.accessToken;
                    _tokenExpires = response.authResponse.expiresIn;
                    promiseManager.resolve(true);
                } else {
                    promiseManager.resolve(false);

                }
            }, {
                scope: 'public_profile,email'
            });
            return promiseManager.promise;
        };

        var _getInfos = function() {
            var promiseManager = $q.defer();
            FB.api('/me', function(infosResponse) {
                promiseManager.resolve(infosResponse);
            });
            return promiseManager.promise;
        };

        var _signup = function() {
            var authData = {
                'facebook': {
                    'id': _facebookUserId,
                    'access_token': _accessToken, // des heures de perdues parce que j'avais tapé "accessToken" pour l'id
                    'expiration_date': new Date(_tokenExpires * 1000 + (new Date()).getTime())
                }
            };
            return parseClientService.post('/users', null, {
                'authData': authData
            });
        };

        var _service = {};
        _service = {
            signup: function() {
                return facebookService.loadFacebook()
                    .then(function(FB) {
                        _FB = FB;
                        // On demande à facebook sa dialog. 
                        // Elle nous dit si l'utilisateur veut bien jouer avec nous.
                        return _login();
                    })
                    .then(function(permissionGranted) {
                        if (permissionGranted) {
                            // Il veut bien !
                            // On le signup dans Parse
                            return _signup();
                        } else {
                            return $q.reject(); // en attendant plus propre...
                        }
                    })
                    .then(function() {
                        // On le connecte...
                        return authService.loginUserWithFacebook();
                    })
                    .then(function(success) {
                        userService.setUserId(authService.getLoggedUserId());
                        // On récupère les infos de son compte Facebook
                        return _getInfos();
                    })
                    .then(function(userInfos) {
                        // Et on envoie les infos dans le user...
                        return userService.updateUser({
                            'email': userInfos.email,
                            'firstName': userInfos.first_name,
                            'lastName': userInfos.last_name,
                            'deleted': false
                        });
                    })
                    .then(function() {
                        return authService.getLoggedUserId();
                    });
            }
        };
        return _service;
    }
]);
