(function(){
  'use strict';

  angular
    .module('app')
    .factory('Interceptador', interceptador);

  interceptador.$inject = ["$q", "$window", "$location", "toaster"];

  function interceptador($q, $window, $location, toaster) {

    var service = {
      request       : request,
      responseError : responseError
    };

    return service;

    function request(config) {
      config.headers = config.headers || {};
      if ($window.localStorage.token) {
        config.headers['Authorization'] = 'Bearer '+ $window.localStorage.token;
      }
      return config;
    }

    function responseError(response) {
      if (response.status === 401) {
        $location.path('/login');
        toaster.pop('error', "Erro!", response.data.mensagem);
      }
      toaster.pop('error', "Ocorreu um Erro", response.data.mensagem);
      return $q.reject(response.data.mensagem);
    }
  }
})();