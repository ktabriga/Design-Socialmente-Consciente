(function(){
  'use strict';

  angular
    .module('app')
    .config(configuracoes);

  configuracoes.$inject = ['$locationProvider', '$ocLazyLoadProvider', '$provide', '$mdThemingProvider', '$httpProvider'];

  function configuracoes($locationProvider, $ocLazyLoadProvider, $provide, $mdThemingProvider, $httpProvider){
    $locationProvider.html5Mode(true);

    // LAZY MODULES
    // -----------------------------------

    var modulos = [
      { name: 'app.usuario' , files: ['build/Usuario.min.js'] },
      { name: 'app.problema' , files: ['build/Problema.min.js'] }
    ];

    var scripts = [];

    var appConfig = {
      modulos: modulos,
      scripts: scripts
    };
    $provide.constant('APP_CONFIG', appConfig);

    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: modulos
    });

    $mdThemingProvider.theme('default')
      .primaryPalette('teal')
      .accentPalette('indigo');

    $httpProvider.interceptors.push("Interceptador");
  }
})();