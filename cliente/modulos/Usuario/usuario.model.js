(function() {
  'use strict';

  angular
    .module('app.usuario')
    .factory('UsuarioModel', usuarioModel);

  usuarioModel.$inject = ['UsuarioService', 'Notificacao'];

  function usuarioModel(UsuarioService, Notificacao) {

    var service = {
      create  : create,
      find    : find,
      findAll : findAll,
      update  : update,
      remove  : remove
    };

    return service;
    ///////////////////

    function findAll() {
      var _handleFindAll = {
        success: function(result) {
          Notificacao.notify('usuario:find_all_success', result.data);
        },
        error: function(error){
          Notificacao.notify('usuario:find_all_error', error.data);
          console.error('UserModel : User find all error');
        }
      };

      UsuarioService.findAll().then(_handleFindAll.success, _handleFindAll.error);
    }

    function find(id) {
      var _handleFind = {
        success: function(result){
          Notificacao.notify('usuario:find_success', result.data);
        },
        error: function(error){
          Notificacao.notify('usuario:find_error', error.data);
          console.error('UserModel : User find error');
        }
      };

      UsuarioService.find(id).then(_handleFind.success, _handleFind.error);
    }

    function create(data) {
      var _handleCreate = {
        success: function(result){
          Notificacao.notify('usuario:create_success', result.data);
        },
        error: function(error){
          Notificacao.notify('usuario:create_error', error.data);
          console.error('UserModel : User create error');
        }
      };

      UsuarioService.create(data).then(_handleCreate.success, _handleCreate.error);
    }

    function update(data) {
      var _handleUpdate = {
        success: function(result){
          Notificacao.notify('usuario:update_success', result.data);
        },
        error: function(error){
          Notificacao.notify('usuario:update_error', error.data);
          console.error('UserModel : User update error');
        }
      };

      UsuarioService.update(data).then(_handleUpdate.success, _handleUpdate.error);
    }

    function remove(id) {
      var _handleRemove = {
        success: function(result){
          Notificacao.notify('usuario:remove_success', result.data);
        },
        error: function(error){
          Notificacao.notify('usuario:remove_error', error.data);
          console.error('UserModel : User remove error');
        }
      };

      UsuarioService.remove(id).then(_handleRemove.success, _handleRemove.error);
    }
  }
})();