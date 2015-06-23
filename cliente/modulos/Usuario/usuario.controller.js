(function() {
  'use strict';

  angular
    .module('app.usuario')
    .controller('UsuarioController', usuarioController);

  usuarioController.$inject = ['UsuarioModel','Notificacao', '$state', '$stateParams', '$mdDialog'];

  function usuarioController(UsuarioModel, Notificacao, $state, $stateParams, $mdDialog){
    /* jshint validthis: true */
    var vm = this;

    vm.master   = {};
    vm.usuario  = {};
    vm.message  = '';
    vm.editar   = editar;
    vm.remover  = remover;
    vm.salvar   = salvar;

    init();

    // Event Listener
    Notificacao.addEventListener('usuario:find_all_success', function(event, data) { _findAll.success(data);  });
    Notificacao.addEventListener('usuario:find_all_error', function(event, data) { _findAll.error(data); });
    Notificacao.addEventListener('usuario:find_success', function(event, data) { _find.success(data);  });
    Notificacao.addEventListener('usuario:find_error', function(event, data) { _find.error(data); });
    Notificacao.addEventListener('usuario:create_success', function(event, data) { _create.success(data);  });
    Notificacao.addEventListener('usuario:create_error', function(event, data) { _create.error(data); });
    Notificacao.addEventListener('usuario:update_success', function(event, data) { _update.success(data);  });
    Notificacao.addEventListener('usuario:update_error', function(event, data) { _update.error(data); });
    Notificacao.addEventListener('usuario:remove_success', function(event, data) { _remove.success(data);  });
    Notificacao.addEventListener('usuario:remove_error', function(event, data) { _remove.error(data); });

    // Event destroy
    Notificacao.removeEventListener('usuario:find_all_success', function(event, data) { _findAll.success(data);  });
    Notificacao.removeEventListener('usuario:find_all_error', function(event, data) { _findAll.error(data); });
    Notificacao.removeEventListener('usuario:find_success', function(event, data) { _find.success(data);  });
    Notificacao.removeEventListener('usuario:find_error', function(event, data) { _find.error(data); });
    Notificacao.removeEventListener('usuario:create_success', function(event, data) { _create.success(data);  });
    Notificacao.removeEventListener('usuario:create_error', function(event, data) { _create.error(data); });
    Notificacao.removeEventListener('usuario:update_success', function(event, data) { _update.success(data);  });
    Notificacao.removeEventListener('usuario:update_error', function(event, data) { _update.error(data); });
    Notificacao.removeEventListener('usuario:remove_success', function(event, data) { _remove.success(data);  });
    Notificacao.removeEventListener('usuario:remove_error', function(event, data) { _remove.error(data); });

    function init(){
      var id = $stateParams.idUsuario;
      if(id) {
        UsuarioModel.find(id);
      } else {
        UsuarioModel.findAll();
      }
    }

    function editar(usuario) {
      delete usuario.pass;
      vm.usuario = angular.copy(usuario);
    }

    function remover(usuario, evento) {
//      if (confirm('Tem certeza que deseja remover o usuário '+usuario.name+'?')) {
//        UsuarioModel.remove(usuario.id);
//      }
      var confirm = $mdDialog.confirm()
        .title('Tem certeza que deseja excluir o usuario '+ usuario.nome +'?')
        .content('Esta operaca nao pode ser revertida!')
        .ariaLabel('Confirmar exclusao')
        .ok('Confirmar')
        .cancel('Cancelar')
        .targetEvent(evento);
      $mdDialog.show(confirm).then(function() {
        UsuarioModel.remove(usuario._id);
      }, function() {

      });
    }

    function salvar(usuario) {
      vm.master = angular.copy(usuario);
      if (vm.master.hasOwnProperty('_id')) {
        UsuarioModel.update(vm.master);
      } else {
        UsuarioModel.create(vm.master);
      }
    }

    // Event listener functions
    var _findAll = {
      success: function(data) {
        vm.usuarios = data;
      },
      error: function(data) {
        console.warn(data);
      }
    };

    var _find = {
      success: function(data) {
        vm.usuario = data;
      },
      error: function(data) {
        console.warn(data);
      }
    };

    var _create = {
      success: function(data) {
        vm.message = 'Usuário criado com sucesso';
        vm.usuarios.push(data);
        $state.go('app.usuario');
      },
      error: function(data) {
        //console.warn(data);
      }
    };

    var _update = {
      success: function(data) {
        vm.message = 'Usuário alterado com sucesso';
        UsuarioModel.findAll();
        vm.usuario = {};
        $state.go('app.usuario');
      },
      error: function(data) {
        vm.message = data.message;
        console.warn(data);
      }
    };

    var _remove = {
      success: function(data) {
        vm.message = 'Usuário deletado com sucesso';
        UsuarioModel.findAll();
      },
      error: function(data) {
        vm.message = data.message;
        console.warn(data);
      }
    };
  }
})();