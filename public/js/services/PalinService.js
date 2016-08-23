// public/js/services/NerdService.js
angular.module('PalinService', []).factory('Palindrome', ['$http', function($http) {

    return {
        // call to get all palindromes
        get : function() {
            return $http.get('/api/palindromes');
        },

        checkWords : function(words) {
            return $http.post('/api/checkWords', words);
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(userEntry) {
            return $http.post('/api/palindromes', userEntry);
        },

        // call to DELETE a an entry 
        delete : function(id) {
            return $http.delete('/api/palindromes/' + id);
        }
    }       

}]);