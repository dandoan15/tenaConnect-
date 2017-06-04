//Ask Joseph Janecek if you have more questions
'use strict';

angular
    .module('tcApp')
    .controller('ListCtrl', ['$scope', '$rootScope', '$http',
        function ($scope, $rootScope, $http)
        {
            //This functin gets all the tenants in the db. Called on ng-init
            $scope.getAll = function ()
            {
                $http.get('/listTenants/').then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Reciving the data");
                    $scope.results = response.data;
                });
            };
        }
    ]);