angular.module('app.controllers')
    .controller('searchController', ['userService', '$state', '$http', '$scope',
        'taskService', 'sportLevelService', '$anchorScroll', '$location',
        '$modal', 'searchService', 'authService', 'mailService',

        function(userService, $state, $http, $scope,
            taskService, sportLevelService, $anchorScroll, $location,
            $modal, searchService, authService, mailService) {

            console.log("searchController now executed");

            var _vm = this;

            _vm.type = '';
            if (authService.isUserLoggedIn()) {
                console.log('User is logged in');
                if (userService.isRunner()) {
                    console.log('And is looking for a dogger');
                    _vm.type = 'dogger';
                } else {
                    console.log('And is looking for a runner');
                    _vm.type = 'runner';
                }
            }

            _vm.address = '';
            _vm.geoloc = {};
            _vm.sportLevels = sportLevelService.getSportLevels();
            _vm.radius = 1;
            _vm.radiuses = [{
                'label': 'dans un rayon de 100 mètres',
                'value': 0.1
            }, {
                'label': 'dans un rayon de 500 mètres',
                'value': 0.5
            }, {
                'label': 'dans un rayon de 1 km',
                'value': 1
            }, {
                'label': 'dans un rayon de 5 km',
                'value': 5
            }, {
                'label': 'dans un rayon de 10 km',
                'value': 10
            }];
            _vm.results = undefined;
            _vm.selectedUser = 'none';
            $scope.selUser = 'none2';


            var _map;
            var _markers = [];
            var _lastSearchResults = [];

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

            /*
            Quand l'utilisateur valide le champ d'adresse, le résultat est stocké dans
            _vm.address via le ng-model. C'est la string choisie par l'utilisateur et
            ça ne comprend pas les infos de geoloc (l'objet complet retournée par Google).
            Ce watch détermine quand le champ est validé puis va chercher dans les derniers
            résultats trouvés celui qui correspond afin d'avoir toutes les infos de géoloc.
            Question : On ne peut vraiment pas coller un object dans ng-model ?
            Réponse : après un rapide Google, il semble que non. Il faut se cogner une directive.
            */
            $scope.$watch(
                function() {
                    return _vm.address;
                },
                function(newVal, oldVal) {
                    if (newVal) {
                        for (var i = 0; i < _lastSearchResults.length; i++) {
                            if (_lastSearchResults[i].formatted_address == newVal) {
                                _vm.geoloc = {
                                    'latitude': _lastSearchResults[i].geometry.location.lat,
                                    'longitude': _lastSearchResults[i].geometry.location.lng
                                };
                                _updateMap(_vm.geoloc);
                                _vm.search();
                                return;
                            }
                        }
                        console.log('et fuck');
                    }
                });

            var _updateMap = function(pos) {
                var mapOptions = {
                    center: {
                        lat: pos.latitude,
                        lng: pos.longitude,
                    },
                    zoom: 10
                };
                if (!_map) {
                    _map = new google.maps.Map(document.getElementById('search-map-canvas'), mapOptions);
                }
                _map.setOptions(mapOptions);
            };

            // var _attachUserToMarker = function(marker, user) {
            //     var u = user;
            //     google.maps.event.addListener(marker, 'click', function(e) {
            //         _vm.selected = u.objectId;
            //         console.log(_vm.selected);
            //         $scope.sel = user.objectId;
            //         $location.hash(user.objectId);
            //         $anchorScroll();
            //     });
            // };

            _attachUserToMarker = function(marker, userId) {
                google.maps.event.addListener(marker, 'click', function() {
                    _vm.selectedUser = userId;
                    $scope.$apply();
                    $scope.$apply(function() {
                        console.log('anchorScroll to ' + userId);
                        $location.hash(userId);
                        $anchorScroll();
                    });
                });
            };

            _vm.search = function() {
                if (!_vm.type && !userService.isRunner() && !userService.isDogger()) {
                    return;
                }
                if (!_vm.address) {
                    return;
                }
                if (
                    _vm.type == 'runner') {
                    searchPromise = searchService.findRunner(_vm.sportLevel, _vm.geoloc, _vm.radius);
                } else {
                    searchPromise = searchService.findDogger(_vm.sportLevel, null, _vm.geoloc, _vm.radius);
                }
                taskService.do(
                    'Recherche en cours...',
                    searchPromise
                    .then(function(users) {
                        for (var i = 0; i < _markers.length; i++) {
                            _markers[i].setMap(null);
                        }
                        _vm.results = users;
                        for (i = 0; i < users.length; i++) {
                            var user = users[i];
                            users.score = Math.floor(users.score / 200);
                            var marker = new google.maps.Marker({
                                position: new google.maps.LatLng(user.geoloc.latitude, user.geoloc.longitude),
                                map: _map
                            });
                            marker.setClickable(true);
                            marker.setTitle(user.nickName);
                            marker.user = user;
                            _attachUserToMarker(marker, user.objectId);
                            _markers.push(marker);
                        }
                    }));
            };

            _vm.writeTo = function(user) {
                if (!authService.isUserLoggedIn()) {
                    return $state.go('signin');
                }
                modalInstance = $modal.open({
                    templateUrl: "/app/search/mailTo.html",
                    controller: 'mailToController',
                    resolve: {
                        'dstUser': function() {
                            return user;
                        }
                    }
                });
            };

            // _vm.type = 'dogger';
            // _vm.address = 'Rennes';
            // _vm.geoloc = {
            //     latitude: 48.117266,
            //     "longitude": -1.6777926
            // };
            // _vm.search();

        }
    ]);
