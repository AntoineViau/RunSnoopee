angular.module('app').factory('facebookService', ['$q', '$window', 'parseClientService', '$timeout',
    function($q, $window, parseClientService, $timeout) {
        var _FB;

        var _service = {};
        _service = {
            loadFacebook: function() {
                if (_FB) {
                    // Lazy loading est mon ami
                    return $q.when(_FB);
                }
                console.log('loadFacebook()');
                var promiseManager = $q.defer(); 
                $window.fbAsyncInit = function() {
                    _FB = FB;
                    FB.init({
                        appId: '/* @echo FACEBOOK_APPID */',
                        // channelUrl: 'app/channel.html', doit contenir <script src="http://connect.facebook.net/en_US/all.js"></script>
                        status: true,
                        cookie: true,
                        xfbml: true,
                        version: 'v2.3'
                    });
                    console.log('Facebook initialized');
                    promiseManager.resolve(_FB);
                };

                /*
                CECI EST ABSOLUMENT IMMONDE !
                J'ai une collision entre blockUI et le loader asynchrone de FB.
                Je soupçonne l'insertion dans le DOM par FB d'envoyer blockUI
                dans les choux.
                */
                $timeout(function() {
                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {
                            return;
                        }
                        js = d.createElement(s);
                        js.id = id;
                        js.src = "//connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                }, 1000);
                return promiseManager.promise;
            }
        };
        return _service;
    }
]);
