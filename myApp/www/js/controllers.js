var app = angular.module('starter.controllers', []);



///////page controllers; all except language requires the period controller///////

//attendance page
app.controller('attendanceCtrl', function($scope, $controller){
    $controller('periodCtrl', {$scope: $scope});

    function getStudents() {
        periodSvc.GetStudents($stateParams.periodId, function (data) {
            $scope.Period = data;
        })
    }
    //getStudents();

});

//gradebook controller
app.controller('gradeBookCtrl', function($scope, $controller){
    $controller('periodCtrl', {$scope: $scope});
});

//messaging controller
app.controller('messagingCtrl', function($scope, $controller){
    $controller('periodCtrl', {$scope: $scope});
});

//language controller
app.controller('languageCtrl', function($scope){

});

app.controller('studentFilesCtrl', function($scope, $controller){

});










app.controller('AppCtrl', function($scope, periodSvc ,$ionicModal, $timeout) {

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

    $scope.changePeriod ={};

    $scope.toggleExpanded = function (item){
        item.Expanded=!item.Expanded;
    }

    init();


    //origional call to get periods
    function init() {
        periodSvc.GetPeriods (function (data) {
            $scope.periods = data;
        })
    }

    init();



    $scope.changePeriodClose = function (changePeriod){
        changePeriod.Expanded = false;
    }


    /*$scope.$on('$stateChangeSuccess', function (){
     $scope.changePeriod.Expanded = false;
     })*/


});





//START
app.controller('periodCtrl', function($scope, $stateParams, periodSvc) {
    window.debugScope = $scope;
    function init() {
        if ($stateParams.periodId) {
            periodSvc.GetPeriod($stateParams.periodId, function (data) {
                $scope.Period = data;
            })
        }
    }
    init();
});


//all http services defined here.
app.service('periodSvc', function($http) {
    var cache = {};
    //stores period info so that it doesnt have to call everytime you switch periods
    this.GetPeriod = function(periodId, successFunc) {
        if (cache.Periods) {
            for(var i = 0; i < cache.Periods.length; i++) {
                if (cache.Periods[i].periodNum == periodId) {
                    successFunc(cache.Periods[i]);
                    break;
                }
            }
        }
    };

    /*this.GetStudents = function(studentId, successFunc) {
        if (cache.Periods) {
            for(var i = 0; i < cache.Periods.students.student.length; i++) {
                if (cache.students[i].studentId == studentId) {
                    successFunc(cache.students[i]);
                    break;
                }
            }
        }
    };*/

    //gets period info when there is none stored
    this.GetPeriods = function(successFunc){
        var url = 'periods/periods.json';
        $http.get(url, null)
            .success(function(data) {
                cache.Periods = data;
                successFunc(data);
            })
            .error(function(data){
                console.log("errorQQ");
            });
    }

    /*this.GetStudents = function(successFunc){
        var url= 'student/student.json';
        $http.get(url, null)
            .success(function(data) {
                cache.Students = data;
                successFunc(data);
            })
            .error(function(data){
                console.log("errorQQ");
            });
    }*/

});
//End
