ticket_ang.factory('JourneyFactory', function($http) {
    return {
        getJourneys: function(callback) {
            $http.get('/journeys/')
                .success(function(response) {
                    callback(response);

            }).error(function(error) {
                    console.log(error);
                });
        },
        deleteJourney: function(journey, callback) {
            $http.delete('/journeys/' + journey.id + '')
                .success(function(response) {
                     callback(response);

            }).error(function(error) {
                    console.log(error);
                });
        },

        editJourney: function(journey, data, callback) {
        $http.put('/journeys/' + journey.id + '', data)
            .success(function(response) {
                     callback(response);

            }).error(function(error) {
                    console.log(error);
                });
        },

        createJourney: function(data, callback) {
            $http.post('/journeys/', data)
            .success(function(response) {
                     callback(response);

            }).error(function(error) {
                    console.log(error);
                });
        }
    }
});