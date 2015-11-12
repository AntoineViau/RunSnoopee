function zeroFill(number, width) {
    width -= number.toString().length;
    if (width > 0) {
        return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
    }
    return number + ""; // always return a string
}

angular.module('app.controllers').controller('fakeUsersController', [
    'userService', '$state', '$http', '$scope', '$timeout', 'taskService', 'geocodingService', '$q', 'sportLevelService', 'signupService', 'dogService', 'authService',
    function(userService, $state, $http, $scope, $timeout, taskService, geocodingService, $q, sportLevelService, signupService, dogService, authService) {

        var _vm = this;
        var counter = 0;
        var dogCounter = 0;
        var levelsIds = Object.keys(sportLevelService.getSportLevels());
        var _maxUsers = 50;
        var _nbUsers = 0;

        var _importUser = function(user) {
            var geoloc;
            var emailsDomains = ['gmail.com', 'yahoo.fr', 'hotmail.com', 'hotmail.fr', 'free.fr', 'sfr.fr', 'orange.fr'];
            if (user.email != 'antoine.viau@gmail.com') {
                user.email = user.username.toLowerCase() + '@' + emailsDomains[Math.floor(Math.random() * emailsDomains.length)];
            }
            user.location.street = user.location.street.substr(2);
            user.location.zip = '35000';
            user.location.city = 'Rennes';
            var address = user.location.street + ' ' + user.location.zip + ' ' + user.location.city;
            var userType = ++counter % 2 ? 'dogger' : 'runner';
            var breeds = dogService.getBreeds();
            var sizes = dogService.getSizes();

            return geocodingService.geocode(address)
                .then(function(pos) {
                    geoloc = pos;
                    console.log(pos.latitude + ',' + pos.longitude);
                    return signupService.signupWithEmail(user.email, 'antoine');
                })
                .then(function() {
                    return authService.loginUserWithEmail(user.email, 'antoine');
                })
                .then(function() {
                    userService.setUserId(authService.getLoggedUserId());
                    var userDto = {
                        'deleted': false,
                        'email': user.email,
                        'type': userType,
                        'gender': user.gender,
                        'description': fakeDescriptions[Math.floor(Math.random() * fakeDescriptions.length)],
                        'sportLevel': levelsIds[Math.floor(Math.random() * levelsIds.length)],
                        'score': Math.floor((Math.random() * 3 + 7) * 100),
                        'nickName': user.username,
                        'firstName': user.name.first,
                        'lastName': user.name.last,
                        'address': address,
                        'address1': user.location.street,
                        'zipCode': user.location.zip,
                        'city': user.location.city,
                        'picLarge': user.picture.large,
                        'picMedium': user.picture.medium,
                        'picThumbnail': user.picture.thumbnail,
                        'geoloc': {
                            '__type': 'GeoPoint',
                            'latitude': geoloc.latitude,
                            'longitude': geoloc.longitude
                        }
                    };
                    return userService.updateUser(userDto);
                })
                .then(function() {
                    if (userType == 'dogger') {
                        var dogDto = {
                            name: fakeDogsNames[Math.floor(Math.random() * fakeDogsNames.length)],
                            breed: breeds[Math.floor(Math.random() * breeds.length)],
                            age: Math.floor(Math.random() * 10 + 3),
                            weight: Math.floor(Math.random() * 8 + 2) * 100,
                            size: sizes[Math.floor(Math.random() * sizes.length)].id,
                            description: fakeDescriptions[Math.floor(Math.random() * fakeDescriptions.length)],
                            pic1Url: 'img/dog' + zeroFill(++dogCounter % 15, 3) + '.jpg',
                            'score': Math.floor((Math.random() * 3 + 7) * 100),
                            'sportLevel': levelsIds[Math.floor(Math.random() * levelsIds.length)],
                        };
                        return userService.addDog(dogDto);
                    }
                })
                .then(function() {
                    _nbUsers++;
                })
                .catch(function(error) {
                    console.log("ERROR : " + error);
                });
        };

        var userIndex = 0;
        _vm.importUsers = function() {
            return _importUser(fakeUsers[userIndex].user)
                .then(function() {
                    console.log('User ' + userIndex + ' imported');
                    return $timeout(function() {}, 250);
                })
                .then(function() {
                    userIndex++;
                    if (userIndex < _maxUsers) { //fakeUsers.length) {
                        return _vm.importUsers();
                    } else {
                        console.log('userIndex is ' + userIndex + ' : gameOver');
                    }
                });
        };

        // _vm.createMessages = function() {
        //     for (var i = 0; i < _nbUsers ; i++) {
        //         var nbMessages = 5 + Math.floor(Math.random() * 10);
        //         for (var j = 0; j < nbMessages; j++) {
        //             var randomDst = Math.floor(Math.random() * _nbUsers);
        //             userService.mailTo
        //         }
        //     }
        // };
    }
]);
