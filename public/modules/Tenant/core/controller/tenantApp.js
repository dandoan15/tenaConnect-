//Main controller
//Authors: Dan Doan, Alan Yu, Joseph Janecek
//May 15, 2016
//Version 2

'use strict';

angular
    .module('ttcApp',
    [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider)
    {
        $routeProvider
			.when('/', 
			{
                templateUrl: "/modules/Tenant/core/view/tenantCore.html",
                controller: 'bulletinCtrl'
            })
            .when('/bbMessage/:messageID/:fromID',
            {
                templateUrl: 'modules/Tenant/core/view/TbbMessage.html',
                controller: 'bbMessCtrl'
            })
            .when('/messageBox',
            {
                templateUrl: "/modules/Tenant/messageBox/views/tenantInbox.html",
                controller: 'tenantInbox'
            })
            .when('/compose',
            {
                templateUrl: "/modules/Tenant/messageBox/views/tenantCompView.html",
                controller: 'composeMessage'
            })
            .when('/tenantMessage/:messageID/:fromID',
            {
                templateUrl: "/modules/Tenant/messageBox/views/messageView.html",
                controller: 'tenantMessage'
            })
            .when('/paymentInfo',
            {
                templateUrl: "/modules/Tenant/paymentManager/views/tenPayInfoView.html",
                controller: 'TPInfoCtrl'
            })
            .when('/files/',
            {
                templateUrl: 'modules/Tenant/fileSystem/views/tenFileView.html',
                controller: 'fileUpload'
            })
            .otherwise(
            {
                redirectTo: '/'
            });
	});