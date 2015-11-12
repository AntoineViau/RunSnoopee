angular.module('app').factory('searchService', ['parseClientService',
    function(parseClientService) {

        var _service = {};
        _service = {
            findRunner: function(sportLevel, pos, radius) {
                var where = {
                    'deleted': false,
                    'type': 'runner',
                    'geoloc': {
                        '$maxDistanceInMiles': radius / 1.6,
                        '$nearSphere': {
                            '__type': 'GeoPoint',
                            'latitude': pos.latitude,
                            'longitude': pos.longitude
                        }
                    }
                };
                if (sportLevel) {
                    where.sportLevel = sportLevel;
                }
                return parseClientService.get('/users', {
                    'limit': 10,
                    'where': where
                });
            },
            findDogger: function(sportLevel, size, pos, radius) {
                var where = {};
                if (sportLevel) {
                    where.sportLevel = sportLevel;
                }
                if (size) {
                    where.size = size;
                }
                where.owner = {
                    '$inQuery': {
                        'where': {
                            'deleted': false,
                            'type': 'dogger',
                            'geoloc': {
                                '$maxDistanceInMiles': radius / 1.6,
                                '$nearSphere': {
                                    '__type': 'GeoPoint',
                                    'latitude': pos.latitude,
                                    'longitude': pos.longitude
                                }
                            }
                        },
                        'className': '_User'
                    }
                };
                return parseClientService.get('/classes/Dog', {
                        'limit': 10,
                        'where': where,
                        'include': 'owner'
                    })
                    .then(function(dogs) {
                        var users = [];
                        for (var i = 0; i < dogs.length; i++) {
                            var dog = dogs[i];
                            var user = dog.owner;
                            user.dog = dog;
                            users.push(user);
                        }
                        return users;

                    });
            }
        };
        return _service;
    }
]);
