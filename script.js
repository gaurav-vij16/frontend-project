const displaySlider = document.querySelector(".slider");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

let password = "";
let passwordLength = 10;

handleSlider();



function handleSlider() {
    displaySlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength; // or innerText
}

const indicator = document.querySelector("[data-indicator]");

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// random integer
function getRandInteger(max, min) {
    return Math.floor(Math.random() * (max - min)) + min; 
}

function getRandomNumber() {
    return getRandInteger(0, 9);
}

// lowercase

function getLowerCase() {
    return String.fromCharCode(getRandInteger(97, 123)); 
    // string from charcode converts integers into characters
}

function getUppercase() {
    return String.fromCharCode(getRandInteger(65, 91));
}

function getRandomSymbol() {
    const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', '{', '}', '[', ']', '|', '\\', ':', ';', '"', '\'', '<', '>', ',', '.', '?', '/'];
    const randomIndex = Math.floor(Math.random() * symbols.length);
    return symbols[randomIndex];
}

const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");

// strength checker 
function strengthCheck() {
    if (uppercase.checked && lowercase.checked && numbers.checked && symbols.checked && passwordLength >= 8) {
        setIndicator("green");
    } else if ((uppercase.checked || lowercase.checked) && numbers.checked && symbols.checked && passwordLength <= 7) {
        setIndicator("orange");
    } else {
        setIndicator("red");
    }
}

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyMsg = document.querySelector("[data-copyMsg]");

async function copycontent() {
    try {
        await navigator.clipboard.readText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    } catch (error) {
        copyMsg.innerText = "try again";
    }
    // for css
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    }, 2000);
}

const inputSlider = document.querySelector("[data-lengthSlider]");

inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

const copyBtn = document.querySelector("[data-copy]");

copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        copycontent();
    }
});

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

function handlecheckbox() {
    checkCount = 0;
    allCheckBox.forEach(function(checkbox) {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckBox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckbox);
});

const generateBtn = document.querySelector(".generateButton");

generateBtn.addEventListener('click', () => {
    if (checkCount <= 0) return;

    if (checkCount > passwordLength) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";
    // creating an array for generating password
    const Array = [];

    if (uppercase.checked) {
        Array.push(getUppercase);
    }

    if (lowercase.checked) {
        Array.push(getLowerCase);
    }

    if (numbers.checked) {
        Array.push(getRandomNumber);
    }

    if (symbols.checked) {
        Array.push(getRandomSymbol);
    }

    for (let i = 0; i < Array.length; i++) {
        password += Array[i]();
    }

    //remaining password
    
        let remainingLength = passwordLength - Array.length;
        for (let i = 0; i < remainingLength; i++) {
            let randomIndex = getRandInteger(0, Array.length);
            password += Array[randomIndex]();
        }

        passwordDisplay.value = password;

    strengthCheck();
});
