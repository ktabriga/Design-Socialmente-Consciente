(function() {
  'use strict';

  angular
    .module('app.problema')
    .controller('ProblemaController', problemaController);

  problemaController.$inject = ['ProblemaModel','Notificacao', '$state', '$stateParams', '$mdDialog'];

  function problemaController(ProblemaModel, Notificacao, $state, $stateParams, $mdDialog){
    /* jshint validthis: true */
    var vm = this;

    vm.master   = {};
    vm.problema  = {};
    vm.message  = '';
    vm.editar   = editar;
    vm.remover  = remover;
    vm.salvar   = salvar;

    init();

    // Event Listener
    Notificacao.addEventListener('problema:find_all_success', function(event, data) { _findAll.success(data);  });
    Notificacao.addEventListener('problema:find_all_error', function(event, data) { _findAll.error(data); });
    Notificacao.addEventListener('problema:find_success', function(event, data) { _find.success(data);  });
    Notificacao.addEventListener('problema:find_error', function(event, data) { _find.error(data); });
    Notificacao.addEventListener('problema:create_success', function(event, data) { _create.success(data);  });
    Notificacao.addEventListener('problema:create_error', function(event, data) { _create.error(data); });
    Notificacao.addEventListener('problema:update_success', function(event, data) { _update.success(data);  });
    Notificacao.addEventListener('problema:update_error', function(event, data) { _update.error(data); });
    Notificacao.addEventListener('problema:remove_success', function(event, data) { _remove.success(data);  });
    Notificacao.addEventListener('problema:remove_error', function(event, data) { _remove.error(data); });

    // Event destroy
    Notificacao.removeEventListener('problema:find_all_success', function(event, data) { _findAll.success(data);  });
    Notificacao.removeEventListener('problema:find_all_error', function(event, data) { _findAll.error(data); });
    Notificacao.removeEventListener('problema:find_success', function(event, data) { _find.success(data);  });
    Notificacao.removeEventListener('problema:find_error', function(event, data) { _find.error(data); });
    Notificacao.removeEventListener('problema:create_success', function(event, data) { _create.success(data);  });
    Notificacao.removeEventListener('problema:create_error', function(event, data) { _create.error(data); });
    Notificacao.removeEventListener('problema:update_success', function(event, data) { _update.success(data);  });
    Notificacao.removeEventListener('problema:update_error', function(event, data) { _update.error(data); });
    Notificacao.removeEventListener('problema:remove_success', function(event, data) { _remove.success(data);  });
    Notificacao.removeEventListener('problema:remove_error', function(event, data) { _remove.error(data); });

    function init(){
      var id = $stateParams.idUsuario;
      if(id) {
        ProblemaModel.find(id);
      } else {
        ProblemaModel.findAll();
      }
    }

    function editar(problema) {
      delete problema.pass;
      vm.problema = angular.copy(problema);
    }

    function remover(problema, evento) {
//      if (confirm('Tem certeza que deseja remover o usuário '+problema.name+'?')) {
//        ProblemaModel.remove(problema.id);
//      }
      var confirm = $mdDialog.confirm()
        .title('Tem certeza que deseja excluir o problema '+ problema.nome +'?')
        .content('Esta operaca nao pode ser revertida!')
        .ariaLabel('Confirmar exclusao')
        .ok('Confirmar')
        .cancel('Cancelar')
        .targetEvent(evento);
      $mdDialog.show(confirm).then(function() {
        ProblemaModel.remove(problema._id);
      }, function() {

      });
    }

    function salvar(problema) {
      vm.master = angular.copy(problema);
      if (vm.master.hasOwnProperty('_id')) {
        ProblemaModel.update(vm.master);
      } else {
        ProblemaModel.create(vm.master);
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
        vm.problema = data;
      },
      error: function(data) {
        console.warn(data);
      }
    };

    var _create = {
      success: function(data) {
        vm.message = 'Problema criado com sucesso';
        vm.usuarios.push(data);
        $state.go('app.problema');
      },
      error: function(data) {
        //console.warn(data);
      }
    };

    var _update = {
      success: function(data) {
        vm.message = 'Problema alterado com sucesso';
        ProblemaModel.findAll();
        vm.problema = {};
        $state.go('app.problema');
      },
      error: function(data) {
        vm.message = data.message;
        console.warn(data);
      }
    };

    var _remove = {
      success: function(data) {
        vm.message = 'Problema deletado com sucesso';
        ProblemaModel.findAll();
      },
      error: function(data) {
        vm.message = data.message;
        console.warn(data);
      }
    };
  }
})();