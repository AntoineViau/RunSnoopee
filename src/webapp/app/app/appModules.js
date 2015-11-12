angular.module("tasking", []);

angular.module('app.controllers', []);

angular.module('app.services', []);

angular.module('app', ['ui.router', 'flatboard', 'app.controllers', 'app.services', 'tasking', 'blockUI', 'toaster']);


// http://www.arnaldocapo.com/blog/post/google-analytics-and-angularjs-with-ui-router/72
angular.module('app')
    .run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
        if ($location.absUrl().indexOf('localhost') !== -1) {
            return;
        }
        $rootScope
            .$on('$stateChangeSuccess',
                function(event) {
                    if (!$window.ga)
                        return;
                    var path = $location.path();
                    console.log('Fire google analytics with : ' + path);
                    $window.ga('send', 'pageview', {
                        page: path
                    });
                });
    }]);

// angular.module('app')
//     .config(function(blockUIConfig) {
//         blockUIConfig.message = 'Chargement en cours...';
//         blockUIConfig.autoBlock = false;
//     });

// A ranger ailleurs bordel !
angular.module('app')
    .directive('fileModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;
                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])

.service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {
                'X-Parse-Application-Id': '/* @echo PARSE_APPID */',
                'X-Parse-REST-API-Key': '/* @echo PARSE_RESTAPIKEY */',
                'Content-Type': undefined
            }
        });
    };
}]);
