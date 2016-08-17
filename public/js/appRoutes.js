// public/js/appRoutes.js
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/palin', {
            templateUrl: 'views/palin.html',
            controller: 'PalinController'
        })

        .when('/binary', {
            templateUrl: 'views/binary.html',
            controller: 'BinaryController'
        })

        .when('/genomic', {
            templateUrl: 'views/genomic.html',
            controller: 'GenomicController'
        })

        .when('/gallery', {
            templateUrl: 'views/gallery.html',
            controller: 'GalleryController'
        });

    $locationProvider.html5Mode(true);

}]);