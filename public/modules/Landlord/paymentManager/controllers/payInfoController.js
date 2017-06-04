//Ask Joseph Janecek if you have more questions
'use strict';

angular
    .module('tcApp')
    //The service is used to get the name to display on the page
    .service('currentNameSvc', function ()
    {
        this.getName = function (nameList, id)
        {
            for (var i = 0; i < nameList.length; i++)
            {
                if (nameList[i].id === id)
                {
                    return nameList[i].name;
                }
            }
        };
    })
    .controller('PInfoCtrl', ['$scope', '$rootScope', '$http', '$route', 'currentNameSvc', '$filter',
        function ($scope, $rootScope, $http, $route, myName, $filter)
        {
            //This function get the payment info for the tenant clicked on
                //Note: it is called when view is initialized using ng-init
            $scope.getOne = function ()
            {
                $scope.edit = false;
                $scope.add = false;
                var id = $route.current.params.tenantID;
                $scope.tenantID = id;
                //console.log("ID is" + id);
                $http.get('/paymentInfo/' + id).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    //console.log("Reciving the tenant info");
                    $scope.results = response.data;
                    $scope.payments = response.data[0].Payment;
                    if ($rootScope.nameList)
                    {
                        $scope.name = myName.getName($rootScope.nameList, id);
                    }
                    //Call the totalDue() when $scope.results has data
                    $scope.totalDue();
                });
            };

            //This function uses a put to update the long term info (See view for details)
            $scope.updatePayment = function ()
            {
                $scope.edit = false;
                var updateTenant = $scope.results;
                //console.log(updateTenant);
                console.log('Updating Info: ' + updateTenant);
                $http.put('/paymentInfo/' + $scope.tenantID, updateTenant).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Data updated");
                });
            }

            //This fuction adds a payment to the Payment inner JSON
            $scope.addPayment = function ()
            {
                $scope.add = false;
                //$scope.payments.push($scope.newPayment);
                $scope.newPayment.PaymentID = $scope.createID(7);
                var addPayment = $scope.newPayment;
                $http.put('/addPayment/' + $scope.tenantID, addPayment).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Data added");
                    //Once add is successful call get one so user doesn't have to refresh the page to see added payment
                    $scope.getOne();
                });
            }

            //This deletes (using a put) a payment object from Schema
            $scope.paid = function (paymentID)
            {
                var ID = $scope.tenantID;
                var removePayment = {};
                removePayment.PaymentID = paymentID;
                removePayment.TenantID = ID;
                console.log(removePayment);
                $http.put('/deletePayment/' + ID, removePayment).then(function (response, error)
                {
                    if (error)
                        console.log(error);
                    console.log("Data Removed");
                    $scope.getOne();
                });
            }

            //This function generates a unique id that is IDSize length long for new(added) payment JSON
            $scope.createID = function(IDsize)
            {
                var newID = Math.floor(1 + (Math.random() * 1000000)).toString();
                while (newID.length < IDsize)
                {
                    newID = '0' + newID;
                }
                return newID;
            }

            //This function calculates the total someone owes
            $scope.totalDue = function ()
            {
                var payments = $scope.results[0].Payment;
                //console.log("getting total");
                var total = 0;
                for (var i = 0; i < payments.length; i++)
                {
                    total += payments[i].Amount;
                }
                $scope.total = total;
            }

            //This function is called from filter in ng-repeat.  returns true if last day of passed in payment object is later than the current date
            $scope.isLate = function (payment)
            {
                return $filter('date')(new Date(payment.lastDay), 'MM/dd/yyyy') < $filter('date')(new Date(), 'MM/dd/yyyy');
            };

            //This fucntion is also called from a filter. returns true if last day is today or in the future
            $scope.notLate = function (payment)
            {
                return $filter('date')(new Date(payment.lastDay), 'MM/dd/yyyy') >= $filter('date')(new Date(), 'MM/dd/yyyy');
            };
        }
    ]);