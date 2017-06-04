//Ask Joseph Janecek if you have more questions
'use strict';

angular
    .module('tcApp')
    .controller('TenantCtrl', ['$scope', '$rootScope', '$http', '$route',
        function ($scope, $rootScope, $http, $route)
        {
            //This function gets the tenant info for the tenant that was clicked on
            $scope.getOne = function ()
            {
                $scope.edit = false;
                var id = $route.current.params.tenantID;
                $scope.tenantID = id;
                //console.log("ID is" + id);
                $http.get('/listTenants/' + id).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    //console.log("Reciving the tenant info");
                    $scope.results = response.data;
                });

                //This function updates the tenant info when click submit
                $scope.updateTenant = function ()
                {
                    $scope.edit = false;
                    $scope.data = $scope.results;
                    var updateTenant = $scope.data;
                    console.log(updateTenant);
                    console.log('Updating Info: ' + updateTenant);
                    $http.put('/listTenants/' + $scope.tenantID, updateTenant).then(function (response, error)
                    {
                        if (error)
                            console.log(error);
                        console.log("Data updated");
                    });
                }
            };
        }
    ]);