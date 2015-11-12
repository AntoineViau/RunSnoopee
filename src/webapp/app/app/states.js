/*

Ci-dessous un workaround pas beau pour éviter ce qui semble être un bug de ui.router.
Solutions potentielles ici : 
http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
Notamment les propositions de MK Safi, via le resolve et $q.reject à explorer.

On notera au passage une incohérence sur la gestion des routes : l'essentiel est fait ici
et j'ai un bout dans le globalController ! 

*/
var _checkLoggedUser = function(userService, $state) {
    console.log('Check if user is logged before entering next state');
    if (!userService.getCurrentUser()) {
        console.log('No user logged');
        $timeout(function() { // workaround immonde, mais rien de mieux pour le moment
            $state.go('signin');
        }, 500);
        return false;
    }
    console.log('User is logged');
    return true;
};

var _checkTyped = function(userService, $state, $timeout) {

    if (!userService.isRunner() && !userService.isDogger()) {
        console.log('Type is unknown : go to selectType');
        $timeout(function() { // workaround immonde, mais rien de mieux pour le moment
            $state.go('selectType');
        }, 500);
        return false;
    }
};

var _checkProfileComplete = function(userService, $state, $timeout) {
    console.log('Check if user is logged AND profile is complete');
    if (!_checkLoggedUser(userService, $state)) {
        return false;
    }
    if (!_checkTyped(userService, $state, $timeout)) {
        return false;
    }
    console.log('User is typed');
    if (!userService.isProfileComplete()) {
        console.log('User profile is NOT complete, goto to userProfile page');
        $timeout(function() { // workaround immonde, mais rien de mieux pour le moment
            $state.go('userProfile');
        }, 500);
        return false;
    }
    console.log('User profile is complete');
    return true;
};

angular.module('app')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider

        // Doit surement y avoir moyen de faire mieux que ça
        // sur la gestion de l'url root (/ ou vide)
            .state('home1', {
                url: '^', // www.app.com/ et www.app.com 
                templateUrl: 'app/signin/signin.html',
            })
            .state('home2', {
                url: '/', // www.app.com/#/
                templateUrl: 'app/signin/signin.html',
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/signin/signin.html',
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/signup/signup.html',
            })
            .state('404', {
                url: '/404',
                templateUrl: 'app/404/404.html',
            })
            .state('fakeUsers', {
                url: '/fakeUsers',
                templateUrl: 'app/fakeUsers/fakeUsers.html',
            })
            .state('selectType', {
                url: '/selectType',
                templateUrl: 'app/selectType/selectType.html',
                onEnter: ['userService', '$state', _checkLoggedUser]
            })
            .state('userProfile', {
                url: '/userProfile',
                templateUrl: 'app/userProfile/userProfile.html',
                onEnter: ['userService', '$state', _checkLoggedUser],
            })
            .state('search', {
                url: '/search',
                templateUrl: 'app/search/search.html',
                onEnter: ['userService', '$state', '$timeout', _checkTyped]
            })
            .state('mails', {
                url: '/mails',
                templateUrl: 'app/mails/mails.html',
                onEnter: ['userService', '$state', '$timeout', _checkProfileComplete]
            });
        $urlRouterProvider.otherwise('/404');
    }]);
