(function(){
  'use strict';

  angular
    .module('app.diretivas')
    .directive('compare', compare);

  function compare() {
    var diretiva = {
      restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
        element.bind('blur', function (e) {
          if (!ngModel || !element.val()) {
            return;
          }
          var first = attrs.comparePass;
          var value = element.val();

          if (first == value) {
            ngModel.$setValidity('compare', true);
          } else {
            ngModel.$setValidity('compare', false);
            console.log(ngModel);
          }
        });
      }
    };

    return diretiva;
  }
})();