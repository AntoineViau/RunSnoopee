angular.module('app').factory('userService', ['parseClientService', '$q', 'authService', '$state',
    function(parseClientService, $q, authService, $state) {

        var _userId;
        var _currentUser = {};
        var _dog = {};

        var _service = {};
        _service = {
            setUserId: function(userId) {
                _userId = userId;
            },
            loadUser: function() {
                console.log('userService.loadUser()');
                return parseClientService.get('/users/' + _userId)
                    .then(function(data) {
                        angular.extend(_currentUser, data);
                        if (_currentUser.type === 'dogger') {
                            return parseClientService.get('/classes/Dog', {
                                where: {
                                    'owner': {
                                        '__type': 'Pointer',
                                        'className': '_User',
                                        'objectId': _userId
                                    }
                                }
                            });
                        } else {
                            // Typiquement ce qui chagrine avec les Promises.
                            // On voudrait interrompre la chaîne ici, mais on
                            // ne peut pas. 
                            return [];
                        }
                    })
                    .then(function(dogs) {
                        if (dogs.length > 0) {
                            _dog = dogs[0];
                            _dog.id = _dog.objectId;
                        }
                        return _currentUser;
                    });
            },
            // Perplexe je suis sur la présence de cette méthode ici.
            // Ca ressemble tellement à un boulot de contrôleur...
            loadAndBranchUser: function() {
                _service.setUserId(authService.getLoggedUserId());
                return _service.loadUser()
                    .then(function(currentUser) {
                        // if (!_service.isRunner() && !_service.isDogger()) {
                        //     return $state.go('selectType');
                        // }
                        // if (!_service.isProfileComplete()) {
                        //     return $state.go('userProfile');
                        // }                        
                        return $state.go('search');
                    });
            },
            isProfileComplete: function() {
                if (!_currentUser.email || !_currentUser.nickName || _currentUser.address) {
                    return false;
                }
                if (_service.isDogger()) {
                    if (!_dog || !_dog.name || !_dog.age || !_dog.breed || !_dog.size || !_dog.sportLevel) {
                        return false;
                    }
                }
                return true;
            },
            isRunner: function() {
                return _currentUser.type == 'runner';
            },
            isDogger: function() {
                return _currentUser.type == 'dogger';
            },
            getCurrentUser: function() {
                return _currentUser;
            },
            updateUser: function(userDto) {
                console.log('userService.updateUser()');
                // userDto contiendra toujours picture1. 
                // Si picture1.size existe on a à faire à un nouveau fichier (données issues de FormData)
                // Sinon, c'est simplement les données de Parse qu'on renverra en l'état.
                return $q.when(userDto.picture1 && userDto.picture1.size ? parseClientService.uploadFile('picture1', userDto.picture1) : false)
                    .then(function(uploadedFile) {
                        if (uploadedFile) {
                            userDto = angular.extend({}, userDto, {
                                'picture1': {
                                    '__type': 'File',
                                    'name': uploadedFile.name
                                }
                            });
                        }
                        return parseClientService.put('/users/' + _userId, null, userDto);
                    })
                    .then(function() {
                        // ok, ceci est très laid. Je devrais loader directement en mémoire.
                        // Mais au moins, avec ça je ne risque pas d'oublier un champ...
                        return _service.loadUser();
                    });
            },
            addDog: function(dogDto) {
                var owner = {
                    '__type': 'Pointer',
                    'className': '_User',
                    'objectId': _userId
                };
                dogDto = dogDto ? dogDto : {};
                dogDto.owner = owner;
                return parseClientService.post('/classes/Dog', null, dogDto)
                    .then(function(data) {
                        return data.objectId;
                    });
            },
            getDog: function() {
                return _dog;
            },
            updateDog: function(dogDto) {
                // cf. explication de updateUser
                return $q.when(dogDto.picture1 && dogDto.picture1.size ? parseClientService.uploadFile('picture1', dogDto.picture1) : false)
                    .then(function(uploadedFile) {
                        if (uploadedFile) {
                            dogDto = angular.extend({}, dogDto, {
                                'picture1': {
                                    '__type': 'File',
                                    'name': uploadedFile.name
                                }
                            });
                        }
                        return parseClientService.put('/classes/Dog/' + _dog.id, null, dogDto);
                    });
            },
            deleteDog: function() {
                // cf. le commentaire plus bas : on n'efface rien, on se content d'invalider.

                // console.log('Delete dog if there is one');
                // if (_dog && _dog.objectId) {
                //     return parseClientService.delete('/classes/Dog/' + _dog.objectId);
                // }
                return $q.when();
            },
            /*
            Y a ptet un truc qui m'échappe avec Parse : 
            Un user peut s'effacer lui-même. Personne d'autre ne peut le faire.
            La protection se fait par le token de session de Parse créé au login
            et transmis dans les headers (X-Parse-Session-Token).
            Mais si j'efface le user, je ne peux plus logout.
            Et si je logout avant, je ne peux plus effacer le user !
            Donc, dans l'immédiat, on va simplement marquer le user comme dead,
            faire un reset de ses données et le dé-linker de FB.
            */
            deleteAccount: function() {
                    console.log('userService.deleteAccount()');
                    return _service.deleteDog()
                        .then(function() {
                            console.log('Unlink user from facebook');
                            var randomPassword = '';
                            var length = 32;
                            var charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                            for (var i = 0, n = charset.length; i < length; ++i) {
                                randomPassword += charset.charAt(Math.floor(Math.random() * n));
                            }
                            return parseClientService.put('/users/' + _userId, null, {
                                'deleted': true,
                                'email': _currentUser.email ? 'deleted-' + _currentUser.email : undefined,
                                'username': 'deleted-' + _currentUser.username,
                                'password': randomPassword,
                                'authData': {
                                    'facebook': null
                                }
                            });
                        })
                        .then(function() {
                            _currentUser = {};
                            _userId = {};
                            _dog = {};
                            return authService.signout();
                        });
                }
                // deleteAccount: function() {
                //     return _service.deleteDog()
                //         .then(function() {
                //             return parseClientService.delete('/users/' + _userId);
                //         })
                //         .then(function() {
                //             _currentUser = {};
                //             _userId = {};
                //             _dog = {};
                //             return authService.signout();
                //         });
                // }
                ,
            signout: function() {
                return authService.signout()
                    .then(function() {
                        _userId = undefined;
                        _currentUser = {};
                        _dog = {};
                    });
            }

        };
        return _service;
    }
]);
