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

const negative = document.getElementById("negative");

const input = document.getElementById("input");

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

const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const multiply = document.getElementById("multiply");
const divide = document.getElementById("divide");
const equal = document.getElementById("equal");

const clear = document.getElementById("clear");

const operators = {
  plus,
  minus,
  multiply,
  divide,
  equal,
};

let firstArg;
let secondArg;
let operator;
let result;

for (let key in digits) {
  digits[key].addEventListener("click", (e) => {
    if (firstArg === undefined) {
      firstArg = e.target.textContent.trim();
      input.value = firstArg;
    } else if (!operator && firstArg) {
      firstArg += e.target.textContent.trim();
      input.value = firstArg;
    }

    if (operator && secondArg === undefined) {
      secondArg = e.target.textContent.trim();
      input.value = `${firstArg} ${operator} ${secondArg}`;
    } else if (operator && secondArg) {
      secondArg += e.target.textContent.trim();
      input.value = `${firstArg} ${operator} ${secondArg}`;
    }
  });
}

const handleOperators = (e) => {
  if (
    firstArg &&
    secondArg === undefined &&
    e.target.textContent.trim() !== "="
  ) {
    operator = e.target.textContent.trim();

    if (operator === "✕") {
      operator = "*";
    }

    input.value = `${firstArg} ${operator}`;
  } else if (firstArg && secondArg && e.target.textContent.trim() === "=") {
    result = eval(`${firstArg} ${operator} ${secondArg}`);
    input.value = `${result}`;
    firstArg = undefined;
    secondArg = undefined;
    operator = undefined;
  }
};

for (let key in operators) {
  operators[key].addEventListener("click", (e) => handleOperators(e));
}

clear.addEventListener("click", () => {
  firstArg = undefined;
  secondArg = undefined;
  operator = undefined;
  result = undefined;
  input.value = "";
});

const handleNegative = () => {
  if (firstArg && !secondArg && !operator) {
    if (firstArg[0] === "-") {
      firstArg = firstArg.slice(1, firstArg.length);
    } else {
      firstArg = `-${firstArg}`;
    }

    input.value = firstArg;
  } else if (firstArg && !secondArg && operator) {
    input.value = `${firstArg} ${operator}`;
  } else if (secondArg) {
    if (secondArg[0] === "-") {
      secondArg = secondArg.slice(1, secondArg.length);
    } else {
      secondArg = `-${secondArg}`;
    }

    input.value = `${firstArg} ${operator} ${secondArg}`;
  }
};

negative.addEventListener("click", handleNegative);
