(function() {
    'use strict';

    angular
        .module('app')
        .factory('emergencyContactFactory', emergencyContactFactory);

    emergencyContactFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function emergencyContactFactory($http, $q, apiUrl) {
        var service = {
            editEmergencyContact: editEmergencyContact
        };
        return service;

        ////////////////

        function editEmergencyContact(ec, ecId) {
        	return $http.put(apiUrl + 'emergencycontacts/' + ecId , ec);
        }
    }
})();