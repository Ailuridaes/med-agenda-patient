(function() {
    'use strict';

    angular
        .module('app', ['ui.router'])

        .config(function($stateProvider, $urlRouterProvider){
        	$urlRouterProvider.otherwise('/feature');

        	$stateProvider
        	.state('feature', {
        		url: '/feature',
        		templateUrl: '/app/feature/feature.html',
        		controller: 'FeatureController as feature'
        	});

        });

})();
