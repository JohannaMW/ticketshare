function userController($scope, $http, $routeParams, UserFactory, $location) {
    var userId = $routeParams.id;
    $scope.editing = false;

    UserFactory.getUser(userId, function (response) {
            console.log(response);
            $scope.user = response;
        });

    $scope.deleteUser = function(user) {
        UserFactory.deleteUser(user, function (response) {
            $location.path('/home/')
        });
    };

    $scope.editUser = function(user) {
        var data = {
             "username": $scope.newUsername,
             "first_name": $scope.newFirstName,
             "last_name": $scope.newLastName,
             "mobile": $scope.newMobile,
             "password": $scope.Password
        };
      console.log(user);
      UserFactory.editUser(user, data, function(response) {
           $location.path('/users/' + userId + '')
      });
    };

    $scope.edit = function () {
        console.log("edit klicked");
        $scope.editing = true;
    }
}
