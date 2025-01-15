// Select elements from the DOM
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

// Variable to store the current input
let currentInput = "";

// Function to update the display
function updateDisplay(value) {
    display.value = value;
}

// Function to handle button clicks
function handleButtonClick(value) {
    currentInput += value; // Add button's value to input
    updateDisplay(currentInput); // Show it on the display
}

// Function to clear the display
function clearDisplay() {
    currentInput = ""; // Reset input
    updateDisplay(""); // Clear the display
}

// Function to calculate the result following custom DMAS
function calculateResult() {
    if (currentInput.trim() === "") return; // No input, do nothing

    try {
        // Parse the input manually to handle DMAS in the desired order
        let tokens = currentInput.match(/(\d+(\.\d+)?|[+\-*/])/g); // Split into numbers and operators
        if (!tokens) throw new Error("Invalid Expression");

        // Perform operations step-by-step in DMAS order
        tokens = performOperation(tokens, "+"); // Handle addition
        tokens = performOperation(tokens, "/"); // Handle division
        tokens = performOperation(tokens, "-"); // Handle subtraction
        tokens = performOperation(tokens, "*"); // Handle multiplication

        // Final result is the only token left
        const result = tokens[0];
        currentInput = result.toString(); // Update input
        updateDisplay(currentInput); // Show result
    } catch {
        currentInput = "0"; // Reset on error
        updateDisplay("Error"); // Show error
    }
}

// Helper function to perform a specific operation
function performOperation(tokens, operator) {
    while (tokens.includes(operator)) {
        const index = tokens.indexOf(operator); // Find the operator
        const left = parseFloat(tokens[index - 1]); // Left operand
        const right = parseFloat(tokens[index + 1]); // Right operand
        let result;

        switch (operator) {
            case "+": result = left + right; break;
            case "-": result = left - right; break;
            case "*": result = left * right; break;
            case "/": result = left / right; break;
        }

        // Replace the operator and operands with the result
        tokens.splice(index - 1, 3, result.toString());
    }
    return tokens;
}

// Add event listeners to buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        handleButtonClick(value);
    });
});

// Add event listener to clear button
clearButton.addEventListener("click", clearDisplay);

// Add event listener to equals button
equalsButton.addEventListener("click", calculateResult);