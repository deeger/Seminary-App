var app = angular.module('starter.controllers', []);

app.controller('AppCtrl', function($scope, periodSvc ,$ionicModal, $timeout) {
    window.debugScope = $scope;
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
    $scope.markers="markers";

    $scope.toggleExpanded = function (item){
        item.Expanded=!item.Expanded;
        console.log(item + " expanded");
    }


   // for (var idx = 0; idx < data.length; idx++)

    //original call to ger periods
    function init() {
        periodSvc.GetPeriods (function (data) {
            $scope.periods = data;
        })
    }
    init();

    $scope.changePeriodClose = function (changePeriod){
        changePeriod.Expanded = false;
    }

});

app.controller('periodCtrl', function($scope, $stateParams, periodSvc) {
    window.debugScope = $scope;
    function init() {
        if ($stateParams.periodId) {
            periodSvc.GetPeriod($stateParams.periodId, function (data) {
                $scope.Period = data;

                console.log(data);
            })
        }
    }
    init();
});

///////page controllers; all except language requires the period controller///////

//attendance page
app.controller('attendanceCtrl', function($scope, $controller){
    $controller('periodCtrl', {$scope: $scope});
    var showMarkers = function(){

    }

    $scope.toggleMarkersExpanded = function (item) {
        if (!item.Expanded) {
            var students = $scope.Period.students;

            for (var i = 0; i < students.length; i++) {
                students[i].markers.Expanded = false;
            }
        }

        item.Expanded=!item.Expanded;
    };

    $scope.chosenMark="--";
    $scope.chooseMark = function (value, item){
        console.log("attendance marked as " + value);
        $scope.chosenMark = value;
        item.Expanded=false;
    }
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


//all http services defined here.
app.service('periodSvc', function($http) {
    var cache = {};
    //stores period info so that it doesn't have to call every time you switch periods
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

    //gets period info when there is none stored
    this.GetPeriods = function(successFunc){
        var url = 'periods/periods.json';
        $http.get(url, null)
            .success(function(data) {
                if (data.length > 0) {
                    for (var idx = 0; idx < data.length; idx++) {
                        var period = data[idx];
                        for (var i = 0; i < period.students.length; i++) {
                            period.students[i].markers = {};
                        }
                    }
                }



                cache.Periods = data;
                successFunc(data);
            })
            .error(function(data){
                console.log("errorQQ");
            });
    }

});
