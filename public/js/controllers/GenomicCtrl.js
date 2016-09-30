// public/js/controllers/NerdCtrl.js
angular.module('GenomicCtrl', []).controller('GenomicController', function($scope) {


  $scope.genomicCollection = [];

  //checks entry - returns true or false
  var isItPalindrome = function(word) {

    var DNA = {
      a: 't',
      c: 'g',
      g: 'c',
      t: 'a'
    };

    var RNA = {
      a: 'u',
      c: 'g',
      g: 'c',
      u: 'a'
    };

    word = word.toLowerCase().replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    var match = [];

    var checkFor = DNA;
    for (var i = 0; i < word.length; i++) {
      if (word[i] === 'u') {
        checkFor = RNA;
      }
    }

    for (var j = 0; j < word.length; j++) {
      match.unshift(checkFor[word[j]]);
    }
    match = match.join('');

    return match === word;
  };


  var getPalinLength = function(word) {
    word = word.replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    return word.length;
  };


  var lookForNucleotides = function(entry) {
    var checker = false;
    var val;
    for (var i = 0; i < entry.length; i++) {
      val = entry[i].toLowerCase();
      if (val !== 'a' && val !== 't' && val !== 'u' && val !== 'c' && val !== 'g') {
        checker = true;
      }
    }
    return checker;
  };


  //call isItPalindrome to see if enty is correct.
  $scope.checkGenome = function() {
    //search for characters and return false if 
    if (lookForNucleotides($scope.userEntry)) {
      $scope.tagline = 'Remember, only A, C, T, G or U for RNA';
    }
    //submission must be greater than two letters
    else if (getPalinLength($scope.userEntry) < 3) {
      $scope.tagline = 'uh, that is too short.  Maybe try again with something longer.';
    }
    //check if submission is a true palindrome
    else if (isItPalindrome($scope.userEntry)) {
      //add entry to list
      $scope.genomicCollection.unshift(
        {'entry': $scope.userEntry.toUpperCase()}
        );

      $scope.tagline = 'Nice! That is ' + getPalinLength($scope.userEntry) + ' nucleotides long!';

    //Not a palindrome, try again
    } else {
      $scope.tagline = 'No, that is not a palindrome';
    }
    //reset input field
    $scope.userEntry = '';
  };


});