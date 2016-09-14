(function() {
    'use strict';

    angular
        .module('app')
        .factory('dataFactory', dataFactory);

    dataFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function dataFactory($http, $q, apiUrl) {
        var service = {
            addData: addData,
            getDataList: getDataList,
            getDatum: getDatum,
            updateData: updateData,
            deleteData: deleteData
        };

        var dataUrl = apiUrl + 'data'

        return service;

        function addData(data) {

            var defer = $q.defer();

            $http({
                method: 'POST',
                url: dataUrl,
                data: data
            }).then(
                function(res) {
                    // returns added data
                    var data = angular.fromJson(res.data);
                    defer.resolve(data);
                }, function(res) {
                    defer.reject(res);
                }
            );
            return defer.promise;
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

        function updateData(data) {
            var defer = $q.defer();

            $http({
                method: 'PUT',
                url: dataUrl,
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
    }
})();
