function userController($scope, $http, $routeParams, UserFactory, JourneyFactory, $location) {
    var userId = $routeParams.id;
    $scope.editingUser = false;
    $scope.editingUser = false;
    $scope.create = false;

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

    $scope.editU = function () {
        console.log("edit klicked");
        $scope.editingUser = true;
    };

    $http.get('/journeys/').
        success(function (data) {
            $scope.journeys = data;
            console.log(data);
        }).error(function (data) {
            console.log("didn't work");
        });

     $scope.creating = function () {
        $scope.create = true;
    };

    $scope.createJourney = function () {
        var data = {
            "date": $scope.journeyDate,
            "depart": $scope.journeyDepart,
            "arrive": $scope.journeyArrive,
            "meeting_point": $scope.journeyMeetingPoint,
            "spots": $scope.journeySpots,
            "description" : $scope.journeyDescription
        };
        JourneyFactory.createJourney(data, function (response) {
            $location.path('/home')
        });
    };
    $scope.getJourney = function (journey) {
        $http.get('/journeys/' + journey.id + '').
            success(function (data) {
                $scope.journey = data;
                console.log($scope.journey);

            }).error(function (data) {
                console.log("didn't work");
            });
    };

    $scope.deleteJorney = function(journey) {
        JourneyFactory.deleteJourney(journey, function (response) {
            $location.path('/home/')
        });
    };

    $scope.editJourney = function(journey) {
        var data = {
            "date": $scope.journeyDate,
            "depart": $scope.journeyDepart,
            "arrive": $scope.journeyArrive,
            "meeting_point": $scope.journeyMeetingPoint,
            "spots": $scope.journeySpots,
            "description" : $scope.journeyDescription
        };
      JourneyFactory.editJourney(journey,data, function(response) {
           $location.path('/journeys/' + journeyId + '')
      });
    };

    $scope.editingJ = function (event) {
        $scope.editingJourney = true;
    }
}
