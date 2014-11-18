function homeController($scope, $http, JourneyFactory, $location) {
    $scope.create = false;

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
}