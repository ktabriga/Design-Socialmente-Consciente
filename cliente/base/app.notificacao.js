(function(){
  'use strict';

  angular
    .module('app')
    .factory('Notificacao', notificacao);

  function notificacao() {
    var _listeners = {};

    var service = {
      _listeners          : _listeners,
      addEventListener    : addEventListener,
      notify              : notify,
      removeEventListener : removeEventListener
    };

    return service;

    /**
     * Adiciona um listener
     * @param name : Nome do evento
     * @param listener : Listener callback
     */
    function addEventListener(name,listener) {
      if(!_listeners[name]){
        _listeners[name] = [];
      }
      _listeners[name].push(listener);
    }

    /**
     * Remove um listener
     * @param name : Nome do evento
     * @param listener : Listener callback
     */
    function removeEventListener(name,listener) {
      if(_listeners[name]){
        var index = _listeners[name].indexOf(listener);

        if(index!==-1){
          _listeners[name].splice(index,1);
        }
      }
    }

    /**
     * Notifica um evento
     * @param Mutiplos parâmetros disponíveis, o primeiro deve ser uma string
     */
    function notify() {
      var listeners;

      if (typeof arguments[0] !== 'string'){
        console.warn('Notification','Primeiro parâmetro deve ser um nome de evento (String)');
      } else {
        listeners = _listeners[arguments[0]];

        for(var key in listeners){
          listeners[key].apply(null, arguments);
        }
      }
    }
  }
})();