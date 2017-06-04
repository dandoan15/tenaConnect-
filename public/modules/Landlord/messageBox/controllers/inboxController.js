'use strict';

angular
    .module('tcApp')
    .controller('messageBox', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http)
        {
            $scope.getMessages = function ()
            {
                console.log("testing");
                //TODO: Replace this hardcoded ID with the session ID
                var myID = "L0000001"
                $rootScope.myID = myID;
                $http.get('/directory/allmessages/' + myID).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    $scope.tenantMessages = response.data;
                });
            };
        }
    ]);