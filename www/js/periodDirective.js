
angular.module('app').directive('periodNav', function () {
    return {
        restrict:'EA',
        scope: {
            selectedPeriod: '=',
            periods:'=',
            tool:'@'

        },
        templateUrl:'templates/DropdownTemplate.html',
        //templateUrl: '/Components/Directives/AddressDisplay/AddressDisplay.html',
        replace: true,

        controller: function ($scope) {

            $scope.expanded = false;
           $scope.toggleExpanded = function(){
               $scope.expanded = !$scope.expanded;
           }


        }


    };
});

angular.module('app').directive('periodList', function () {
    return {
        restrict:'EA',
        scope: {
            periods:'=',
            siteTool:'@',
            clicked:'&'

        },
        templateUrl:'templates/periodsList.html',
        //templateUrl: '/Components/Directives/AddressDisplay/AddressDisplay.html',
        replace: true,




    };
});
//optionally you can do ng-click=myClicked(period) which will call into the controller and do $scope.clicked with the parameters
/*app.controller('periodCtrl', function($scope, $stateParams, periodSvc) {

    function init() {
        if ($stateParams.periodId) {
            periodSvc.GetPeriod($stateParams.periodId, function (data) {
                $scope.Period = data;
            })
        }
    }
    init();
})*/