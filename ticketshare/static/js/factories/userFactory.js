ticket.factory('UserFactory', function($http) {
    return {
        createUser: function (data, callback) {
            $http.post('/users/', data)
                .success(function (response) {
                    callback(response);

                }).error(function (error) {
                    console.log(error);
                });
        },

        updateUser: function (data, callback) {
            $http.put('/users/' + user.id + '', data)
                .success(function(response) {
                    callback(response);
                }).error(function (error) {
                    console.log(error)
                })
        },

        getUser: function (callback) {
            $http.get('/users/' + user.id + '')
                .success(function(response) {
                    callback(response);

                }).error(function(error) {
                    console.log(error)
                });
        },

        getUsers: function(callback) {
            $http.get('/users/')
                .success(function (response) {
                    callback(response);
                }).error(function(error) {
                    console.log(error)
                })
        }
    }
});