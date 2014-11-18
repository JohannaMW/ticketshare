function journeyController($scope, $http, $routeParams, JourneyFactory, $location) {
    var journeyId = $routeParams.id;
    $scope.editing = false;
    $scope.attending = false;

    $http.get('/journeys/' + journeyId + '').
        success(function(data){
            $scope.journey = data;
            console.log($scope.journey);

        }).error(function(data) {
            console.log("didn't work");
        });

    $scope.createJourney = function () {
        var data = {
            "date": $scope.journeyDate,
            "depart": $scope.journeyDepart,
            "arrive": $scope.journeyArrive,
            "meeting_point": $scope.journeyMeetingPoint,
            "spots": $scope.journeySpots
        };
        JourneyFactory.createJourney(data, function (response) {
            $location.path('/home')
        });
    };

    $scope.deleteJorney = function(journey) {
        JourneyFactory.deleteJourney(journey, function (response) {
            $location.path('/home/')
        });
    };

    $scope.attendJourney = function(journey) {
        $http.post('/journeys/' + journeyId + '/attend/').
            success(function(data){
                $scope.attending = true;

        }).error(function(data) {
            console.log("didn't work");
        });
    };

    $scope.editJourney = function(journey) {
        var data = {
            "title": $scope.journeyNewName,
            "description": $scope.journeyNewDescription
        };
      JourneyFactory.editJourney(journey,data, function(response) {
           $location.path('/journeys/' + journeyId + '')
      });
    };

    $scope.editing = function () {
        $scope.editing = true;
    }
}