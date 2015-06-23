(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', loginController);

  loginController.$inject = ['$http', '$window', '$state', 'UsuarioModel','Notificacao'];

  function loginController($http, $window, $state, UsuarioModel, Notificacao){
    /* jshint validthis: true */
    var vm = this;

    vm.logar  = logar;
    vm.salvarUsuario   = salvarUsuario;

    Notificacao.addEventListener('usuario:create_success', function(event, data) { _create.success(data);  });
    Notificacao.addEventListener('usuario:create_error', function(event, data) { _create.error(data); });

    function logar(usuario){
      $http
        .post('./api/autenticacao', usuario)
        .success(function (data, status, headers, config) {
          $window.localStorage.token = data.token;
          $state.go('app.inicio');
        })
        .error(function (data, status, headers, config) {
          // Erase the token if the user fails to log in
          delete $window.localStorage.token;
        });
    }

    function salvarUsuario(usuario) {
      UsuarioModel.create(usuario);
    }

    var _create = {
      success: function(data) {
        vm.message = 'Usuário criado com sucesso';
        $state.go('login');
      },
      error: function(data) {
        vm.message = data.message;
        console.warn(data);
      }
    };
  }
})();