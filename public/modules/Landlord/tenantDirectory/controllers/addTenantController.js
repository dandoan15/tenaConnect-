//Ask Joseph Janecek if you have more questions
'use strict';

angular
    .module('tcApp')
    .controller('addTenantCtrl', ['$scope', '$rootScope', '$http', '$route',
        function ($scope, $rootScope, $http, $route)
        {
            //This funtion is used to initalize the done variable (which displays the sucess text) called on ng-init
            $scope.begin = function ()
            {
                $scope.done = false;
            }
            
            //This function adds a new tenant to the db with payment info
            $scope.addNew = function ()
            {
                var newList = {}
                var newTenant = $scope.data;
                var payInfo = $scope.payment;

                newList.tenantInfo = newTenant;
                newList.PaymentInfo = payInfo;
                //Hardcoded Landlord ID fix when we have sign in
                newList.LandlordID = 'L0000001';
                
                console.log(newList);
                $http.post('/addTenants/', newList).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Sent data the tenant info");
                    $scope.done = true;
                });
            };
        }
    ]);