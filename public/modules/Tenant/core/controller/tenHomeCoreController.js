'use strict';

angular
    .module('ttcApp')
    .controller('bulletinCtrl', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http)
        {
            $scope.getMessages = function ()
            {
                var toBB = "BulletinBoard";
                $http.get('/directory/allmessages/' + toBB).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    $scope.bbMessages = response.data;
                    //console.log($scope.bbMessages);
                });
            };
        }
    ])
    .controller('userController', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http)
        {
            $scope.getUser = function ()
            {
                $http.get('/user').then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    $scope.user = response.data;
                    console.log($scope.user.FirstName);
                    console.log($scope.user.Email);
                });
            };
        }
    ]);