// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/nerds', {
            templateUrl: 'views/nerd.html',
            controller: 'NerdController'
        })

        .when('/binary', {
            templateUrl: 'views/binary.html',
            controller: 'BinaryController'
        })

        // .when('/genomic', {
        //     templateUrl: 'views/gallery.html',
        //     controller: 'GalleryController'
        // })

        .when('/gallery', {
            templateUrl: 'views/gallery.html',
            controller: 'GalleryController'
        });

    $locationProvider.html5Mode(true);

}]);