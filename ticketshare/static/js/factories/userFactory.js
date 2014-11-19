ticket_ang.factory('UserFactory', function($http) {
    return {
        getUser: function(user, callback) {
            $http.get('/users/' + user + '')
                .success(function(response) {
                    callback(response);

            }).error(function(error) {
                    console.log(error);
                });
        },
        deleteUser: function(user, callback) {
            $http.delete('/users/' + user.id + '')
                .success(function(response) {
                     callback(response);

            }).error(function(error) {
                    console.log(error);
                });
        },

        editUser: function(user, data, callback) {
        $http.put('/users/' + user.id + '', data)
            .success(function(response) {
                     callback(response);

            }).error(function(error) {
                    console.log(error);
                });
        }
    }
});