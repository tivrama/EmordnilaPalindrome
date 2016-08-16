// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd, $http) {

//--- Delete this once https get request is resolved -------

  // window.onload = function() {
  //   $(function() {
  //     if (window.location.protocol === "https:") {
  //       window.location.protocol = "http";
  //     }
  //   });
  // };

  //Or add this in Heroku env config
  // [   force_ssl: false   ]
  //    or
  // [   Access-Control-Allow-Origin: *   ]
  //    or any of these? (not tested yet)
  // [   Access-Control-Request-Headers   ]
  // [   Access-Control-Allow-Origin   ]
  // [   Access-Control-Allow-Methods   ]

//--- Delete this once https get request is resolved -------


  $scope.palincollection = [];

  //checks entry - returns true or false
  var isItPalindrome = function(word) {
    word = word.toLowerCase().replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    for (var i = 0; i < word.length; i++) {
      if (word[i] === word[i + 1] && word[i] === word[i + 2]) {
        return false;
      }
    }
    var drow = word.split('').reverse().join('');
    return word === drow;
  };

  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return word.length;
  };

  var asyncLoop = function(iterations, func, callback) {
    var index = 0;
    var done = false;
    var loop = {
      next: function() {
        if (done) {
          return;
        }

        if (index < iterations) {
          index++;
          func(loop);

        } else {
          done = true;
          callback();
        }
      },

      iteration: function() {
        return index - 1;
      },

      break: function() {
        done = true;
        callback();
      }
    };
    loop.next();
    return loop;
  };

  $scope.check = function() {
    var list = $scope.userEntry.replace(/[`~!@#$%^&*0-9()_|+\-=?;:",.<>\{\}\[\]\\\/]/gi, '');
    list = list.split(' ');
    var checker = true;
    var word = 0;

    asyncLoop(list.length, function(loop) {
      console.log('Word sent to API: ', list[word]);
      $http.get("http://api.wordnik.com:80/v4/word.json/" + list[word] + "/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5").then(function(result) {
        console.log(result.data.examples);
        word++;
        if (!result.data.examples) {
          checker = false;
          loop.break();
        }
        // log the iteration
        console.log(loop.iteration());
        // Okay, for cycle could continue
        loop.next();
      })},
      function() {
        //call the rest of the Palindrom Checker function
        console.log('All words are real words: ', checker);
        if (checker) { 
          finalCheck();
        } else {
          notRealWords();
        }
      }
    );
  };

  var addNerd = function () {
    Nerd.create({'entry': $scope.userEntry})
      .catch(function (err) {
        console.log('Add palindrome API from client not working: ', err);
      });
  };

  //call isItPalindrome to see if enty is correct.
  var finalCheck = function() {
    //submission must be greater than two letters
    if (getPalinLength($scope.userEntry) < 3) {
      $scope.tagline = 'uh, that is too short.  Maybe try again.';
    }
    //check if submission is a true palindrome
    else if (isItPalindrome($scope.userEntry)) {
      //add entry to list
      $scope.palincollection.unshift(
        {'entry': $scope.userEntry}
        );
      $scope.tagline = 'Nice job! That is ' + getPalinLength($scope.userEntry) + ' letters (not including spaces or punctuation)';

      if (getPalinLength($scope.userEntry) > 20) {
        $scope.prize = 'That is over 20 letters!  Your palendrome has been appended to to the main page!';
      }

      //send submission to server
      addNerd();

    //Not a palindrome, try again
    } else {
      $scope.tagline = 'oops, not quite.  Try again.';
    }
    //reset input field
    $scope.userEntry = '';
  };

  var notRealWords = function () {
    $scope.tagline = 'mmm, you have to use real words...';
  };

});