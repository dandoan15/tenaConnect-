'use strict';

angular
	.module('ttcApp')

	.directive('fileModel', ['$parse', function ($parse) 
	  	{
		    return {
		        restrict: 'A',
		        link: function(scope, element, attrs) {
		            var model = $parse(attrs.fileModel);
		            var modelSetter = model.assign;
		            
                    element.bind('change', function ()
                    {
                        scope.$apply(function ()
                        {
		                    modelSetter(scope, element[0].files[0]);
		                });
		            });
		        }
		    };
		}])


	.controller('fileUpload', ['$scope', '$http', '$route', function($scope, $http, $route)
    {   
        //Gets all Files for tenant Harvy Bullock
        $scope.getFiles = function ()
        {
            //TODO when have cookies use them to get tenantID
                //For now it is hard coded (same in message box and payments)
            var id = 'T0003221';
            $scope.tenantID = id;
            $http.get("/allFiles/" + id).then(function (response)
            {
                $scope.check = response.data;
                var array = response.data;
                console.log(response.data);
            });
        }
	    
	}]);