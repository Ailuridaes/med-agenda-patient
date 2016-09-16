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
        vm.writePatient = writePatient;
        vm.isReturningUser = false;
        vm.disabledValidationCheckIn = disabledValidationCheckIn;
        vm.disabledValidationPersonalInfo = disabledValidationPersonalInfo;
        vm.disabledReasonForVisit = disabledReasonForVisit;
        vm.reset = reset;


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
            painSeverity: '5',

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
            painSeverity: '5',

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

            var currentPatient  = angular.copy(vm.patient);

            console.log(currentPatient);

            
            vm.Patients.forEach(function(user) {
                if(currentPatient.firstName.toLowerCase() == user.firstName.toLowerCase() && currentPatient.lastName.toLowerCase() == user.lastName.toLowerCase() && currentPatient.email.toLowerCase() == user.email.toLowerCase()) {
                    vm.isReturningUser = true;
                }
            })

           
           if(vm.isReturningUser) {
            WizardHandler.wizard().goTo('Reason for Visit');
           } else {
            WizardHandler.wizard().goTo('Personal Info');
           }
           
        }


        function writePatient(isEditing) {

            alert('hi from write patient');
            
            
        }


        //Validation for disabling buttons
        function disabledValidationCheckIn() {

            return !(vm.patient !== undefined && vm.patient.firstName && vm.patient.lastName && vm.patient.email); 
        }

        function disabledValidationPersonalInfo() {

            return !(vm.patient !== undefined && vm.patient.telephone && vm.patient.address && vm.patient.emergencyContactName && vm.patient.emergencyContactPhone
                     && vm.patient.medications && vm.patient.conditions);
        }

        function disabledReasonForVisit() {
            return !(vm.patient !== undefined && vm.patient.symptom && vm.patient.painSeverity);
        }

        function reset() {
            
            vm.patient = undefined;
            WizardHandler.wizard().goTo('Check In');
        }

        
    }
})();
