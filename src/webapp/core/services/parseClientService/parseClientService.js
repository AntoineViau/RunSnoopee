angular.module('app').factory('parseClientService', ['$q', '$http', '$location',
    function($q, $http, $location) {

        var _appId = 'a3mEz8LujLxN8cFKeylhlfWPC7Mti7avEA4bMvLz';
        var _restKey = 'OAIyusJgkPumuvC2ykTZcgKkqdu5yrVn6PuPCWYa';
        var _sessionToken = '';
        var _headers = {
            "X-Parse-Application-Id": _appId,
            "X-Parse-REST-API-Key": _restKey
        };

        var _parseUrl = 'https://api.parse.com/1';

        var _promiser = function(method, url, urlParamsAsJson, payloadAsJson, headers) {
            console.log('Doing a ' + method + ' ' + url + ' ' + JSON.stringify(urlParamsAsJson));
            var deferred = $q.defer();
            /*
            Les joies des paramètres Parse en url : 
            je veux garder une certaine cohérence dans les paramètres passés à l'API REST.
            Donc, pas d'url encoding d'un côté et du json de l'autre. C'est pour cela que
            cette fonction a urlParamsAsJson et payloadAsJson.
            Mais pour convertir mon urlParamsAsJson vers un format d'url, il faut décomposer
            selon que l'on a un type primitif ou objet. Ce qui est attendu par Parse est
            quelque chose du genre : ?where={"name": "antoine", age:25}
            ou encore : ?email="toto@titi.com"&password="coucou"
            */
            var urlParams = {};
            for (var key in urlParamsAsJson) {
                if (typeof urlParamsAsJson[key] === 'object') {
                    urlParams[key] = JSON.stringify(urlParamsAsJson[key]);
                } else {
                    urlParams[key] = urlParamsAsJson[key];
                }
            }
            $http({
                    method: method,
                    url: _parseUrl + url,
                    headers: angular.extend({}, _headers, headers),
                    params: urlParams,
                    data: payloadAsJson
                })
                .success(function(data, status, headers, config) {
                    if (typeof data.results !== 'undefined') {
                        return deferred.resolve(data.results);
                    }
                    if (typeof data.result !== 'undefined') {
                        return deferred.resolve(data.result);
                    }
                    return deferred.resolve(data);
                })
                .error(function(data, status, headers, config) {
                    var error = '';
                    if (data) {
                        error = typeof data.error !== 'undefined' ? data.error : data;
                    }
                    return deferred.reject({
                        'message': error,
                        'statusCode': status
                    });
                });
            return deferred.promise;
        };

        var _service = {
            setSessionToken: function(token) {
                _sessionToken = token;
                if (_sessionToken) {
                    _headers['X-Parse-Session-Token'] = _sessionToken;
                } else {
                    delete _headers['X-Parse-Session-Token'];
                }
            },
            get: function(url, urlParamsAsJson, payloadAsJson) {
                return _promiser('GET', url, urlParamsAsJson, payloadAsJson);
            },
            post: function(url, urlParamsAsJson, payloadAsJson, headers) {
                return _promiser('POST', url, urlParamsAsJson, payloadAsJson, headers);
            },
            put: function(url, urlParamsAsJson, payloadAsJson) {
                return _promiser('PUT', url, urlParamsAsJson, payloadAsJson);
            },
            delete: function(url, urlParamsAsJson, payloadAsJson) {
                return _promiser('DELETE', url, urlParamsAsJson, payloadAsJson);
            },
            uploadFile: function(fileName, file, contentType) {
                return _promiser('POST', '/files/' + fileName, null, file, {
                    'Content-Type': contentType || file.type
                });
            },
            uploadFiles: function(filesToUpload) {
                var promises = {};
                for (var fileId in filesToUpload) {
                    promises[fileId] = _service.uploadFile(
                        filesToUpload[fileId].fileName,
                        filesToUpload[fileId].file,
                        filesToUpload[fileId].contentType);
                }
                return $q.all(promises);
            }
        };

        return _service;

    }
]);
