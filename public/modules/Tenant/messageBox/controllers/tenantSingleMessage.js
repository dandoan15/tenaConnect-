'use strict';

angular
    .module('ttcApp')
    .controller('tenantMessage', ['$scope', '$rootScope', '$route', '$http', '$window', '$location',
        function ($scope, $rootScope, $route, $http, $window, $location)
        {
            $scope.getTenantMessage = function ()
            {
                $scope.toggleButton = 'true'
                // Grab the Last name and first name to be used as part of the get route for web server
                var fromTenant = $route.current.params.fromID;
                var messageID = $route.current.params.messageID;
                $scope.from = fromTenant;
                $scope.messageID = messageID;
                console.log(messageID + ' ' + fromTenant);
                $http.get('/directory/allmessages/' + messageID + '/' + fromTenant).then(function (response) {
                    // display the information on the tenantMessage.html
                    $scope.message = response.data;
                    console.log("Success!");

                });
            };

            $scope.buttonToggle = function ()
            {
                $scope.toggleButton = false;
            };

        /*
            This allows the replyMessage function to be called when you hit submit for a reply. 
            Within $htttp response returns the object within those parameters similar to success
        */
            $scope.replyMessage = function ()
            {	
                // Grab last name, first name, date, time to be used as part of the put route for the web server
                var replyTenant = $scope.messageID + '/' + $scope.from;

                // store the information into a json format within newList variable
                var newList = {};
                //newList.Date = $filter('dateFormat')(new Date());
                //newList.Time = $filter('time')(new Date());
                newList.To = $rootScope.myID;
                newList.reply = $scope.message.reply;
                console.log(newList);
                $http.put('/reply/' + replyTenant, newList).then(function (response)
                {
                    console.log(response.data);
                    //$window.alert(response.data);
                    $location.url('/messageBox');
                });
            };

            //Used to delete message
            $scope.deleteMessage = function ()
            {
                $http.delete('/directory/allmessages/' + $scope.messageID + '/' + $scope.from).then(function (response)
                {
                    console.log("Success!");
                    $location.url('/messageBox');

                });
            };
        }
    ]);