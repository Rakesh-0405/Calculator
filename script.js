const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const specialChars = ["%", "*", "/", "-", "+", "="];
let output = "";

buttons.forEach(button => {
    button.addEventListener("mousedown", () => {
        button.classList.add("pressed");
    });
    
    button.addEventListener("mouseup", () => {
        button.classList.remove("pressed");
    });
    
    button.addEventListener("mouseleave", () => {
        button.classList.remove("pressed");
    });
});

const calculate = (btnValue) => {
    display.focus();
    if (btnValue === "=" && output !== "") {
        try {
            output = eval(output.replace("%", "/100")).toString();
            if (output.endsWith(".0")) {
                output = output.slice(0, -2);
            }
        } catch (error) {
            output = "Error";
        }
    } else if (btnValue === "AC") {
        output = "";
    } else if (btnValue === "DEL") {
        output = output.toString().slice(0, -1);
    } else {
        if (output === "" && specialChars.includes(btnValue)) return;
        output += btnValue;
    }
    display.value = output || "0";
};

buttons.forEach((button) => {
    button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});

document.addEventListener("keydown", (e) => {
    const key = e.key;
    
    if ((key >= "0" && key <= "9") || 
        key === "." || 
        key === "%" || 
        key === "+" || 
        key === "-" || 
        key === "*" || 
        key === "/") {
        calculate(key);
    } else if (key === "Enter") {
        calculate("=");
    } else if (key === "Backspace") {
        calculate("DEL");
    } else if (key === "Escape") {
        calculate("AC");
    }
    
    const button = Array.from(buttons).find(btn => 
        btn.dataset.value === key || 
        (key === "Enter" && btn.dataset.value === "=") ||
        (key === "Backspace" && btn.dataset.value === "DEL") ||
        (key === "Escape" && btn.dataset.value === "AC")
    );
    
    if (button) {
        button.classList.add("pressed");
        setTimeout(() => button.classList.remove("pressed"), 200);
    }
});