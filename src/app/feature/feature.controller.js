(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureController', FeatureController);

    FeatureController.$inject = ['dataFactory', 'WizardHandler'];

    /* @ngInject */
    function FeatureController(dataFactory, WizardHandler) {
        var vm = this;
        vm.title = "Feature Controller";
        vm.evaluateIsNewUser = evaluateIsNewUser;
        vm.isReturningUser = false;
        

        vm.Patients = [
        {
            firstName: 'Blaine',
            lastName: 'Arnau',
            email: 'blaine@mail.com',
            telephone: '6197999202',
            emergencyContactName: 'Patty Arnau',
            emergencyContactTelephone: '6192882224',
            medications: 'Crazy Pills',
            conditions: 'Athsma, Crazy',
            symptom: 'Head Trauma',
            painSeverity: '5'

        },
        {
            firstName: 'MattMark',
            lastName: 'Zimmer',
            email: 'mattmark@mail.com',
            telephone: '6197999202',
            emergencyContactName: 'Fozzie Bear',
            emergencyContactTelephone: '1237893872',
            medications: 'Crazy Pills',
            conditions: 'Athsma, Crazy',
            symptom: 'Head Trauma',
            painSeverity: '5'

        },
        {
            firstName: 'Ryan',
            lastName: 'Wilson',
            email: 'ryan@mail.com',
            telephone: '6197999202',
            emergencyContactName: 'Patty Arnau',
            emergencyContactTelephone: '6192882224',
            medications: 'Crazy Pills',
            conditions: 'Athsma, Crazy',
            symptom: 'Head Trauma',
            painSeverity: '5'

        }

        ]

        function evaluateIsNewUser() {

            alert('hi');

            var currentPatient  = angular.copy(vm.patient);

            console.log(currentPatient);

            
            vm.Patients.forEach(function(user) {
                if(currentPatient.firstName.toLowerCase() == user.firstName.toLowerCase() && currentPatient.lastName.toLowerCase() == user.lastName.toLowerCase() && currentPatient.email.toLowerCase() == user.email.toLowerCase()) {
                    vm.isReturningUser = true;
                }
            })

           console.log(vm.isReturningUser);

           if(vm.isReturningUser) {
            WizardHandler.wizard().goTo('Reason for Visit');
           } else {
            WizardHandler.wizard().goTo('Personal Info');
           }
           
        }

        
    }
})();
