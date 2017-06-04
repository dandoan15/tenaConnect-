'use strict';

angular
    .module('ttcApp')

    .controller('bbMessCtrl', ['$scope', '$rootScope', '$route', '$http', '$window',
        function ($scope, $rootScope, $route, $http, $window)
        {
            $scope.getBBMessage = function ()
            {
                $scope.check = 'true'
                // Grab the Last name and first name to be used as part of the get route for web server
                var fromTenant = $route.current.params.fromID;
                var messageID = $route.current.params.messageID;
                $scope.from = fromTenant;
                $scope.messageID = messageID;
                console.log(messageID + ' ' + fromTenant);
                $http.get('/directory/allmessages/' + messageID + '/' + fromTenant).then(function (response)
                {
                    // display the information on the tenantMessage.html
                    $scope.message = response.data;
                    console.log("Success!");

                });
            };

            $scope.buttonToggle = function ()
            {
                $scope.check = false;
            };
        }
    ]);