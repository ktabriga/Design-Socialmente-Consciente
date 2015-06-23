/**
 * Created by JOSEVALDERLEI on 26/09/2014.
 */
(function () {

    define([

    ], function () {
        function TranslationService($http) {
            this.translate = function (language) {
                console.log(language);
                var languageFilePath = './babel/translation_' + language + '.json';
                console.log(languageFilePath);
                return $http({
                    method: 'GET',
                    url : languageFilePath
                });
            };
        }

        return ['$http', TranslationService];

    });
})();
