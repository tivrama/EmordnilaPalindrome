// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd, $http) {





  //add functions to test if submission is a palindrome.
  $scope.palincollection = [];

  //checks entry - returns true or false
  var isItPalindrome = function(word) {
    word = word.toLowerCase().replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    for (var i = 0; i < word.length; i++) {
      if (word[i] === word[i+1] && word[i] === word[i+2]) {
        return false;
      }
    }
    var arr = word.split('').reverse().join('');
    return word === arr;
  };

  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return word.length;
  }



  var asyncMap = function(tasks, callback){

    var resultsArray = [];
    var resultsCount = 0;

    for(var i = 0; i < tasks.length; i++){
      (function (i) {
        tasks[i](function (val) {
          resultsArray[i] = val;
          resultsCount++;
          if(resultsCount === tasks.length){
            callback(resultsArray);
          }
        });
      })(i);
    }
  };

  //NOTE LOOPING THROUTH ASYNC API CALLS SUCKS - TRY USING ASCYN MAP 
  // Make API request
  var areWordsForReal = function(words) {
    var checker = true;

    var wordList = words.split(' ');

    for (var i = 0; i < wordList.length; i++) {

    $http.get("http://api.wordnik.com:80/v4/word.json/" + wordList[i] + "/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
      .then(function(response) {
          $scope.myWelcome = response.data;
          console.log($scope.myWelcome);
      });
    }
    return checker;
  };


  var addNerd = function () {
    Nerd.create({'entry': $scope.userEntry})
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
      $scope.tagline = 'Nice job! That is ' +getPalinLength($scope.userEntry) + ' letters (not including spaces or punctuation)';

      if (getPalinLength($scope.userEntry) > 20) {
        $scope.prize = 'That is over 20 letters!  Your palendrome has been appended to to the main page!';
      }

        //send submission to server
        addNerd();

    //Not a palindrome, try again
    } else {
      $scope.tagline = 'oops, not quite.  Try again.'
    }
    //reset input field
    $scope.userEntry = '';
  };

});