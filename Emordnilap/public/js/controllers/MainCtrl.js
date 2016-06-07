// public/js/controllers/MainCtrl.js
angular.module('MainCtrl', []).controller('MainController', function($scope, Nerd) { //Add Main???

    $scope.tagline = 'A palindrome is a word, phrase, number, or other sequence of characters which reads the same backward or forward. Allowances may be made for adjustments to capital letters, punctuation, and word dividers. - Wikipedia';

    // TODO: This will be a list of submitted palindromes from the MongoDB

  $scope.servercollection = [];

  var thing = null;

  var getNerds = function () {
    Nerd.get(function(dataResponse) {
        // $scope.data = dataResponse;
        thing = dataResponse;
        // $scope.servercollection.unshift(dataResponse);
    }).then(function(hello) {
        for (var i = 0; i < 10; i++) {
        	$scope.servercollection.unshift(
        		{'entry': hello.data[i].name}
        		);
        }
    });
  };
  getNerds()


});