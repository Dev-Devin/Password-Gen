// Assignment code here


randomFunc = {
  lower: () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  },
  upper: () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  },
  number: () => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
  },
  symbol: () => {
    var symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
  }
}

generatePasswordWithCriteria = (passwordLength, hasLowercase, hasUppercase, hasNumeric, hasSpecial) => {
  var password = ""; // Empty string that will store password
  var typesCount = hasLowercase + hasUppercase + hasNumeric + hasSpecial;
  var typesArr = [{
      lower: hasLowercase
    }, {
      upper: hasUppercase
    }, {
      number: hasNumeric
    }, {
      symbol: hasSpecial
    }]
    .filter(item => Object.values(item)[0]);
  for (var i = 0; i < passwordLength; i += typesCount) {
    typesArr.forEach(type => {
      var funcName = Object.keys(type)[0];
      password += randomFunc[funcName]();
    });
  }

  var finalPassword = password.slice(0, passwordLength);
  return finalPassword;
}

// Generate Password
generatePassword = () => {
  // Shows pop up to ask for password requirements
  var passwordLength = prompt("How many characters would you like your password to contain?");
  var passwordLength = parseInt(passwordLength);

  // Check if password length is between 8 and 128 characters
  if (passwordLength < 8 || passwordLength > 128) {
    alert("Password length must be between 8 and 128 characters");
    return;
  }


  var hasLowercase = confirm("Click OK to confirm including lowercase characters");
  var hasUppercase = confirm("Click OK to confirm including uppercase characters");
  var hasNumeric = confirm("Click OK to confirm including numeric characters");
  var hasSpecial = confirm("Click OK to confirm including special characters");

  // Check if user chose one character type
  if (!hasLowercase && !hasUppercase && !hasNumeric && !hasSpecial) {
    alert("Must select at least one character type");
    return;
  }

  //Generate password with given criteria
  return generatePasswordWithCriteria(passwordLength, hasLowercase, hasUppercase, hasNumeric, hasSpecial);
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword() || "Invalid password criteria";

  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);