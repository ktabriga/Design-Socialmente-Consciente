(function(){
  'use strict';

  angular
    .module('app.problema')
    .config(rotas);

  rotas.$inject = ['$urlRouterProvider', '$stateProvider'];

  function rotas($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('app.problema', {
        url: "problema",
        views: {
          conteudo: {
            templateUrl: basepath("problema/listar"),
            controller: 'ProblemaController',
            controllerAs: 'vm',
            resolve: lazyLoad('app.problema')
          }
        }
      })
      .state('app.problemaCadastrar', {
        url: "problema/cadastrar",
        views: {
          conteudo: {
            templateUrl: basepath("problema/form"),
            controller: 'ProblemaController',
            controllerAs: 'vm',
            resolve: lazyLoad('app.problema')
          }
        }
      })
      .state('app.problemaEditar', {
        url: "problema/editar/:idProblema",
        views: {
          conteudo: {
            templateUrl: basepath("problema/form"),
            controller: 'ProblemaController',
            controllerAs: 'vm',
            resolve: lazyLoad('app.problema')
          }
        }
      });
  }

  function basepath(uri) {
    return '/api/templates/' + uri;
  }

  function lazyLoad() {
    var _args = arguments;
    return {
      lazyLoad: ['RotasService', function (RotasService) {
        return RotasService.load(_args);
      }]
    };
  }

})();
