// Parsing digits
const zero = document.getElementById("zero");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
const six = document.getElementById("six");
const seven = document.getElementById("seven");
const eight = document.getElementById("eight");
const nine = document.getElementById("nine");
const decimal = document.getElementById("decimal");

// Parsing operators that divide arguments
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");

// Parsing special operators
const negative = document.getElementById("negative");
const equal = document.getElementById("equal");
const clear = document.getElementById("clear");

// Parsing the display field of calculator
const input = document.getElementById("input");

const operators = {
  plus,
  minus,
  multiply,
  divide,
};

const digits = {
  zero,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  decimal,
};

input.value = 0;

// User will sequentially fill expression to be calculated

// First argument comes first
let firstArg;
// Then the operator (+ - / *) divide to arguments
let operator;
// Once user divided the arguments they can define the second argument
let secondArg;

let result;

// Getting rid of excessive decimal points in arguments
const getCleanedExcessiveDecimalPointsString = (string) => {
  let isDecimalExist = false;
  let result = string;

  for (let i = 0; i < result.length; i++) {
    if (result[i] === ".") {
      if (isDecimalExist) {
        let beforeDecimal = result.slice(0, i);
        let afterDecimal = result.slice(i + 1, result.length - 1);
        result = `${beforeDecimal}${afterDecimal}`;
      }

      isDecimalExist = true;
    }
  }

  return result;
};

// Handle click on digit buttons
const handleDigits = (e) => {
  // Parsing textcontent of a button to obtain en exact digit (value)
  let content = e.target.textContent.trim();

  // Firstly, filling the first arg
  if (!firstArg) {
    firstArg = content;
    input.value = firstArg;
  } else if (!operator && firstArg) {
    firstArg += content;
    firstArg = getCleanedExcessiveDecimalPointsString(firstArg);
    input.value = firstArg;
  }

  // After operator is set we can fill the second arg
  if (operator && !secondArg) {
    secondArg = content;
    input.value = `${firstArg} ${operator} ${secondArg}`;
  } else if (operator && secondArg) {
    secondArg += content;
    secondArg = getCleanedExcessiveDecimalPointsString(secondArg);
    input.value = `${firstArg} ${operator} ${secondArg}`;
  }
};

const handleOperators = (e) => {
  const content = e.target.textContent.trim();

  if (firstArg && secondArg === undefined && content !== "=") {
    operator = content;

    if (operator === "✕") {
      operator = "*";
    }

    input.value = `${firstArg} ${operator}`;
  }
};

// Evaluate the result of expression
const handleEqualOperator = () => {
  if (!firstArg || !secondArg) {
    return;
  }

  if (firstArg === ".") {
    firstArg = "0";
  }

  if (secondArg === ".") {
    secondArg = "0";
  }

  if (firstArg && secondArg) {
    result = eval(`${firstArg} ${operator} ${secondArg}`);
    input.value = `${result}`;

    handleCleanup();
  }
};

const toggleNegative = (string) => {
  if (string[0] === "-") {
    string = string.slice(1, string.length);
  } else {
    string = `-${string}`;
  }
};

const handleNegative = () => {
  // Handling first arg
  if (firstArg && !secondArg && !operator) {
    toggleNegative(firstArg);
    input.value = firstArg;
    // Handling situtation when we have operator and don't have second arg yet
  } else if (firstArg && !secondArg && operator) {
    input.value = `${firstArg} ${operator}`;
    // Handling second arg
  } else if (secondArg) {
    toggleNegative(secondArg);
    input.value = `${firstArg} ${operator} ${secondArg}`;
  }
};

// Clean all the fileds so we can start again
const handleCleanup = () => {
  firstArg = undefined;
  secondArg = undefined;
  operator = undefined;
  result = undefined;
};

// Attach event listeners for digit buttons
for (let key in digits)
  digits[key].addEventListener("click", (e) => handleDigits(e));

// Attach event listeners for operator buttons
for (let key in operators)
  operators[key].addEventListener("click", (e) => handleOperators(e));

// Attaching listeners for special buttons
equal.addEventListener("click", handleEqualOperator);
negative.addEventListener("click", handleNegative);
clear.addEventListener("click", () => {
  handleCleanup();
  input.value = "0";
});
