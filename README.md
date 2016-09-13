## Welcome to EmordnilaPalindromE

This is a quick, easy place to check you palindromes. 
For letter based palindromes, just paste it in (don't worry about punctuation and spaces). Entries over 20 letters will be displayed on the welcome screen.  But all valid submissions will be displayed in the gallery. 
For binary palindromes, go to the binary view - 1's and 0's only please.  
What about genomic palindromes?  You can check those too!



## Usage

Go to the 'Try It Yourself' view and enter a palindrome.  Emordnilap will varify it and then add it to the gallary. It will tell you hown many letters it is.  If over 20 letters, it will be appended to the Welcome view.

## Algorithms on the Front End

All the algorithms for testing the palindromes is on the front end.  So you can look in the source files when on the site and see how your entries are tested.  Also in this files, is some code that may be fun to play with in your console.  Just use with caution as one of them uses a while loop that will go (a while) if you put too big a number in.


var bothBinAndDecPalindrome = function(runUpToN) {

  // This is the object that we will return
  var palin = {
    number: [],
    binary: [],
    both: []
  };

  // We will increment this number from '0' and check it
  var currentNumber = 0;

  // This will be the currentNumber in binary from
  var bin;

  // This is the actual palindrome checker
  var isPalindrome = function (number) {
    num = number.toString().split('').reverse().join('');
    return num === number.toString();
  };

  // Here we run through all the numbers and run them through 
  // our isPalindrome function
  while (currentNumber <= runUpToN) {
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
}; 


## Contributing/Bugcheck

Please feel free to make a pull request for bug fixes or optimization.  