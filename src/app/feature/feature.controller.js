(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureController', FeatureController);

    FeatureController.$inject = ['patientFactory', 'emergencyContactFactory', 'WizardHandler', '$timeout'];

    /* @ngInject */
    function FeatureController(patientFactory, emergencyContactFactory, WizardHandler, $timeout) {
        var vm = this;
        vm.title = "Feature Controller";
        vm.returningPatientCheck = returningPatientCheck;
        vm.editECArray = editECArray;
        vm.isReturningPatient = false;
        vm.disabledValidationCheckIn = disabledValidationCheckIn;
        vm.disabledValidationPersonalInfo = disabledValidationPersonalInfo;
        vm.disabledReasonForVisit = disabledReasonForVisit;
        vm.setEmergencyContactToPatient = setEmergencyContactToPatient;
        vm.reset = reset;
        vm.writePatientToDatabase = writePatientToDatabase;
        vm.patient = {};
        vm.patient.emergencyContacts = [];
        vm.emergencyContact = {};
        vm.emergencyContactsToEdit = [];
        vm.hideIndicators = false;

        

        vm.options = {
            minDate: new Date(),
            showWeeks: true
        }
       


        function returningPatientCheck(firstName, lastName, email) {      
            
           patientFactory.isReturningPatient(firstName, lastName, email).then(
            function(res) {

                vm.isReturningPatient = res;
                
                if(res) {
                
                    

                    vm.patient = res;
                    WizardHandler.wizard().goTo('Reason for Visit');

                } else {

                    WizardHandler.wizard().goTo('Personal Info');
                }
            });

           
        }


        function editECArray(emergencyContact) {
            vm.emergencyContactsToEdit.push(emergencyContact);


        }

        function setEmergencyContactToPatient() {
            
            vm.patient.emergencyContacts.push(vm.emergencyContact);
            

        } 

        function beforeRender($view, $dates, $leftDate, $upDate, $rightDate) {
            var index = Math.floor(Math.random() * $dates.length);
            $dates[index].selectable = false;
        }


        //Validation for disabling buttons
        function disabledValidationCheckIn() {

            return !(vm.patient !== undefined && vm.patient.firstName && vm.patient.lastName && vm.patient.email); 
        }

        function disabledValidationPersonalInfo() {

            return !(vm.patient !== undefined && vm.patient.telephone && vm.patient.address && vm.emergencyContact.firstName && vm.emergencyContact.telephone && vm.emergencyContact.lastName);
        }

        function disabledReasonForVisit() {
            return !(vm.patient !== undefined && vm.patient.symptom && vm.patient.painSeverity);
        }

        function reset() {

            vm.patient = undefined;
            vm.emergencyContact = undefined;
            WizardHandler.wizard().reset();
        }

        function writePatientToDatabase() {

            vm.hideIndicators = true;

            if (vm.patient.patientId) {
                

                patientFactory.updatePatient(vm.patient, vm.patient.patientId).then(
                    function() {
                        console.log('added to database.');
                    }
                );

                vm.emergencyContactsToEdit.forEach(function(contact) { 
                    emergencyContactFactory.editEmergencyContact(contact, contact.emergencyContactID).then(
                        function(res) {
                            console.log('added ec to factory');
                        },
                        function(err) {
                            console.log('error');
                        }
                    )

                });

               

                
            } else {
                

                var patient = angular.copy(vm.patient);
                patientFactory.addPatient(patient).then(
                    function() {
                        console.log('added to database');

                    },
                    function(error) {
                        console.log(error);
                    }
                );
            }

            $timeout(function() {
                console.log('timeout executing now.')
                reset();
                vm.hideIndicators = false;
            }, 5000);

        }

        
    }
})();