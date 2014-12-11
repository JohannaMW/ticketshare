function homeController($scope, $http, JourneyFactory, $location) {
    $scope.create = false;
    $scope.editing = false;
    $scope.searchText = '';

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

    $scope.attendJourney = function(journey) {
        $http.post('/journeys/' + journey.id + '/attend/').
            success(function(data){
                $scope.addAttendAlert(journey);

        }).error(function(data) {
            console.log("didn't work");
        });
    };

    $scope.alerts = [];

    $scope.addAttendAlert = function(journey) {
        var name = journey.host.first_name;
        var mobile = journey.host.mobile;
        //var mail = journey.host.email;
        $scope.alerts.push({ type: 'success', msg: 'You are about to go on this journey. Please contact your host' +
            ' ' + name + ' under ' + mobile , id: journey.id});
      };

      $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
      };

}