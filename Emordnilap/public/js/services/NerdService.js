// public/js/services/NerdService.js
angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/nerds');
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(userEntry) {
            return $http.post('/api/nerds', userEntry);
        },

        // call to DELETE a an entry 
        // delete : function(id) {
        //     return $http.delete('/api/nerds/' + id);
        // }
    }       

}]);


// //from Shortly  solution
// .factory('Links', function ($http) {

//   var getAll = function () {
//     return $http({
//       method: 'GET',
//       url: '/api/links'
//     })
//     .then(function (resp) {
//       return resp.data;
//     });
//   };

//   var addLink = function (link) {
//     return $http({
//       method: 'POST',
//       url: '/api/links',
//       data: link
//     });
//   };

//   return {
//     getAll: getAll,
//     addLink: addLink
//   };
//   })