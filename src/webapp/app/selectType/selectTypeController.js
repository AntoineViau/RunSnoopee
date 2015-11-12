angular.module('app.controllers')
    .controller('selectTypeController', ['userService', '$state', function(userService, $state) {

        var user = userService.getCurrentUser();

        if (user.type) {
            return $state.go('userProfile');
        }

        this.setDogger = function() {
            user.type = 'dogger';
            userService.updateUser(user)
                .then(function() {
                    userService.addDog();
                })
                .then(function() {
                    $state.go('userProfile');
                });
        };

        this.setRunner = function() {
            user.type = 'runner';
            userService.updateUser(user)
                .then(function() {
                    $state.go('userProfile');
                });
        };


    }]);
