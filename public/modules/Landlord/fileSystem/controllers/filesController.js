'use strict';

angular
	.module('tcApp')

	.directive('fileModel', ['$parse', function ($parse) 
	  	{
		    return {
		        restrict: 'A',
                link: function (scope, element, attrs)
                {
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
        //Upload a file for the tenant selected
	    $scope.uploadFile = function() 
	    {
	        console.log('file is ' );
	        console.dir($scope.myFile);

	      	var file = $scope.myFile;
			var fd = new FormData();
            fd.append('file', file);
            var id = $route.current.params.tenantID;

            $http.post('/addFileTo/' + id, fd,
            {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})
			.success(function(response)
			{
                $scope.picture = 'data:image/jpeg;base64,' + response;
                console.log($scope.picture);
                $scope.getFiles();
			});

	    };

        //Get the files for the tenant selected
        $scope.getFiles = function ()
        {
            var id = $route.current.params.tenantID;
            $scope.tenantID = id;
            $http.get("/allFiles/" + id).then(function (response)
            {
                $scope.check = response.data;
                var array = response.data;
                //console.log(response.data);
            });
        };

        //Delete the specified file for the tenant selected
        $scope.deleteFile = function (fileName)
        {
            //Put info into an array
            var delFile = {};
            delFile.TenantID = $scope.tenantID;
            delFile.fileName = fileName;
            //console.log(delFile);

            $http.post('/deleteFile/', delFile).then(function (response, error)
            {
                if (error)
                    console.log(error);
                console.log("Data Deleted");
                $scope.getFiles();
            });
        }
	    
	}]);