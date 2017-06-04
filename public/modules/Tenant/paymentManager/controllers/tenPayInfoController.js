//Ask Joseph Janecek if you have more questions
'use strict';

angular
    .module('ttcApp')
    .controller('TPInfoCtrl', ['$scope', '$rootScope', '$http', '$route', '$filter',
        function ($scope, $rootScope, $http, $route, $filter)
        {
            //This is used to get the current tenants(hard coded id for tenant Harvy Bullock) payment info
            $scope.getOne = function ()
            {
                //TODO: Replace Hared coded TenantID with signed in ID
                $scope.tenantID = 'T0003221';
                var id = $scope.tenantID;
                $http.get('/paymentInfo/' + id).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    //console.log("Reciving the tenant info");
                    $scope.results = response.data;
                    console.log(response.data);
                });
            };

            //This function calculates the total amount the tenant owes
            $scope.totalDue = function ()
            {
                var payments = $scope.results[0].Payment;
                //console.log(payments);
                var total = 0;
                for (var i = 0; i < payments.length; i++)
                {
                    total += payments[i].Amount;
                }
                return total;
            }

            //Called from filter. Returns true if payment is late
            $scope.isLate = function (payment)
            {

                return $filter('date')(new Date(payment.lastDay), 'MM/dd/yyyy') < $filter('date')(new Date(), 'MM/dd/yyyy');
            };

            //Called from filter. Returns true if payment is not late
            $scope.notLate = function (payment)
            {
                return $filter('date')(new Date(payment.lastDay), 'MM/dd/yyyy') >= $filter('date')(new Date(), 'MM/dd/yyyy');
            };
        }
    ]);