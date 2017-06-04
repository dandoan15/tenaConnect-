//Ask Joseph Janecek if you have more questions
'use strict';

angular
    .module('tcApp')
    .controller('payCtrl', ['$scope', '$rootScope', '$http', '$filter',
        function ($scope, $rootScope, $http, $filter)
        {
            //This function gets a list of all the landlords tenants
            $scope.getAll = function ()
            {
                $http.get('/listTenants/').then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Reciving the Tenant data");
                    $scope.results = response.data;
                    //Array for passing names to Indivdual payment screen using $rootScope (see payInfoController's service for more details)
                    var nameList = [];
                    for (var i = 0; i < response.data.length; i++)
                    {
                        var name = response.data[i].FName + " " + response.data[i].LName;
                        nameList[i] = { 'name': name, 'id': response.data[i].TenantID };
                        $rootScope.nameList = nameList;
                    }
                });
                //Calls function while waiting for response from database for tenant Info
                $scope.getPaymentInfo();
            };

            //Gets all the payment info for the tenants (used for filtering into different tables)
            $scope.getPaymentInfo = function ()
            {
                $http.get('/paymentInfo/').then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Reciving the Payment data");
                    $scope.payInfo = response.data;
                    //console.log($scope.payInfo);
                });
            }

            //Called from a filter. returns true if the tenant has paid all dues 
            $scope.paid = function (tenant)
            {
                for (var i = 0; i < $scope.payInfo.length; i++)
                {
                    if ($scope.payInfo[i].TenantID === tenant.TenantID)
                    {
                        if ($scope.payInfo[i].Payment.length === 0)
                        {
                            return true;
                        }
                    }
                }
                
                return false;
            }

            //Called from filter. Returns true if tenant still owes rent (but is not late)
            $scope.notPaid = function (tenant)
            {
                for (var i = 0; i < $scope.payInfo.length; i++)
                {
                    if ($scope.payInfo[i].TenantID === tenant.TenantID)
                    {
                        var payments = $scope.payInfo[i].Payment;
                        for (var index = 0; index < payments.length; index++)
                        {
                            if ($filter('date')(new Date(payments[index].lastDay), 'MM/dd/yyyy') >= $filter('date')(new Date(), 'MM/dd/yyyy'))
                            {
                                return true;
                            }
                        }
                    }
                }

                return false;
            }

            //Called from filter. Returns true if tenant has a payment that is late
            $scope.missedPay = function (tenant)
            {
                for (var i = 0; i < $scope.payInfo.length; i++)
                {
                    if ($scope.payInfo[i].TenantID === tenant.TenantID)
                    {
                        var payments = $scope.payInfo[i].Payment;
                        for (var index = 0; index < payments.length; index++)
                        {
                            if ($filter('date')(new Date(payments[index].lastDay), 'MM/dd/yyyy') < $filter('date')(new Date(), 'MM/dd/yyyy'))
                            {
                                return true;
                            }
                        }
                    }
                }

                return false;
            }



        }
    ]);