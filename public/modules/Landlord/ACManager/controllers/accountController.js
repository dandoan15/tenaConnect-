//Ask Joseph Janecek if you have more questions
'use strict';

angular
    .module('tcApp')
    .controller('AccountCtrl', ['$scope', '$rootScope', '$http', '$location', '$window',
        function ($scope, $rootScope, $http, $location, $window)
        {
            //This function gets all of the tenants
            $scope.getAll = function ()
            {
                //TODO: When have cookies retrive totAccounts from landlord Schema
                var tot = 10;
                $scope.totAccounts = tot;

                $http.get('/listTenants/').then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Reciving the data");
                    $scope.numAccounts = response.data.length;
                    //console.log($scope.numAccounts);
                    $scope.results = response.data;
                });
            };

            //This function checks if the user is able to add more accounts or if they need to purchase more
            $scope.add = function ()
            {
                if ($scope.numAccounts < $scope.totAccounts)
                {
                    $location.url('/addTenants');
                }
                else
                {
                    $window.alert("Please Purchase More Accounts");
                }
            };

            //This function is used for deleteing a tenant Account
            $scope.delAccount = function (tenantID)
            {
                var delObj = {};
                delObj.tenantID = tenantID

                $http.post('/deleteTenants/', delObj).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log(response.data);
                    $scope.rmdir(response.data);
                });
            };

            //This function deletes the directory of the tenant that was just deleted
                //This is the last step for deleting an account
            $scope.rmdir = function (path)
            {
                var delObj = {};
                delObj.path = path;

                $http.post('/rmDir/', delObj).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    $scope.getAll();
                });
            };

        }
    ]);