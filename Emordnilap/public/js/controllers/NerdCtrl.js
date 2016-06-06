// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd) {




    $scope.tagline = 'TODO: comment appears on good palendrome, or try again + see yours on the home page';
    $scope.successprize = 'TODO: API call to play BOB video on successful submission over 15 letters';

    //add functions to test if submission is a palindrome.  


  //it will go inside if statement that first varifies a true palindrome
  //this will send submission to server.  Do not use yet...
  $scope.nerd = {};
  $scope.addNerd = function () {
    Nerd.create($scope.nerd)
      .catch(function (err) {
        console.log(err);
      });
  };


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