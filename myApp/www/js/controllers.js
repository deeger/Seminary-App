angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

        $scope.date = new Date();

    $scope.next = function (){
        $scope.date.setDate($scope.date.getDate()+1);
        while($scope.date.getDay() == 6 || $scope.date.getDay() == 0)
        {
            $scope.date.setDate($scope.date.getDate()+1);
        }
    }
    $scope.previous = function (){
        $scope.date.setDate($scope.date.getDate()-1);
        while($scope.date.getDay() == 6 || $scope.date.getDay() == 0)
        {
            $scope.date.setDate($scope.date.getDate()-1);
        }
    }

        $scope.test = function () {
            alert('You clicked me.');
        }
});
