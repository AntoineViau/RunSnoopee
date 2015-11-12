angular.module('app')
    .factory('geocodingService', ['$q', '$http', function($q, $http) {

        var _appId = '/* @echo GEOCODER_APPID */';
        var _addCode = '/* @echo GEOCODER_APPCODE */';

        var _service = {
            geocode: function(address) {
                var deferred = $q.defer();
                $http.get(
                        'http://geocoder.cit.api.here.com/6.2/geocode.xml?' +
                        'searchtext=' + address +
                        '&gen=8&app_id=' + _appId + '&app_code=' + _addCode
                    )
                    .success(function(data, status, headers, config) {
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json(data);
                        var pos = {};
                        if (!json.Search.Response.View ||
                            !json.Search.Response.View.Result ||
                            !json.Search.Response.View.Result.Location ||
                            !json.Search.Response.View.Result.Location.DisplayPosition) {
                            return deferred.reject('Invalid address : ' + address);
                        }
                        pos.latitude = parseFloat(json.Search.Response.View.Result.Location.DisplayPosition.Latitude);
                        pos.longitude = parseFloat(json.Search.Response.View.Result.Location.DisplayPosition.Longitude);
                        return deferred.resolve(pos);
                    })
                    .error(function(data, status, headers, config) {
                        var error = {};
                        error.data = data;
                        error.status = status;
                        console.log(error);
                        return deferred.reject(error);

                    });
                return deferred.promise;
            }
        };
        return _service;
    }]);
