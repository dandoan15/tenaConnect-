'use strict';

angular
    .module('tcApp',
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
                templateUrl: 'modules/Landlord/core/views/HomeCore.html',
                controller: 'bulletinCtrl'
            })
            .when('/bbCompose',
            {
                templateUrl: 'modules/Landlord/core/views/bbCompose.html',
                controller: 'bbCompCtrl'
            })
            .when('/bbMessage/:messageID/:fromID',
            {
                templateUrl: 'modules/Landlord/core/views/bbMessage.html',
                controller: 'bbMessCtrl'
            })
            .when('/listTenants',
            {
                templateUrl: 'modules/Landlord/tenantDirectory/views/listView.html',
                controller: 'ListCtrl'
            })
            .when('/listTenants/:tenantID',
            {
                templateUrl: 'modules/Landlord/tenantDirectory/views/tenantView.html',
                controller: 'TenantCtrl'
            })
            .when('/addTenants',
            {
                templateUrl: 'modules/Landlord/tenantDirectory/views/addTenantView.html',
                controller: 'addTenantCtrl'
            })
            .when('/accounts',
            {
                templateUrl: 'modules/Landlord/ACManager/views/accountView.html',
                controller: 'AccountCtrl'
            })
            .when('/paymentInfo',
            {
                templateUrl: 'modules/Landlord/paymentManager/views/paymanagerView.html',
                controller: 'payCtrl'
            })
            .when('/paymentInfo/:tenantID',
            {
                templateUrl: 'modules/Landlord/paymentManager/views/payInfoView.html',
                controller: 'PInfoCtrl'
            })
            .when('/messageBox',
            {
                templateUrl: 'modules/Landlord/messageBox/views/inbox.html',
                controller: 'messageBox'
            })
            .when('/compose',
            {
                templateUrl: 'modules/Landlord/messageBox/views/compose.html',
                controller: 'composeMessage'
            })
            .when('/tenantMessage/:messageID/:fromID',
            {
                templateUrl: 'modules/Landlord/messageBox/views/tenantMessage.html',
                controller: 'tenantMessage'
            })
            .when('/reply:messageID/:fromID',
            {
                templateUrl: 'modules/Landlord/messageBox/views/replyMessage.html',
                controller: 'tenantMessage'
            })
            .when('/files',
            {
                templateUrl: 'modules/Landlord/fileSystem/views/fileSelectorView.html',
                controller: 'ListCtrl'
            })
            .when('/files/:tenantID',
            {
                templateUrl: 'modules/Landlord/fileSystem/views/fileupload.html',
                controller: 'fileUpload'
            })
            .otherwise(
            {
                redirectTo: '/'
            });
    });