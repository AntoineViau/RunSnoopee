angular.module('app').factory('mailService', ['parseClientService', 'userService',
    function(parseClientService, userService) {

        var _service = {};
        _service = {
            mailTo: function(dstUser, body) {
                var now = new Date();
                return parseClientService.post('/classes/Message', null, {
                        'from': {
                            '__type': 'Pointer',
                            'className': '_User',
                            'objectId': userService.getCurrentUser().objectId
                        },
                        'to': {
                            '__type': 'Pointer',
                            'className': '_User',
                            'objectId': dstUser.objectId
                        },
                        'body': body,
                        'sendDate': {
                            '__type': 'Date',
                            'iso': now
                        }
                    })
                    .then(function() {
                        parseClientService.post('/functions/mailNewMessage', null, {
                            'from': userService.getCurrentUser(),
                            'to': dstUser,
                            'message': body
                        });
                    });
            },
            getReceivedMessages: function() {
                var where = {
                    'to': {
                        '__type': 'Pointer',
                        'className': '_User',
                        'objectId': userService.getCurrentUser().objectId
                    }
                };
                return parseClientService.get('/classes/Message', {
                    'where': where,
                    'include': 'from'
                });
            },
            getSentMessages: function() {
                var where = {
                    'from': {
                        '__type': 'Pointer',
                        'className': '_User',
                        'objectId': userService.getCurrentUser().objectId
                    }
                };
                return parseClientService.get('/classes/Message', {
                    'where': where,
                    'include': 'to'
                });
            },
            deleteMessage: function(message) {
                return parseClientService.delete('/classes/Message/' + message.objectId);
            }
        };
        return _service;
    }
]);
