(function(){
  'use strict';

  angular
    .module('app.usuario')
    .config(rotas);

  rotas.$inject = ['$urlRouterProvider', '$stateProvider'];

  function rotas($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('app.usuario', {
        url: "usuario",
        views: {
          conteudo: {
            templateUrl: basepath("usuario/listar"),
            controller: 'UsuarioController',
            controllerAs: 'vm',
            resolve: lazyLoad('app.usuario')
          }
        }
      })
      .state('app.usuarioCadastrar', {
        url: "usuario/cadastrar",
        views: {
          conteudo: {
            templateUrl: basepath("usuario/form"),
            controller: 'UsuarioController',
            controllerAs: 'vm',
            resolve: lazyLoad('app.usuario')
          }
        }
      })
      .state('app.usuarioEditar', {
        url: "usuario/editar/:idUsuario",
        views: {
          conteudo: {
            templateUrl: basepath("usuario/form"),
            controller: 'UsuarioController',
            controllerAs: 'vm',
            resolve: lazyLoad('app.usuario')
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
