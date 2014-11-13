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
});//end period controller


//attendance page
app.controller('attendanceCtrl', function($scope, $controller){
    $controller('periodCtrl', {$scope: $scope});
    var showMarkers = function(){

    }


    $scope.toggleMarkersExpanded = function (item) {
        if (!item.Expanded) {
            var students = $scope.Period.students;

            for (var i = 0; i < students.length; i++) {
                students[i].state.Expanded = false;
            }
        }

        item.Expanded=!item.Expanded;
    };

    $scope.chosenMark="--";
    $scope.chooseMark = function(student,selMarker){//function (value, item){
        console.log("attendance marked as " + selMarker);
        student.state.Chosen = selMarker;
        student.state.Expanded=false;
    }
});//end attendance controller

//student controller
app.controller('studentCtrl', function($scope, $stateParams, $controller){
    $controller('periodCtrl', {$scope: $scope});
    console.log("Student ID: ", $stateParams);

    var db = new PouchDB('https://deeger:Misured.9945@dgm3790.iriscouch.com/seminary_db');

    //post=create  put=update-needs ID
    db.post({
        "name": "seminary_db test"
    }).then;

    db.changes().on('change', function(){
        console.log('changing DB')
    });

});//end student controller

//gradebook controller
app.controller('gradeBookCtrl', function($scope, $controller){
    $controller('periodCtrl', {$scope: $scope});
});//end gradebook controller

//messaging controller
app.controller('messagingCtrl', function($scope, $controller){
    $controller('periodCtrl', {$scope: $scope});
});//end messaging controller

//language controller
app.controller('languageCtrl', function($scope){

});//end language controller

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
                            var student = period.students[i];
                            var useOptions = [ {
                                Disp:"--",
                                Val:"none"
                            },
                            {
                                Disp:"P",
                                Val:"present"
                            },
                            {
                                Disp:"U",
                                Val:"unexcused"
                            },
                            {
                                Disp:"T",
                                Val:"tardy"
                            },
                            {
                                Disp:"PE",
                                Val:"parentExcused"
                            },
                            {
                                Disp:"SE",
                                Val:"schoolExcused"
                            }];
                            student.state = {
                                Expanded:false,
                                Options:useOptions,//student.options     <--use when data moves to json or backend
                                Chosen:useOptions[0]//student.options[0] <--use when data moves to json or backend
                            };
                        }
                    }
                }

                cache.Periods = data;
                successFunc(data);
            })
            .error(function(data){
                console.log("get error");
            });
    }

});
