angular.module('app.controllers')
    .controller('mailsController', ['userService', '$state', '$modal', 'mailService',
        function(userService, $state, $modal, mailService) {

            var _vm = this;
            _vm.nbUnread = 0;

            _vm.viewMessage = function(message) {
                modalInstance = $modal.open({
                    templateUrl: "/app/mails/viewMessage.html",
                    controller: 'viewMessageController',
                    resolve: {
                        'message': function() {
                            return message;
                        }
                    }
                });
            };

            _vm.deleteMessage = function(message) {
                if (!confirm("Etes-vous sur de vouloir effacer ce message de " + message.from.nickName + "?")) {
                    return;
                }
                mailService.deleteMessage(message)
                    .then(_vm.refreshMessagesList);
            };

            _refreshMessagesList = function(loader) {
                return loader()
                    .then(function(messages) {
                        _vm.messages = messages;
                        for (var i = 0; i < _vm.messages.length; i++) {
                            var message = _vm.messages[i];
                            message.sendDate = new Date(message.sendDate.iso);
                            message.unread = message.readDate;
                            if (message.unread) {
                                _vm.nbUnread++;
                            }
                        }
                    });
            };

            _vm.loadReceived = function() {
                _vm.currentSection = 'received';
                return _refreshMessagesList(mailService.getReceivedMessages);
            };

            _vm.loadSent = function() {
                _vm.currentSection = 'sent';
                return _refreshMessagesList(mailService.getSentMessages);

            };

            _vm.loadReceived();
        }
    ]);
