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

  $scope.nerd = {'entry': $scope.userEntry};
  var addNerd = function () {
    Nerd.create($scope.nerd)
      .catch(function (err) {
        console.log(err);
      });
  };

  //call isItPalindrome to see if enty is correct.
  $scope.check = function(){
    //submission must be greater than two letters
    if (getPalinLength($scope.userEntry) < 3) {
      $scope.tagline = 'oops, not quite.  Try again.'
    }
    //check if submission is a true palindrome
    else if (isItPalindrome($scope.userEntry)) {
      //add entry to list
      $scope.palincollection.unshift(
        {'entry': $scope.userEntry}
        );
      $scope.tagline = 'Nice job! That is ' +getPalinLength($scope.userEntry) + ' letters (not including spaces..)';

        //send submission to server
        addNerd();


      //if over 15 letters, give a youtube prize.  
        // if (getPalinLength($scope.userEntry) > 15) {
        //   $scope.prize = <iframe width="420" height="315" src="https://www.youtube.com/embed/JUQDzj6R3p4" frameborder="0" allowfullscreen></iframe>;
        // }
    //Not a palindrome, try again
    } else {
      $scope.tagline = 'oops, not quite.  Try again.'
    }
    //reset input field
    $scope.userEntry = '';
  };





//----------------------------
  //it will go inside if statement that first varifies a true palindrome
  //this will send submission to server.  Blow doe succescully hit the server as of june 6 am.  Do not use yet...







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