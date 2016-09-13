// public/js/controllers/NerdCtrl.js
angular.module('BinaryCtrl', []).controller('BinaryController', function($scope) {


  $scope.bitcollection = [];

  //checks entry - returns true or false
  var isItPalindrome = function(word) {
    word = word.toLowerCase().replace(/[\s`~!@#$%^&*2-9^a-zA-Z()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');

    var drow = word.split('').reverse().join('');
    return word === drow;
  };


  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*2-9^a-zA-Z()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return word.length;
  };


  var lookForChars = function(entry) {
    var checker = false;
    for (var i = 0; i < entry.length; i++) {
      if (entry[i] !== '1' && entry[i] !== '0' && entry[i] !== ',' && entry[i] !== ' ' && entry[i] !== '.') {
        checker = true;
      }
    }
    return checker;
  };


  //call isItPalindrome to see if enty is correct.
  $scope.checkBits = function() {
    //search for characters and return false if 
    if (lookForChars($scope.userEntry)) {
      $scope.tagline = 'Remember, only 1\'s and 0\'s';
    }
    //submission must be greater than two letters
    else if (getPalinLength($scope.userEntry) < 3) {
      $scope.tagline = 'uh, that is too short.  Maybe try again.';
    }
    //check if submission is a true palindrome
    else if (isItPalindrome($scope.userEntry)) {
      //add entry to list
      $scope.bitcollection.unshift(
        {'entry': $scope.userEntry}
        );

      $scope.tagline = 'Nice job! That is ' + getPalinLength($scope.userEntry) + ' bits!';


    //Not a palindrome, try again
    } else {
      $scope.tagline = 'No, that is not a palindrome';
    }
    //reset input field
    $scope.userEntry = '';
  };


  //////////////////////////////////////////////////////////////////////////////
  ////FUN STUFF!!////BUT RUN WITH CAUTION - TAKES A WHILE///////////////////////
  //////////////////////////////////////////////////////////////////////////////

  var isPalindrome = function (number) {
    num = number.toString().split('').reverse().join('');
    // console.log('comment: ', num);
    return num === number.toString();
  }

  var binaryPalindrome = function(rangeToN) {
    //loop from 0 to whatever range and save results
    var palin = {
      number: [],
      binary: [],
      both: []
    };
    var currentNumber = 0;
    var bin;
    while (currentNumber <= rangeToN) {
      bin = (currentNumber >>> 0).toString(2);
      if (isPalindrome(currentNumber)) {
        palin.number.push({[currentNumber]: bin})
      }
      if (isPalindrome(bin)) {
        palin.binary.push({[currentNumber]: bin})
      }
      if (palin.number[currentNumber] && palin.binary[currentNumber]) {
        palin.both.push({[currentNumber]: bin})
      }
      currentNumber++;
    }
    return palin;
  }

});