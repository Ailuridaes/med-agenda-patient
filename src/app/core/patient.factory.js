(function() {
    'use strict';

    angular
        .module('app')
        .factory('patientFactory', patientFactory);

    patientFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function patientFactory($http, $q, apiUrl) {
        var service = {
            addPatient: addPatient,
            getDataList: getDataList,
            getDatum: getDatum,
            updatePatient: updatePatient,
            deleteData: deleteData,
            isReturningPatient, isReturningPatient
        };

        var dataUrl = apiUrl + 'patients'

        return service;

        function addPatient(patient) {


            return $http.post(apiUrl + 'patients', patient);

            // var defer = $q.defer();

            // $http({
            //     method: 'POST',
            //     url: dataUrl,
            //     data: data
            // }).then(
            //     function(res) {
            //         // returns added data
            //         var data = angular.fromJson(res);
            //         defer.resolve(data);
            //     }, function(res) {
            //         defer.reject(res);
            //     }
            // );
            // return defer.promise;
        }

        function getDataList() {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: dataUrl
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function getDatum(dataId) {
            var defer = $q.defer();

            $http({
                method: 'GET',
                url: dataUrl + '/' + dataId
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res);
                }
            );

            return defer.promise;
        }

        function updatePatient(data, id) {
            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: dataUrl + '/' + id,
                data: data
            }).then(
                function(res) {
                    defer.resolve();
                }, function(res) {
                    defer.reject(res.statusText);
                }
            );

            return defer.promise;
        }

        function deleteData(data) {

            var defer = $q.defer();

            $http({
                method: 'DELETE',
                url: dataUrl + 'dataId'
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    defer.reject(res.statusText);
                }
            );

            return defer.promise;
        }

        function isReturningPatient(firstName, lastName, email) {
          var defer = $q.defer();

            $http({
                method: 'GET',
                url: apiUrl + 'patients/isreturning/' + firstName + '/' + lastName + '/' + email + '/'
            }).then(
                function(res) {
                    defer.resolve(res.data);
                }, function(res) {
                    console.log(res);
                    defer.reject(res.statusText);
                }
            );

            return defer.promise;  
          
        }
    }
})();

