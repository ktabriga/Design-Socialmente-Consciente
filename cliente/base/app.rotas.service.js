(function() {
  'use strict';

  angular
    .module('app')
    .service('RotasService', rotasService);

  rotasService.$inject = ['$ocLazyLoad','$q', 'APP_CONFIG'];

  function rotasService($ocLL, $q, appConfig) {

    var modulos = appConfig.modulos;
    var scripts = appConfig.scripts;

    var service = {
      load  : load
    };

    return service;
    /////////////////

    function load(_args) {
      var promise = $q.when(1); // empty promise
      for(var i=0, len=_args.length; i < len; i ++){
        promise = andThen(_args[i]);
      }
      return promise;

      // creates promise to chain dynamically
      function andThen(_arg) {
        // also support a function that returns a promise
        if(typeof _arg == 'function'){
          return promise.then(_arg);
        }
        else {
          return promise.then(function() {
            // if is a module, pass the name. If not, pass the array
            var whatToLoad = getRequired(_arg);
            // simple error check
            if(!whatToLoad) {
              return $.error('Route resolve: Bad resource name [' + _arg + ']');
            }
            // finally, return a promise
            return $ocLL.load( whatToLoad );
          });
        }
      }
      // check and returns required data
      // analyze module items with the form [name: '', files: []]
      // and also simple array of script files (for not angular js)
      function getRequired(name) {
        if (modulos){
          for(var m in modulos){
            if(modulos[m].name && modulos[m].name === name){
              return modulos[m];
            }
          }
        }
        return scripts && scripts[name];
      }
    }
  }
})();
