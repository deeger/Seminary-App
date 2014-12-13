
angular.module('app').directive('periodNav', function () {
    return {
        restrict:'EA',
        scope: {
            selectedPeriod: '=',
            periods:'=',
            tool:'@'

        },
        templateUrl:'templates/DropdownTemplate.html',
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
        replace: true,
    };
});