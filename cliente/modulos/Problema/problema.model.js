(function() {
  'use strict';

  angular
    .module('app.problema')
    .factory('ProblemaModel', problemaModel);

  problemaModel.$inject = ['ProblemaService', 'Notificacao'];

  function problemaModel(ProblemaService, Notificacao) {

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
          Notificacao.notify('problema:find_all_success', result.data);
        },
        error: function(error){
          Notificacao.notify('problema:find_all_error', error.data);
          console.error('ProblemaModel : User find all error');
        }
      };

      ProblemaService.findAll().then(_handleFindAll.success, _handleFindAll.error);
    }

    function find(id) {
      var _handleFind = {
        success: function(result){
          Notificacao.notify('problema:find_success', result.data);
        },
        error: function(error){
          Notificacao.notify('problema:find_error', error.data);
          console.error('ProblemaModel : User find error');
        }
      };

      ProblemaService.find(id).then(_handleFind.success, _handleFind.error);
    }

    function create(data) {
      var _handleCreate = {
        success: function(result){
          Notificacao.notify('problema:create_success', result.data);
        },
        error: function(error){
          Notificacao.notify('problema:create_error', error.data);
          console.error('ProblemaModel : User create error');
        }
      };

      ProblemaService.create(data).then(_handleCreate.success, _handleCreate.error);
    }

    function update(data) {
      var _handleUpdate = {
        success: function(result){
          Notificacao.notify('problema:update_success', result.data);
        },
        error: function(error){
          Notificacao.notify('problema:update_error', error.data);
          console.error('ProblemaModel : User update error');
        }
      };

      ProblemaService.update(data).then(_handleUpdate.success, _handleUpdate.error);
    }

    function remove(id) {
      var _handleRemove = {
        success: function(result){
          Notificacao.notify('problema:remove_success', result.data);
        },
        error: function(error){
          Notificacao.notify('problema:remove_error', error.data);
          console.error('ProblemaModel : User remove error');
        }
      };

      ProblemaService.remove(id).then(_handleRemove.success, _handleRemove.error);
    }
  }
})();