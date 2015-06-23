(function() {
  'use strict';

  angular
    .module('app')
    .controller('AppController', appController);

  appController.$inject = ['$mdSidenav'];

  function appController($mdSidenav){
    /* jshint validthis: true */
    var vm = this;

    vm.mostrarMenu = mostrarMenu;

    function mostrarMenu(){
      $mdSidenav('menuPrincipal')
        .toggle()
        .then(function(){

        });
    }
  }
})();