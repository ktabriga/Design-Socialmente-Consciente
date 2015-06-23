(function () {
    define([
        'angular',
        'base/babel/TranslationController',
        'base/babel/TranslationService',
        'angular-resource'
    ], function (angular, TranslationController, TranslationService) {
        var moduleName = 'babel',
            dependencies = [
                'ngResource'
            ];

        angular.module(moduleName,dependencies)
            .controller('TranslationController', TranslationController)
            .service('TranslationService', TranslationService);

        return moduleName;
    });
})();