// public/js/appRoutes.js
angular.module('appRoutes', ['ngMaterial']).config(['$routeProvider', '$locationProvider', '$mdThemingProvider', function($routeProvider, $locationProvider, $mdThemingProvider) {

    // Disable Angular Material Theming
    // $mdThemingProvider.disableTheming();

    // Angular Material Dark Theme
    $mdThemingProvider.theme('default')
        .dark();


    $routeProvider
        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

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