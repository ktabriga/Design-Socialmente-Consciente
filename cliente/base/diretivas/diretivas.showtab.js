(function() {
  'use strict';

  angular
    .module('app.diretivas')
    .directive('showtab', showtab);

  function showtab() {
    var diretiva = {
      link: function (scope, element, attrs) {
        //$(element).tab('show');
        element.click(function(e) {
          e.preventDefault();
          $(element).tab('show');
        });
      }
    };

    return diretiva;
  }
})();