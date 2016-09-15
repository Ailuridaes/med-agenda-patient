(function() {
  'use strict';

  angular
    .module('app')
    .controller('painscaleCtrl', painscaleCtrl);

  painscaleCtrl.$inject = ['dataFactory', '$stateParams', '$state'];

  /* @ngInject */
  function painscaleCtrl(dataFactory, $stateParams, $state) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      if ($stateParams.projectId) {
        projectService.getById($stateParams.projectId).then(
          function(project) {
            vm.project = project;
          }
        );
      }
    }
  }
})();