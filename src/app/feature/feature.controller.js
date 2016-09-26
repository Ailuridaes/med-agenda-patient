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
        //vm.editECArray = editECArray;
        vm.isReturningPatient = false;
        vm.goToReasonPage = goToReasonPage;
        vm.reset = reset;
        vm.writePatientToDatabase = writePatientToDatabase;
        vm.patient = {};
        vm.patient.emergencyContacts = [{}];
        vm.deleteEmergencyContact = deleteEmergencyContact;
        


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
                        vm.patient.emergencyContacts = [{}];
                        WizardHandler.wizard().goTo('Personal Info');
                    }
                });
            }  
        }


        // function editECArray(emergencyContact) {
        //     vm.emergencyContactsToEdit.push(emergencyContact);


        // }

        function goToReasonPage() {
            
            
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
            
            console.log(patientCheckIn);
            patientCheckInFactory.addPatientCheckIn(patientCheckIn).then(
                function(res) {
                    
                },
                function(err) {
                    toastr.error("It seems you are already checked in. A doctor will see you shortly.")
                }
            );
        }

        function deleteEmergencyContact(contact) {
            console.log(vm.patient.emergencyContacts.indexOf(contact))
                vm.patient.emergencyContacts.splice(vm.patient.emergencyContacts.indexOf(contact), 1);
                if(vm.patient.emergencyContacts.length < 1) {
                    vm.patient.emergencyContacts.push({});
                    vm.isEditingECFirstName = true;
                    vm.isEditingECLastName = true;
                    vm.isEditingECTelephone = true;
                }


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

                //Change to patients.EmergencyContacts

                // vm.patient.emergencyContacts.forEach(function(contact) { 
                //     console.log(contact);
                //     emergencyContactFactory.editEmergencyContact(contact, contact.emergencyContactID).then(
                //         function(res) {
                            
                //         },
                //         function(err) {
                            
                //         }
                //     )

                // });
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