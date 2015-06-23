(function () {
    define([
    ], function () {
        function TranslateManager($translateProvider) {
            $translateProvider.useStaticFilesLoader({
                prefix: '/cliente/base/babel/i18n/languages/',
                suffix: '.json'
            });
            var language = navigator.language;
            $translateProvider.preferredLanguage(language);
        }
        return ['$translateProvider', TranslateManager];
    });

})();