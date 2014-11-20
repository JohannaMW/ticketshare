function journeyController($scope, $http, $routeParams, JourneyFactory, $location, $cookies) {
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

    $scope.deleteJourney = function(journey) {
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
            "date": $scope.dt,
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

    $scope.editing = function () {
        $(this).editing = true;
    };

    $scope.today();

      $scope.clear = function () {
        $scope.dt = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
      };

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };
      $scope.toggleMin();

      $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];


}