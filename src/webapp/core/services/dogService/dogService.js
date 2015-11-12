angular.module('app').factory('dogService', ['parseClientService', '$q', 'breedService',
    function(parseClientService, $q, breedService) {

        var _sizes = [{
            'id': '100-xs',
            'label': 'XS'
        }, {
            'id': '200-s',
            'label': 'S'
        }, {
            'id': '300-m',
            'label': 'M'
        }, {
            'id': '400-l',
            'label': 'L'
        }, {
            'id': '500-xl',
            'label': 'XL'
        }];

        var _service = {};
        _service = {
            getBreeds: function() {
                return breedService.getBreeds();
            },
            getSizes: function() {
                return _sizes;
            }
        };
        return _service;
    }
]);
