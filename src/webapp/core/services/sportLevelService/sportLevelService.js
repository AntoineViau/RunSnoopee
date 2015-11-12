angular.module('app').factory('sportLevelService', ['parseClientService', '$q',
    function(parseClientService, $q, breedService) {

        var _levels = {
            '100-balade': {
                'id': '100-balade',
                'label': 'Pour des balades'
            },
            '200-debutant': {
                'id': '200-debutant',
                'label': 'Pour commencer à courir (débutant)'
            },
            '300-occasionnel': {
                'id': '300-occasionnel',
                'label': 'Coureur occasionnel'
            },
            '400-regulier': {
                'id': '400-regulier',
                'label': 'Coureur régulier'
            },
            '500-marathonien': {
                'id': '500-marathonien',
                'label': 'Marathonien'
            }
        };

        var _service = {};
        _service = {
            getSportLevels: function() {
                return _levels;
            }
        };
        return _service;
    }
]);
