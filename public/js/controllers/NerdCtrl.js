// public/js/controllers/NerdCtrl.js
angular.module('NerdCtrl', []).controller('NerdController', function($scope, Nerd, $http, $q) {





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
    var drow = word.split('').reverse().join('');
    return word === drow;
  };

  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return word.length;
  }



//-------------------------------------------------------------------
  var asyncLoop = function(list) {
    for (var i = 0; i < list.length; i++) {
      (function(cntr) {
        // here the value of i was passed into as the argument cntr
        // and will be captured in this function closure so each
        // iteration of the loop can have it's own value
        asycronouseProcess(function() {
          alert(cntr);
        });
      })(i);
    }
  };
//-------------------------------------------------------------------

  // Make API request
  // var areWordsForReal = function(words) {
  //   var checker = true;
  //   var wordList = words.split(' ');
  //   var numOfWords = wordList.length;
  //   // Loop that returns a function with all the '.then's needed for each word send to wordnik API
  //   var Qchain;
  //   var makeQfunction = function(nOfw) {
  //     for (var i = 0; i < nOfw; i++) {

  //     }
  //   }




  //   for (var i = 0; i < wordList.length; i++) {

  //   $http.get("http://api.wordnik.com:80/v4/word.json/" + wordList[i] + "/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
  //     .then(function(response) {
  //         $scope.myWelcome = response.data;
  //         console.log($scope.myWelcome);
  //     });
  //   }

  //   return checker;
  // };




// var makeFunction = function(arry) {
//   var result = [];
//   for (var i = 0; i < arry.length; i++) {
//     result.push(function(x) { console.log(x)})
//   }
//   return result;
// };

// var test = makeFunction(['a', 'b', 'c', 'd']);
// console.log(test);

// console.log(test[1]);

// console.log(test[1]('hello world'));

// var areWordsForReal = function(words) {

//     var checker = true;

//     var wordList = words.split(' ');

//     for (var i = 0; i < wordList.length; i++) {

//     $http.get("http://api.wordnik.com:80/v4/word.json/" + wordList[i] + "/examples?includeDuplicates=false&useCanonical=false&skip=0&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5")
//       .then(function(response) {
//           $scope.myWelcome = response.data;
//           console.log($scope.myWelcome);
//       });
//     }

//     return checker;
//   };


//-------------------------------------------------------------------

  var addNerd = function () {
    Nerd.create({'entry': $scope.userEntry})
      .catch(function (err) {
        console.log('Add palindrome API from client not working: ', err);
      });
  };

  //call isItPalindrome to see if enty is correct.
  $scope.check = function(){
    //submission must be greater than two letters
    if (getPalinLength($scope.userEntry) < 3) {
      $scope.tagline = 'uh, that is less than 3 letters.  Maybe try again.'
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
      $scope.tagline = 'oops, not quite.  Try again.'
    }
    //reset input field
    $scope.userEntry = '';
  };

});