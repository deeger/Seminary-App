

app.controller('AppCtrl', function($scope, periodSvc ,$ionicModal, $timeout, $http) {

    $scope.hide = true;

    $scope.toggleCustom = function() {
        $scope.hide = $scope.hide === false ? true: false;
    };

    window.debugScope = $scope;

    //Date Functionality


    $scope.next = function (){
        for(var i = 0; i < $scope.dayData.length; i++){
            if($scope.dayData[i].date > $scope.date){
                if($scope.dayData[i].dayType == $scope.periodId.classSchedule){
                    $scope.date = $scope.dayData[i].date;
                    break;
                }
            }
        }
    };

    $scope.previous = function (){
        for(var i = $scope.dayData.length - 1; i >= 0; i--){
            if($scope.dayData[i].date < $scope.date){
                if($scope.dayData[i].dayType == $scope.periodId.classSchedule){
                    $scope.date = $scope.dayData[i].date;
                    break;
                }
            }
        }
    };//end Date Functionality




    $scope.changePeriod ={};
    $scope.markAll = {};
    $scope.markers="markers";

    $scope.toggleExpanded = function (item){
        item.Expanded=!item.Expanded;
    };



    $scope.hideStudents = function (){
        var students = document.getElementById("studentList");
        var style = window.getComputedStyle(students);
        var display = style.getPropertyValue('display');
        if(display == "none"){
            students.style.display = 'inline';
        }
        else
        {
            students.style.display = 'none';
        }
    };

    //original call to ger periods
    function init() {
        periodSvc.GetPeriods (function (data) {
            $scope.periods = data;
        })
    }
    init();
    $scope.changePeriodClose = function (changePeriod, period){
        changePeriod.Expanded = false;
        $scope.initPeriod(period);

    }
});






//Vince's Code, Hiding/Showing student info
app.controller('toggleStudents',['$scope', function($scope){

}]);


//attendance page
app.controller('attendanceCtrl', function($scope, $controller, $stateParams, periodSvc,$http){


    $scope.initPeriod = function(periodId) {


        periodSvc.GetPeriod(periodId,function(data){
            $scope.Period = data;
        });
        $http.get('periods/days.json')
            .success(function (data) {

                //$scope.Period = periodId;
                //$scope.Period={periodNum:'abc'};
                $scope.dayData = data;
                var today = new Date();
                $scope.periodId = periodId;
                for(var i = 0; i < data.length; i++){
                    var parts = data[i].date.split("-");
                    var newDate = new Date([parts[0], parts[1],parts[2]]);
                    if(newDate.getDate() >= today.getDate() && newDate.getMonth() >= today.getMonth() && newDate.getFullYear() >= today.getFullYear() && data[i].dayType == periodId.classSchedule){
                        $scope.date = data[i].date;
                        break;
                    }
                }
            }) .error(function () {
                alert("error");
            });
    };

    $scope.initPeriod($stateParams.periodId);

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
        student.state.Chosen = selMarker;
        student.state.Expanded=false;
    };

    //Mark All Attendance
    $scope.markPresent = function () {
        for(var i =0; i < $scope.Period.students.length; i++){
            if($scope.Period.students[i].state.Chosen == $scope.Period.students[i].state.Options[0]){
                $scope.Period.students[i].state.Chosen = $scope.Period.students[i].state.Options[1];
            }
        }

        //Hide all menu
        $scope.toggleExpanded($scope.markAll);
        $scope.hideStudents();
    };

    $scope.markAbsent = function () {
        for(var i =0; i < $scope.Period.students.length; i++){
            if($scope.Period.students[i].state.Chosen == $scope.Period.students[i].state.Options[0]){
                $scope.Period.students[i].state.Chosen = $scope.Period.students[i].state.Options[2];
            }
        }
    //end mark all attendance

        //Hide all menu
        $scope.toggleExpanded($scope.markAll);
        $scope.hideStudents();
    };

});//end attendance controller
//end attendance page

//student controller
app.controller('studentCtrl', function($scope, $stateParams, $controller, studentSvc){
    function init() {
        if ($stateParams.studentId) {
            studentSvc.getStudent($stateParams.studentId, function (data) {
                $scope.student = data;
            })
        }
    }
    init();
    $scope.newPicture = function(){
         console.log("take picture with camera");
         navigator.camera.getPicture(function(imageURI) {

             // imageURI is the URL of the image that we can use for
             // an <img> element or backgroundImage.

         }, function(err) {

             // Ruh-roh, something bad happened

         }, cameraOptions);
    }
});//end student controller


//gradebook controller
app.controller('gradeBookCtrl', function($scope, $controller, $stateParams, periodSvc){

    periodSvc.GetPeriod($stateParams.periodId,function(data){

        $scope.Period = data;
    });
});//end gradebook controller


//messaging controller
app.controller('messagingCtrl', function($scope, $controller, $stateParams, periodSvc){
    periodSvc.GetPeriod($stateParams.periodId,function(data){

        $scope.Period = data;
    });
});//end messaging controller


//language controller
app.controller('languageCtrl', function($scope){

});//end language controller


//all http services defined here.
app.service('periodSvc', function($http) {
    var cache = {};

    var cacheSearch=function(periodId){
        for(var i = 0; i < cache.Periods.length; i++) {
            if (cache.Periods[i].periodNum == periodId) {
                return cache.Periods[i];
                //successFunc(cache.Periods[i]);
                break;
            }
        }
    }
    //stores period info so that it doesn't have to call every time you switch periods
    this.GetPeriod = function(periodId, successFunc) {
        if(!cache.Periods){
            this.GetPeriods (function(data){
                var loaded = cacheSearch(periodId);
                successFunc(loaded)
            })
        }
        if (cache.Periods) {
            var cached = cacheSearch(periodId);
            successFunc(cached);
        }
    };

    //gets period info when there is none stored
    this.GetPeriods = function(successFunc){
        var url = //'periods/periods.json';
        'https://dgm3790.iriscouch.com/seminary_db/periods';

        $http.get(url, null)
        .success(function(data) {
            if (data.periods.length > 0) {
                for (var idx = 0; idx < data.periods.length; idx++) {
                    var period = data.periods[idx];
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
            cache.Periods = data.periods;
            successFunc(data.periods);
        })
        .error(function(data){
            console.log("get error");
        });
    }
});

app.service('studentSvc', function($http){
    this.getStudent = function(studentID, successFunc){
        var student = studentID+".json";
        var url = 'students/'+student;
        $http.get(url, null)
        .success(function(data){
            successFunc(data);
        });
    };
});

app.controller('onoffCtrl', function($scope) {
    $scope.change = false;
    $scope.onOff = function() {
        $scope.change = !$scope.change;
    }

});
