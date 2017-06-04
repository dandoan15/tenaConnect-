'use strict';

angular
    .module('ttcApp')
    .controller('tenantInbox', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http)
        {
            $scope.getMessages = function ()
            {
                //TODO Replace hardcoded ID with session info ID
                $rootScope.myID = 'T0003221';
                $http.get('/directory/allmessages/' + $rootScope.myID).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    $scope.tenantMessages = response.data;
                });
            };
        }
    ]);