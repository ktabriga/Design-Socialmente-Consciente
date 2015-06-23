(function(){
  'use strict';

  angular
    .module('app')
    .config(rotas);

  rotas.$inject = ['$urlRouterProvider', '$stateProvider'];

  function rotas($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise("/inicio");
    $stateProvider
      .state('app', {
        url: "/",
        abstract: true,
        controller: 'AppController',
        controllerAs: 'vm',
        templateUrl: basepath("principal"),
        resolve: autenticar()
      })
      .state('app.inicio', {
        url: "inicio",
        template: '<h1>Inicio</h1>'
      })
      .state('login', {
        url: "/login",
        templateUrl: basepath("login"),
        controller: 'LoginController',
        controllerAs: 'vm',
        resolve: lazyLoad('app.usuario')
      })
      .state('registrar', {
        url: "/registrar",
        templateUrl: basepath("registrar"),
        controller: 'LoginController',
        controllerAs: 'vm',
        resolve: lazyLoad('app.usuario')
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

  function autenticar() {
    return {
      autenticar: ['$window', '$location', function($window, $location) {
        if (!$window.localStorage.token) {
          $location.path('/login');
        }
      }]
    };
  }
})();