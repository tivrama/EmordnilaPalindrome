var palindromeLibrary = {


  // Returns boolean
  isNumberPalindrome: function (number) {
    num = number.toString().split('').reverse().join('');
    return num === number.toString();
  },

  // Returns boolean
  isWordPalindrome: function(word) {
    word = word.toLowerCase().replace(/[\s`~!@#$%^&*0-9()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
    for (var i = 0; i < word.length; i++) {
      if (word[i] === word[i + 1] && word[i] === word[i + 2]) {
        return false;
      }
    }
    var drow = word.split('').reverse().join('');
    return word === drow;
  },

  isGenomePalindrome: function(word) {

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
  },

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
      if (isNumberPalindrome(currentNumber)) {
        palin.number.push({[currentNumber]: bin})
      }
      if (isNumberPalindrome(bin)) {
        palin.binary.push({[currentNumber]: bin})
      }
      if (palin.number[currentNumber] && palin.binary[currentNumber]) {
        palin.both.push({[currentNumber]: bin})
      }
      currentNumber++;
    }
    return palin;
  }


};