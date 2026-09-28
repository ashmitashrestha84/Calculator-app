let currentNumber = "";
let previousNumber = "";
let operation = null;

const input = document.querySelector(".input");
const buttons = document.querySelectorAll(".button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.innerHTML;

    if (!isNaN(value)) {
      currentNumber += value;
    }

    else if (value === ".") {
      if (!currentNumber.includes(".")) {
        currentNumber += currentNumber ? "." : "0.";
      }
    }

    else if (["+", "-", "*", "/"].includes(value)) {
      if (currentNumber === "") return;

      if (previousNumber !== "") {
        calculate();
      }

      previousNumber = currentNumber;
      currentNumber = "";
      operation = value;
    }

    else if (value === "C") {
      currentNumber = "";
      previousNumber = "";
      operation = null;
    }

    else if (value === "X") {
      currentNumber = currentNumber.slice(0, -1);
    }

    else if (value === "%") {
      if (currentNumber !== "") {
        currentNumber = String(Number(currentNumber) / 100);
      }
    }

    else if (value === "=") {
      calculate();
    }

    input.value = currentNumber || "0";
  });
});

function calculate() {
  if (previousNumber === "" || currentNumber === "" || operation === null) {
    return;
  }

  const firstNumber = Number(previousNumber);
  const secondNumber = Number(currentNumber);

  if (operation === "+") {
    currentNumber = String(firstNumber + secondNumber);
  } else if (operation === "-") {
    currentNumber = String(firstNumber - secondNumber);
  } else if (operation === "*") {
    currentNumber = String(firstNumber * secondNumber);
  } else if (operation === "/") {
    if (secondNumber === 0) {
      currentNumber = "Error";
    } else {
      currentNumber = String(firstNumber / secondNumber);
    }
  }

  previousNumber = "";
  operation = null;
}
