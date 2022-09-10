let optionsButton = document.querySelectorAll('.option-button');
let advancedOptionButton = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById('createLink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

// List of fontlist
let fontList = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "cursive",
    "Philosopher"
];

// Initial setting
const initializer = () => {
    // function call for highlighting buttons
    // no highlignting for link, unlink, list, undo, redo since they are one time ops
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // fontname options
    fontList.map(value => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // fontsize allows till 7
    for (let i = 1; i <= 7; i++){
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option)
    }

    // default font size
    fontSizeRef.value = 3;
};


// Main Logic
const modifyText = (command, defaultUi, value) => {
    // execCommand executes a command
    document.execCommand(command, defaultUi, value);
}

// ops that dont need value parameters
optionsButton.forEach(button => {
    button.addEventListener("click", () => {
        modifyText(button.id, false, null);
    });
});

// ops that reqiure value paramenters
advancedOptionButton.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value)
    })
})

// link adding
linkButton.addEventListener('click', () => {
    let userLink = prompt("Enter a URL");
    // if link has http then pass direct else add http
    if (/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink)
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
})
// highlighting clicked button
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            // needsRemoval = true means only one button should be higlighted and the other should be removed
            if (needsRemoval) {
                let alreadyActive = false;
    
                // if currently clicked button is already active...
                if (button.classList.contains("active")) {
                    alreadyActive = true;
                }
    
                // remove  highlight from others
                highlighterRemover(className);
                if (!alreadyActive) {
                    // highlight clicked button
                    button.classList.add("active");
                }
            } else {
                // if others highlightable
                button.classList.toggle("active");
            }
        });
    });
};


const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};




window.onload = initializer();