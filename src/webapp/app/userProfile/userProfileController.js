angular.module('app.controllers')
    .controller('userProfileController', ['taskService', 'userService', '$state', 'dogService', '$scope', '$http', 'sportLevelService',
        function(taskService, userService, $state, dogService, $scope, $http, sportLevelService) {

            console.log('Entering userProfileController');

            var _vm = this;
            _vm.user = userService.getCurrentUser();

            _vm.sportLevels = sportLevelService.getSportLevels();

            var _lastSearchResults = [];

            _vm.dog = userService.getDog();
            _vm.sizes = dogService.getSizes();
            _vm.breeds = dogService.getBreeds();
            _vm.ages = [];
            for (var age = 2; age < 20; age++) {
                this.ages.push({
                    value: age,
                    label: age + ' ans'
                });
            }

            var _map;

            _vm.getAddress = function(val) {
                if (val.length < 3) {
                    return {};
                }
                return $http.get('http://maps.googleapis.com/maps/api/geocode/json?components=country:FR', {
                    params: {
                        address: val + ', France',
                        sensor: false
                    }
                }).then(function(response) {
                    _lastSearchResults = response.data.results;
                    return _lastSearchResults;
                });
            };

            $scope.$watch(
                function() {
                    return _vm.user.address;
                },
                function(newVal, oldVal) {
                    if (newVal && _lastSearchResults.length > 0) {
                        for (var i = 0; i < _lastSearchResults.length; i++) {
                            if (_lastSearchResults[i].formatted_address == newVal) {
                                _vm.user.geoloc = {
                                    '__type': 'GeoPoint',
                                    'latitude': _lastSearchResults[i].geometry.location.lat,
                                    'longitude': _lastSearchResults[i].geometry.location.lng
                                };
                                _updateMap(_vm.user.geoloc);
                                return;
                            }
                        }
                    }
                });

            var _updateMap = function(pos) {
                var mapOptions = {
                    center: {
                        lat: pos.latitude,
                        lng: pos.longitude,
                    },
                    zoom: 16
                };
                if (!_map) {
                    _map = new google.maps.Map(document.getElementById('userprofile-map-canvas'), mapOptions);
                }
                _map.setOptions(mapOptions);
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(pos.latitude, pos.longitude),
                    map: _map,
                    title: 'Vous êtes ici !'
                });
            };

            var _save = function() {
                return userService.updateUser(_vm.user)
                    .then(function() {
                        return userService.updateDog(_vm.dog);
                    })
                    .then(function() {
                        return userService.loadUser();
                    })
                    .then(function() {
                        _vm.user = userService.getCurrentUser();
                        _vm.dog = userService.getDog();
                    });
            };

            _vm.save = function() {
                taskService.do('Sauvegarde en cours', _save(), 'Votre profil a bien été mis à jour')
                    .catch(function(error) {
                        alert('Une erreur est survenue : ' + error);
                    });
            };

            _vm.deleteAccount = function() {
                if (!confirm("Etes-vous certain de vouloir effacer votre compte ?")) {
                    return;
                }
                userService.deleteAccount()
                    .then(function() {
                        $state.go('signin');
                    });
            };

            if (_vm.user.geoloc) {
                _updateMap(_vm.user.geoloc);
            }


        }

    ]);
