﻿'use strict';

var filterDate;
var filterTime;

angular
    .module('tcApp')
    /*
         This is a filter application for displaying the date on the compose.html
     */
    .filter('dateFormat', function ($filter)
    {
        return function (input)
        {
            if (input == null)
            {
                return "";
            }

            filterDate = $filter('date')(new Date(input), 'MM/dd/yyyy');

            return filterDate.toUpperCase();
        };

    })

    /*
        This is a filter application for displaying the time on the compose.html
    */
    .filter('time', function ($filter)
    {
        return function (input)
        {
            if (input == null)
            {
                return "";
            }

            filterTime = $filter('date')(new Date(input), 'HH:mm:ss');

            return filterTime.toUpperCase();

        };
    })

    .controller('bbCompCtrl', ['$scope', '$rootScope', '$http', '$window', '$interval', '$location',
        function ($scope, $rootScope, $http, $window, $interval, $location)
        {
            /*
                This is creating the date that's built in within javascript new Date()
            */
            var date;
            $scope.init = $interval(function ()
            {
                date = new Date();
                $scope.dates = [{ 'date1': date }]
            }, 100)

            /*
                grabbing all "categories" in mongoDB

            Category:String
            {collection:'messageCategories'}

        */

            $scope.getCategories = function ()
            {
                $http.get('/categories').then(function (response, error)
                {
                    if (error)
                    {
                        console.log(error);
                    }
                    $scope.categories = response.data;
                });
            };


            /*
                A function to send a message to mongoDB using "post" route call and using the variable "list"
                as the one of the parameter to send it.
            */
            $scope.sendMessage = function ()
            {
                /*
                    format the time to non-military time 
                */
                var hour = date.getHours();
                var minute = date.getMinutes();
                var time;
                if (hour > 12)
                {
                    hour = hour - 12;
                    time = hour + ":" + minute + "PM";
                }
                else
                {
                    time = hour + ":" + minute + "AM";
                }
                var newList = {};

                newList.From = 'L0000001';
                newList.To = "BulletinBoard";
                newList.Category = $scope.categorySelection;
                newList.Date = filterDate;
                newList.Time = time;
                newList.Subject = $scope.subject;
                newList.Category = categoryGlobal;
                newList.Message = $scope.message;
                $scope.list = newList;

                console.log($scope.list);

                $http.post("/tenantMessage", $scope.list).success(function (data, status, headers, config)
                {
                    var check = data;
                    //$window.alert(check);
                    $location.url('/');
                })
            };
  		

            /*
                This function is needed to allow the "select category:" dropbox to keep the selected to 
                stay within the dropdown menu using ui.bootstrap

            <script data-require="ui-bootstrap@*" data-semver="0.12.0" src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.12.0.min.js"></script> 
            */
            var categoryGlobal;
            $scope.categorySelect = function (category)
            {
                $scope.categorySelection = category.Category;
                categoryGlobal = category.Category;
            };
        }
    ]);