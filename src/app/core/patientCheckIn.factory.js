(function() {
    'use strict';

    angular
        .module('app')
        .factory('patientCheckInFactory', patientCheckInFactory);

    patientCheckInFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function patientCheckInFactory($http, $q, apiUrl) {
        var service = {
            addPatientCheckIn: addPatientCheckIn
        };
        return service;

        ////////////////

        function addPatientCheckIn(patientCheckIn) {

        	return $http.post(apiUrl + 'PatientCheckIns', patientCheckIn);
        }
    }
})();