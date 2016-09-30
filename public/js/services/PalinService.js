// public/js/services/NerdService.js
angular.module('PalinService', []).factory('Palindrome', ['$http', function($http) {

    return {

        get : function() {
            return $http.get('/api/palindromes');
        },

        checkWords : function(words) {
            return $http.post('/api/checkWords', words);
        },

        create : function(userEntry) {
            return $http.post('/api/palindromes', userEntry);
        },

        delete : function(id) {
            return $http.delete('/api/palindromes/' + id);
        }
    }       

}]);