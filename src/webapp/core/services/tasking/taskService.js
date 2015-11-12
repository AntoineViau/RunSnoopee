/**
 * taskService a pour rôle d'encapsuler l'appel d'une Promise pour y intégrer des fonctionnalités connexes : 
 *  - gestion des erreurs par la fourniture d'un service d'erreurs
 *  - gestion de l'attente de la Promise par la fourniture d'un service d'attente
 */
angular.module("tasking").factory("taskService", ["$q", function($q) {

    var _waitingService = null;
    var _completionService = null;
    var _errorService = null;

    var taskService = {};

    taskService.setWaitingService = function(waitingService) {
        _waitingService = waitingService;
    };

    taskService.setCompletionService = function(completionService) {
        _completionService = completionService;
    };

    taskService.setErrorService = function(errorService) {
        _errorService = errorService;
    };


    /**
     * executePromise encapsule et appelle la Promise passée en paramètre après avoir remis à zéro
     * le service d'erreurs (optionnel) et initialisé le service d'attente (avec le texte passé en paramètre).
     * Quand la Promise est résolue ou rejetée, ces services sont appelés pour conclure l'opération.
     * La Promise est encapsulée dans une Promise pour permettre l'appelant de chaîner.
     */
    taskService.do = function(waitingText, promise, completionText) {
        //console.log("executePromise : " + waitingText);
        var taskPromiseManager = $q.defer();
        if (_errorService !== null) {
            _errorService.reset();
        }
        if (_waitingService !== null) {
            _waitingService.start(waitingText);
        }
        // On n'exécute pas la promise à proprement parler.
        // On lui ajoute une étape après son exécution.
        promise
        // point faible ici sur function(data) ?
        // Que se passe-t'il si le code asynchrone se conclue par un appel d'une callback avec plusieurs arguments ?
        // ie. promiseManager.resolve(something, somethingElse)
        // Réponse : on ne peut rien y faire a priori.
            .then(
            // Callback de succès
            function(data) {
                if (_waitingService !== null) {
                    _waitingService.stop();
                }
                if (_completionService && completionText) {
                    // Petit problème ici : toaster.clear() atteint tous les toasters.
                    // On ne peut pas clear() un toaster en particulier.
                    // Le toaster de completion apparaît bien, mais disparaît aussitôt.
                    // Comme c'est une disparition en fondu, on a le temps de le voir.
                    _completionService.pushCompletionMessage(completionText);
                }
                return taskPromiseManager.resolve(data);
            },
            // Callback d'erreur de la promise
            function(errorMessage) {
                if (_waitingService !== null) {
                    _waitingService.stop();
                }
                if (_errorService !== null) {
                    _errorService.pushErrorMessage(errorMessage);
                }
                return taskPromiseManager.reject(errorMessage);
            }
        );
        return taskPromiseManager.promise;
    };
    return taskService;
}]);
