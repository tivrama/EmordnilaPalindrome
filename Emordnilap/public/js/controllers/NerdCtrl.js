// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd) {





    //add functions to test if submission is a palindrome.
    $scope.palincollection = [
      {'entry': 'Madem Im Adam'},
      {'entry': 'Racecar'}
    ]

    //checks entry - returns true or false
    var isItPalindrome = function(word) {
      word = word.toLowerCase().replace(/\s+/g, '');
      var arr = word.split('').reverse().join('');
      return word === arr;
    };

    var getPalinLength = function(word) {
      word = word.replace(/\s+/g, '');
      return word.length;
    }

    //call isItPalindrome to see if enty is correct.
    $scope.check = function(){
      if (isItPalindrome($scope.userEntry)) {
        $scope.palincollection.unshift(
          {'entry': $scope.userEntry}
          );
        console.log($scope.palincollection)
        $scope.tagline = 'Nice job! That is ' +getPalinLength($scope.userEntry) + ' letters (not including spaces..)';

      } else {
        $scope.tagline = 'oops, not quite.  Try again.'
      }
    

      $scope.userEntry = '';
    };


    // $scope.tagline = 'TODO: comment appears on good palendrome, or try again + see yours on the home page';





//----------------------------
  //it will go inside if statement that first varifies a true palindrome
  //this will send submission to server.  Blow doe succescully hit the server as of june 6 am.  Do not use yet...
  // $scope.nerd = {};
  // $scope.addNerd = function () {
  //   Nerd.create($scope.nerd)
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // };






//----------------------------
    // $scope.successprize = 'TODO: API call to play BOB video on successful submission over 15 letters';
  // $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&tomatoes=true&plot=full")
  // .then(function(response)
  //   { 
  //     console.log(response.data);
  //     $scope.tagline = response.data.Actors;

  //   });


    // $http.get("https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true")
    // .then(function(response) {
    //     $scope.tagline = response.data;
    // });

// "https://www.youtube.com/watch?v=JUQDzj6R3p4"

});