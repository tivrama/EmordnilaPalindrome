// public/js/controllers/PalinCtrl.js
angular.module('PalinCtrl', []).controller('PalinController', function($scope, $location, Palindrome, $http, $mdDialog) {

  //for routes
  $scope.go = function ( path ) {
    $location.path( path );
  };

// ------------------------------------

  $scope.palincollection = [];
  $scope.galleryOfLintedPastEntries = [];
  $scope.palinLength = 0;
  $scope.lintedUserEntry = '';
  $scope.duplicate = false;


  //get list of linted previous entries to check for duplicates
  var getGalleryOfLintedPastEntries = function () {
    Palindrome.get(function() {
    }).then(function(listOfPalindromes) {
      for (var i = 0; i < listOfPalindromes.data.length; i++) {
        $scope.galleryOfLintedPastEntries.push(listOfPalindromes.data[i].lintedName);
      }
    });
  };

  getGalleryOfLintedPastEntries();


  var checkDuplicates = function() {
    for (var i = 0; i < $scope.galleryOfLintedPastEntries.length; i++) {
      if ($scope.lintedUserEntry === $scope.galleryOfLintedPastEntries[i]) {
        return $scope.duplicate = true;
      }
    }
    return $scope.duplicate = false;
  };


  var lintUserEntry = function() {
    return $scope.lintedUserEntry = $scope.userEntry.toLowerCase().replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
  };


  var isItPalindrome = function() {
    for (var i = 0; i < $scope.lintedUserEntry.length; i++) {
      if ($scope.lintedUserEntry[i] === $scope.lintedUserEntry[i + 1] && $scope.lintedUserEntry[i] === $scope.lintedUserEntry[i + 2]) {
        return false;
      }
    }
    var reversedUserEntry = $scope.lintedUserEntry.split('').reverse().join('');
    return reversedUserEntry === $scope.lintedUserEntry;
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
      Palindrome.checkWords({word: list[word]}).then(function(result) {
        console.log(result.data);
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
          // notRealWords(); // FOR DEPLOYMENT
          finalCheck(); // FOR TESTING WITHOUT USING API
        }
      }
    );
  };


  var addPalindrome = function () {
    Palindrome.create({'entry': $scope.userEntry, 'lintedEntry': $scope.lintedUserEntry})
      .catch(function (err) {
        console.log('Add palindrome API from client not working: ', err);
      });
  };


  var finalCheck = function() {
    //save linted version of user entry and the length
    $scope.lintedUserEntry = lintUserEntry();
    $scope.palinLength = $scope.lintedUserEntry.length;
    //submission must be greater than two letters
    if ($scope.palinLength < 3) {

      $scope.tagline = 'uh, that is too short.  Maybe try again.';
    }
    //check if submission is a true palindrome
    else if (isItPalindrome()) {
      //add entry to list
      $scope.palincollection.unshift(
        {'entry': $scope.userEntry}
      );
      //check if duplicate
      checkDuplicates();
      if (!$scope.duplicate) {
        $scope.tagline = 'Nice job! That is ' + $scope.palinLength + ' letters (not including spaces or punctuation)';

        if ($scope.palinLength > 20) {
          $scope.prize = 'That is over 20 letters!  Your palendrome has been appended to to the main page!';
          //modal popup of a prize
          $scope.showAdvanced();
        }
        //send submission to server
        addPalindrome();
      //if entry is a duplicate...
      } else {
        $scope.tagline = 'Good! That is ' + $scope.palinLength + ' letters (not including spaces or punctuation). \n It was already in the gallery.';

        if ($scope.palinLength > 20) {
          $scope.prize = 'That is over 20 letters! \nHowever, this entry was already in the gallery, so it will not be appended to the home page.';
          //modal popup of a prize
          $scope.showAdvanced();
        }
      }

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


  //Displays prize modal for good entries over 20 letters
  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(answer) {
      $scope.status = 'Hello!';
    }, function() {
      $scope.status = 'Goodbye';
    });
  };

  //Controller for the modal
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  };


});