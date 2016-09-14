(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureController', FeatureController);

    FeatureController.$inject = ['dataFactory'];

    /* @ngInject */
    function FeatureController(dataFactory) {
        var vm = this;
        vm.title = "Feature Controller"

        activate();

        function activate() {

        }
    }
})();
