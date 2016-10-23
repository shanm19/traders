angular.module("TraderApp.Auth")
.controller("SignupCtrl", ["$scope", "UserService", function ($scope, UserService) {

    $scope.user = {};

    $scope.signup = function () {
        UserService.signup($scope.user);
    };

}]);