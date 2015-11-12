angular.module('app').controller('mailToController', ['$scope', '$modalInstance', 'dstUser', 'userService', '$timeout', 'mailService',
    function raceModalController($scope, $modalInstance, dstUser, userService, $timeout, mailService) {

        $scope.mailTo = {};
        $scope.mailTo.dstUser = dstUser;
        $scope.mailTo.body = '';
        $scope.mailTo.sending = false;
        $scope.mailTo.doneMessage = '';

        $scope.mailTo.send = function() {
            $scope.mailTo.sending = true;
            return mailService.mailTo(dstUser, $scope.mailTo.body)
                .then(function() {
                    $scope.mailTo.doneMessage = 'Votre message a bien été envoyé.';
                    return $timeout(function() {}, 1000);
                })
                .then(function() {
                    $modalInstance.close();
                });
        };

        $scope.mailTo.cancel = function() {
            $modalInstance.close();
        };

    }
]);
