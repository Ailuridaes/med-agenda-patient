(function() {
    'use strict';

    angular
        .module('app')
        .controller('FeatureController', FeatureController);

    FeatureController.$inject = ['patientFactory', 'emergencyContactFactory', 'patientCheckInFactory', 'WizardHandler', '$timeout','toastr'];

    /* @ngInject */
    function FeatureController(patientFactory, emergencyContactFactory, patientCheckInFactory, WizardHandler, $timeout, toastr) {
        var vm = this;
        vm.title = "Feature Controller";
        vm.returningPatientCheck = returningPatientCheck;
        vm.editECArray = editECArray;
        vm.isReturningPatient = false;
        vm.setEmergencyContactToPatient = setEmergencyContactToPatient;
        vm.reset = reset;
        vm.writePatientToDatabase = writePatientToDatabase;
        vm.patient = {};
        vm.patient.emergencyContacts = [];
        vm.emergencyContact = {};
        vm.emergencyContactsToEdit = [];
        vm.hideIndicators = false;


        function returningPatientCheck(firstName, lastName, email) {      
            if(vm.checkInForm.$valid){
               patientFactory.isReturningPatient(firstName, lastName, email).then(
                function(res) {

                    vm.isReturningPatient = res;

                    if(res) {

                        vm.patient = res;
                        var dateInMiliSeconds = Date.parse(vm.patient.dateOfBirth);
                        var date= new Date(dateInMiliSeconds);
                        vm.patient.dateOfBirth = date;
                        WizardHandler.wizard().goTo('Reason for Visit');

                    } else {
                        vm.patient.emergencyContacts = [];
                        WizardHandler.wizard().goTo('Personal Info');
                    }
                });
            }  
        }


        function editECArray(emergencyContact) {
            vm.emergencyContactsToEdit.push(emergencyContact);


        }

        function setEmergencyContactToPatient() {
            
            vm.patient.emergencyContacts.push(vm.emergencyContact);
            WizardHandler.wizard().goTo('Reason for Visit');
            

        } 

        function beforeRender($view, $dates, $leftDate, $upDate, $rightDate) {
            var index = Math.floor(Math.random() * $dates.length);
            $dates[index].selectable = false;
        }



        function reset() {

            vm.patient = undefined;
            vm.emergencyContact = undefined;
            vm.patientCheckIn = undefined;
            WizardHandler.wizard().reset();
            
        }

        function addPatientCheckIn(patientCheckIn) {

            patientCheckIn.checkInTime = new Date();
            
            switch(patientCheckIn.symptoms){
                case "Head Trauma":
                    patientCheckIn.medicalFieldId = 6;
                    break;
                case "Broken Bone":
                    patientCheckIn.medicalFieldId = 2;
                    break;
                case "Loss Of Consciousness":
                    patientCheckIn.medicalFieldId = 4;
                    break;
                case "Fever":
                    patientCheckIn.medicalFieldId = 8;
                    break;
                case "Loss Of Blood":
                    patientCheckIn.medicalFieldId = 8;
                    break;
            }

            patientCheckInFactory.addPatientCheckIn(patientCheckIn).then(
                function(res) {
                    
                },
                function(err) {
                    
                }
            );
        }

        function writePatientToDatabase() {



            if(vm.confirmForm.$valid) {

                WizardHandler.wizard().goTo('Success');
                vm.hideIndicators = true;

                if (vm.patient.patientId) {
                

                patientFactory.updatePatient(vm.patient, vm.patient.patientId).then(
                    function() {
                        
                    }
                );

                vm.emergencyContactsToEdit.forEach(function(contact) { 
                    emergencyContactFactory.editEmergencyContact(contact, contact.emergencyContactID).then(
                        function(res) {
                            
                        },
                        function(err) {
                            
                        }
                    )

                });
                vm.patientCheckIn.patientId = vm.patient.patientId;
                var patientCheckInCopy = angular.copy(vm.patientCheckIn);
                addPatientCheckIn(patientCheckInCopy);
                
            } else {
                

                var patient = angular.copy(vm.patient);
                patientFactory.addPatient(patient).then(
                    function(res) {
                        

                        var patientCopy = angular.copy(vm.patientCheckIn);
                        patientCopy.patientId = res.data.patientId;
                        
                        addPatientCheckIn(patientCopy);
                        


                    },
                    function(error) {
                        
                    }
                );
            }

            

            

            $timeout(function() {
                
                reset();
                vm.hideIndicators = false;
            }, 5000);


            }

            
        }

        
    }
})();