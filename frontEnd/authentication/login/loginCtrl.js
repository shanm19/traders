angular.module("TraderApp.Auth")
.controller("LoginCtrl", ["$scope", "UserService", function ($scope, UserService) {

    $scope.user = {};

    $scope.login = function () {
        UserService.login($scope.user);
    };

}]);