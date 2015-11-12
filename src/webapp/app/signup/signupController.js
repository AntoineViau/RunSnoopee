angular.module('app.controllers')
    .controller('signupController', ['userService', '$state', 'errorService', '$scope', 'parseClientService', 'signupService', 'taskService',
        function(userService, $state, errorService, $scope, parseClientService, signupService, taskService) {

            var _vm = this;
            _vm.email = '';
            _vm.password = '';
            _vm.error = null;
            _vm.facebookReady = false;

            var _validateString = function(str, pattern) {
                if (typeof str !== 'string') {
                    return false;
                }
                var regexp = new RegExp(pattern);
                var res = regexp.test(str);
                if (res === false) {
                    return false;
                }
                return true;
            };

            _vm.createUser = function() {
                if (_validateString(_vm.email, /[_a-z0-9-]+[\._a-z0-9-]*\@[a-z0-9-]+[\.a-z0-9-]*\.[a-z]{2,3}$/i) === false) {
                    _vm.error = 'E-mail invalide';
                    return;
                }
                signupService.signupWithEmail(_vm.email, _vm.password)
                    .then(function() {
                        return authService.loginWithEmail(_vm.email, _vm.password);
                    })
                    .then(function() {
                        return userService.loadUser();
                    })
                    .then(function() {
                        $state.go('selectType');
                    })
                    .catch(function(error) {
                        _vm.error = 'Impossible de créer ce compte. Cet e-mail est déjà enregistré ?';
                    });
            };

            _vm.facebookLogin = function() {
                taskService.do(
                    '',
                    signupService.signupWithFacebook()
                    .then(function() {
                        return userService.loadAndBranchUser();
                    })
                    .then(function() {
                        $state.go('selectType');
                    })
                    .catch(function(error) {
                        // Problème, ou bien le user a refusé les permissions
                    })
                );
            };
        }
    ]);
