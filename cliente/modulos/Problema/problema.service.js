(function() {
  'use strict';

  angular
    .module('app.problema')
    .factory('ProblemaService', problemaService);

  problemaService.$inject = ['$http'];

  function problemaService($http) {

    var API_ROUTE = '/api/problemas';

    var service = {
      API_ROUTE     : API_ROUTE,
      create        : create,
      errorCallback : errorCallback,
      find          : find,
      findAll       : findAll,
      findByRole    : findByRole,
      unique        : unique,
      update        : update,
      remove        : remove
    };

    return service;
    /////////////////

    function findAll() {
      return $http.get(API_ROUTE).
        error(errorCallback);
    }

    function findByRole(role) {
      return $http.post(API_ROUTE.concat('/role')).
        error(errorCallback);
    }

    function find(id) {
      return $http.get(API_ROUTE.concat('/').concat(id)).
        error(errorCallback);
    }

    function create(data) {
      return $http.post(API_ROUTE, data).
        error(errorCallback);
    }

    function update(data){
      return $http.put(API_ROUTE.concat('/').concat(data._id), data).
        error(errorCallback);
    }

    function remove(id) {
      return $http.delete(API_ROUTE.concat('/').concat(id)).
        error(errorCallback);
    }

    function unique(data) {
      return $http.post(API_ROUTE.concat('/unique'), data).
        error(errorCallback);
    }

    function errorCallback(error) {
      //console.error(error);
    }
  }
})();
