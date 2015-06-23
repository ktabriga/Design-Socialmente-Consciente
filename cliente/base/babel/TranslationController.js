/**
 * Created by JOSEVALDERLEI on 26/09/2014.
 */
(function () {
    'use strict';

    define([

    ], function () {

        function TranslationController($scope, translationService){
            this.$scope = $scope;
            this.translationService = translationService;
            this.iniciar();
        }

        TranslationController.prototype = {

            iniciar: function () {

                var self = this;

                self.selectedLanguage = navigator.language;

                this.$scope.$watch('ctrlT.selectedLanguage', function (val) {
                    self.translationService.translate(val)
                        .success(function (data) {
                            console.log(data);
                            self.translation = data;
                    });

                });
            }
        };
        return ['$scope', 'TranslationService', TranslationController];
    });
})();


