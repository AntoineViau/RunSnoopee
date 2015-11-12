angular.module('app').controller('viewMessageController', ['$scope', '$modalInstance', 'message', 'userService', '$timeout', 'mailService',
    function viewMessageController($scope, $modalInstance, message, userService, $timeout, mailService) {

        $scope.viewMessage = {};
        $scope.viewMessage.message = message;
        $scope.viewMessage.reply = false;
        $scope.viewMessage.doneMessage = '';
        $scope.viewMessage.answer = '';

        $scope.viewMessage.sendReply = function() {
            $scope.viewMessage.sending = true;
            return mailService.mailTo(message.from, $scope.viewMessage.answer)
                .then(function() {
                    $scope.viewMessage.doneMessage = 'Votre message a bien été envoyé.';
                    return $timeout(function() {}, 1000);
                })
                .then(function() {
                    $modalInstance.close();
                });
        };

        $scope.viewMessage.cancel = function() {
            $modalInstance.close();
        };

    }
]);
