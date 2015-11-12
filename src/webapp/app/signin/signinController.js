angular.module('app.controllers').controller('signinController', ['userService', '$location', 'taskService', '$state', 'authService', 'signupService',
    function signinController(userService, $location, taskService, $state, authService, signupService) {

        var _vm = this;

        _vm.signin = function() {
            if (!_vm.email || !_vm.password) {
                // L'affichage du message d'erreur est gérée par l'attribut required
                // dans le HTML.
                return;
            }
            return taskService.do(
                    'Connexion...',
                    authService.loginUserWithEmail(_vm.email, _vm.password)
                )
                .then(function(success) {
                    // Pourquoi une seule callback et non pas deux  ? (succès et erreur)
                    // Parce que des identifiants invalides ne sont pas considérés comme
                    // une erreur. Une erreur serait une panne réseau par exemple.
                    if (success === true) {
                        return userService.loadAndBranchUser();
                    }
                    _vm.invalidAuthentication = "E-mail ou mot de passe invalide";
                });
        };

        var _tryToLoginWithFacebook = function() {
            return authService.loginUserWithFacebook()
                .then(function(success) {
                    if (success) {
                        console.log('Success login with FB, load user and go to next state');
                        return true;
                    }
                    console.log('Failed login with FB, try signup');
                    return signupService.signupWithFacebook();
                })
                .then(function(loggedIn) {
                    console.log('Received after login or signup : ' + loggedIn);
                    if (loggedIn) {
                        return userService.loadAndBranchUser();
                    } else {
                        $location.path('/signin');
                    }
                });
        };

        _vm.facebookLogin = function() {
            taskService.do('', _tryToLoginWithFacebook());
        };

        _vm.invalidAuthentication = false;

        if ($location.absUrl().indexOf('localhost') !== -1) {
            console.log('In localhost, force signin');
            _vm.email = "whitebird400@orange.fr"; // Runner
            //_vm.email = "blackwolf52@free.fr"; // Dogger
            _vm.password = "antoine";
            //_vm.signin();
        }

    }
]);
