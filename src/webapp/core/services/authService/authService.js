/*
L'idée d'un authService est totalement SRP : donner les moyens pour savoir si un user est valide ou non.
Il va donc fournir les interfaces pour les différentes méthodes d'accès (email, FB, twitter, etc.) et 
va procéder au login. Cela se traduit par une acceptation côté serveur avec en retour un identifiant d'utilisateur.
Tout le reste se passe ailleurs, notamment le loading du user.
Seul petit problème : la notion de currentUser et de isLogged.
Bon, on est en mono user, donc ce service peut contenir isLogged()
Il n'a pas besoin de connaître et retourner currentUser.
Mais comment se fait la transmission du userId vers userService ?
Simplement en stockant le userId dans le authService.

Niveau interface : chaque méthode permet de login avec un moyen (email, fb, etc.)
La promise retournée résoud le userId. Tout problème sera traité dans un catch.
Initialement j'aurais préféré une résolution par un booléen pour dire que le login s'était
bien passé. Mais on est moins dans une logique REST. 
En même temps, on fait du JS, pas du REST...
Donc finalement c'est ce que je fais...

TODO : authService est un sous-service de userService !
C'est complétement idiot de dire qu'on login sans interagir avec le user.
Ou alors c'est un service de validation (nous dit seulement si le user peut se login ou non).


*/
angular.module('app').factory('authService', ['authEmailService', 'authFacebookService', '$q', 'parseClientService',
    function(authEmailService, authFacebookService, $q, parseClientService) {

        var _userId;

        var _service = {};
        _service = {
            isUserLoggedIn: function() {
                return typeof _userId !== 'undefined';
            },
            getLoggedUserId: function() {
                return _userId;
            },
            loginUserWithEmail: function(email, password) {
                return authEmailService.loginUser(email, password)
                    .then(function(userId) {
                        if (userId) {
                            _userId = userId;
                            return true;
                        }
                        return false;
                    });
            },
            loginUserWithFacebook: function() {
                return authFacebookService.loginUser()
                    .then(function(userId) {
                        if (userId) {
                            _userId = userId;
                            return true;
                        }
                        return false;
                    });
            },
            signout: function() {
                _userId = undefined;
                console.log('logout from Parse');
                return parseClientService.post('/logout')
                    .then(function() {
                        console.log('Reset parse session token and reset user');
                        parseClientService.setSessionToken(null);
                    });
            }
        };
        return _service;
    }
]);
