angular.module("app")
    .controller("AppCtrl", ["$scope", "$location", "userService", "$window", "waitingService", "completionService", "errorService", "taskService", "authService", "$state", "blockUI",

        function($scope, $location, userService, $window, waitingService, completionService, errorService, taskService, authService, $state, blockUI) {

            console.log('Now executing globalController (AppCtrl)');

            var _vm = this;

            var date = new Date();
            var year = date.getFullYear();

            $scope.main = {
                brand: 'MyDjogg',
                name: '',
            };

            $scope.pageTransitionOpts = [{
                name: 'Fade up',
                'class': 'animate-fade-up'
            }, {
                name: 'Scale up',
                'class': 'ainmate-scale-up'
            }, {
                name: 'Slide in from right',
                'class': 'ainmate-slide-in-right'
            }, {
                name: 'Flip Y',
                'class': 'animate-flip-y'
            }];

            $scope.admin = {
                layout: 'boxed', // 'boxed', 'wide'
                menu: 'horizontal', // 'horizontal', 'vertical', 'collapsed'
                fixedHeader: true, // true, false
                fixedSidebar: true, // true, false
                pageTransition: $scope.pageTransitionOpts[0], // unlimited
                skin: '32' // 11,12,13,14,15,16; 21,22,23,24,25,26; 31,32,33,34,35,36
            };

            $scope.color = {
                primary: '#7992BF',
                success: '#A9DC8E',
                info: '#6BD5C3',
                infoAlt: '#A085E4',
                warning: '#ECD48B',
                danger: '#ED848F',
                gray: '#DCDCDC'
            };

            taskService.setCompletionService(completionService);
            taskService.setErrorService(errorService);
            taskService.setWaitingService(waitingService);

            $scope.isFullScreenPage = function() {
                var path = $location.path();
                var isInSpecificPagesList = _.contains(["/404", "/pages/500", "/signin", "/signup"], path);
                return isInSpecificPagesList;
            };

            /*
            Les méthodes suivantes sont pas top. Elles font partie du cycle d'Angular
            et sont appelées trop souvent.
            */
            _vm.getUser = function() {
                return userService.getCurrentUser();
            };

            _vm.getUserThumbnailUrl = function() {
                var user = userService.getCurrentUser();
                if (user.picture1) {
                    return user.picture1.url;
                }
                return userService.getCurrentUser().picThumbnail;
            };

            _vm.isUserRunner = function() {
                return userService.isRunner();
            };

            _vm.isUserDogger = function() {
                return userService.isDogger();
            };

            _vm.isUserLoggedIn = $scope.isUserLoggedIn = function() {
                var loggedIn = authService.isUserLoggedIn();
                //console.log('isUserLoggedIn : ' + loggedIn);
                return loggedIn;
            };

            _vm.isUserTyped = function() {
                var typed = userService.isRunner() || userService.isDogger();
                //console.log('isUserTyped : ' + typed);
                return typed;
            };

            _vm.isProfileComplete = function() {
                var complete = userService.isProfileComplete();
                //console.log('isProfileComplete : ' + complete);
                return complete;
            };

            _vm.canUseApp = function() {
                var canUse = _vm.isUserLoggedIn() && _vm.isUserTyped(); // && _vm.isProfileComplete();
                //console.log('canUseApp : ' + canUse);
                return canUse;
            };

            _vm.isUserSuperAdmin = function() {
                return true;
            };

            _vm.signout = function() {
                userService.signout()
                    .then(function() {
                        $window.location.href = "/#/signin";
                    });
            };

            $scope.$watch(function() {
                return _vm.isUserLoggedIn() ? userService.getCurrentUser().email : '';
            }, function(newVal, oldVal) {
                if (newVal !== oldVal) {
                    $scope.main.name = userService.getCurrentUser().email;
                }
            });

            /*
    
            NOTE IMPORTANTE : 
            Le code ci-dessous ne devrait pas être là.
            La gestion du routing se fait par ui.router et dans states.js
            Alors qu'est ce que tout ce merdier fait ici ???
            */

            // L'utilisateur peut changer la route à la main dans la barre d'adresse du navigateur.
            // Ca ne provoque pas de reload.
            // On vérifie donc à chaque changement de route qu'il est bien connecté.
            $scope.$on('$locationChangeSuccess', function(event, newLoc, oldLoc) {
                console.log('globalController : $locationChangeSuccess from ' + oldLoc + ' to ' + newLoc);
                if ($scope.isUserLoggedIn() === false &&
                    $location.path() !== '/signup' &&
                    $location.path() !== '/signin' &&
                    $location.path() !== '/fakeUsers' &&
                    $location.path() !== '/search' &&
                    $location.path() !== '/404'
                ) {
                    console.log('Not logged in and not in signin or signup or 404 : goto signin');
                    $location.path('/signin');
                } else {
                    console.log('User logged in or in signin/signout/404, do nothing');
                }
            });

            // $location.path('/signin');
            // return;

            // Est-ce que les tentatives de signin devrait se faire ici ?
            // TODO : session par cookie pour les comptes email/password
            console.log('We are in ' + $location.absUrl());
            console.log('globalController, we try facebook login');
            var _tryToLoginWithFacebook = function() {
                return authService.loginUserWithFacebook()
                    .then(function(success) {
                        if (success) {
                            console.log('Success login with FB, load user and go to next state');
                            return userService.loadAndBranchUser();
                        }
                        console.log('Failed login with FB, go to signin');
                        $location.path('/signin');
                    });
            };
            taskService.do('', _tryToLoginWithFacebook());

        }
    ]);
