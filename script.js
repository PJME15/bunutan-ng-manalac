// Get elements
const drawButton = document.getElementById('drawButton');
const nameList = document.getElementById('nameList');
const userNameInput = document.getElementById('userName');
const validateNameButton = document.getElementById('validateNameButton');

// Define the allowed names (the names users can enter)
const allowedNames = ["Erika", "Joy", "MJ", "Khian", "erika", "joy", "mj", "khian"];

// Predefined list of names (the ones eligible to be drawn)
let names = [
    "Tito Bobet", "Tita Bebe", "Angel", "Janjan", "Joyjoy", "Tito Abet", "Tita Nene", "Erika", "Aaron", "Jean", "Andrea", 
    "Aliya", "Tito Milo", "Tintin", "Khian", "Olim", "Kim", "Lola", "Tito Roger", "Tita Rina", "Badoy", "Manny", "MJ", "Zariyah"
];

// Track the number of picks for each user
let joyPicksCount = 0;
let erikaPicksCount = 0;
let khianPicksCount = 0;
let mjPicksCount = 0;

// Store the list of picked names for each user
let joyPickedNames = [];
let erikaPickedNames = [];
let khianPickedNames = [];
let mjPickedNames = [];

// Current active user
let currentUser = '';

// List of restricted names for each user
const joyRestrictedNames = ["Tito Bobet", "Tita Bebe", "Angel", "Janjan", "Joyjoy"];
const erikaRestrictedNames = ["Tito Abet", "Tita Nene", "Erika", "Aaron", "Jean", "Andrea", "Aliya"];
const khianRestrictedNames = ["Tito Milo", "Tintin", "Khian", "Olim", "Kim"];
const mjRestrictedNames = ["Lola", "Tito Roger", "Tita Rina", "Badoy", "Manny", "MJ", "Zariyah"];

// Function to update the displayed list of names
function updateNameList() {
    nameList.innerHTML = ""; // Clear the list

    names.forEach((name) => {
        const li = document.createElement('li');
        li.textContent = name;
        nameList.appendChild(li);
    });
}

// Function to handle user name validation
function validateUserName(userName) {
    // Check if the entered name is one of the allowed names
    if (allowedNames.includes(userName)) {
        // Show special message if Joy, Erika, Khian, or MJ is the user
        if (userName.toLowerCase() === "joy") {
            alert("Welcome Joy! You can only pick 5 names. After that, you won't be able to pick again.");
        } else if (userName.toLowerCase() === "erika") {
            alert("Welcome Erika! You can only pick 7 names. After that, you won't be able to pick again.");
        } else if (userName.toLowerCase() === "khian") {
            alert("Welcome Khian! You can only pick 5 names. After that, you won't be able to pick again.");
        } else if (userName.toLowerCase() === "mj") {
            alert("Welcome MJ! You can only pick 7 names. After that, you won't be able to pick again.");
        }

        // Set the current user and enable the "PICK" button
        currentUser = userName.toLowerCase();
        drawButton.disabled = false;
        userNameInput.disabled = true;
        validateNameButton.disabled = true;
    } else {
        alert("DON KA DI KA KASALI HAHAHAHAHA");
    }
}

// Function to handle drawing a random winner
function drawRandomWinner() {
    // Check if the user has reached their pick limit
    if (currentUser === "joy" && joyPicksCount >= 5) {
        alert("You have already picked 5 times, you cannot pick again.");
        drawButton.disabled = true;  // Disable the "PICK" button after 5 picks
        return;
    }

    if (currentUser === "erika" && erikaPicksCount >= 7) {
        alert("You have already picked 7 times, you cannot pick again.");
        drawButton.disabled = true;  // Disable the "PICK" button after 7 picks
        return;
    }

    if (currentUser === "khian" && khianPicksCount >= 5) {
        alert("You have already picked 5 times, you cannot pick again.");
        drawButton.disabled = true;  // Disable the "PICK" button after 5 picks
        return;
    }

    if (currentUser === "mj" && mjPicksCount >= 7) {
        alert("You have already picked 7 times, you cannot pick again.");
        drawButton.disabled = true;  // Disable the "PICK" button after 7 picks
        return;
    }

    // Filter out restricted names based on the user
    let availableNames = [...names]; // Copy the original names list to avoid mutating the original list

    if (currentUser === "mj") {
        availableNames = availableNames.filter(name => !mjRestrictedNames.includes(name));
    }

    if (currentUser === "khian") {
        availableNames = availableNames.filter(name => !khianRestrictedNames.includes(name));
    }

    if (currentUser === "erika") {
        availableNames = availableNames.filter(name => !erikaRestrictedNames.includes(name));
    }

    if (currentUser === "joy") {
        availableNames = availableNames.filter(name => !joyRestrictedNames.includes(name));
    }

    // Pick a random name from the available names
    if (availableNames.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNames.length);
        const winner = availableNames[randomIndex];

        // First, show the winner in SweetAlert2
        showWinnerAlert(winner);

        // Increment the pick count for the user
        if (currentUser === "joy") {
            joyPicksCount++;
            joyPickedNames.push(winner);  // Track the picked name for Joy
        } else if (currentUser === "erika") {
            erikaPicksCount++;
            erikaPickedNames.push(winner);  // Track the picked name for Erika
        } else if (currentUser === "khian") {
            khianPicksCount++;
            khianPickedNames.push(winner);  // Track the picked name for Khian
        } else if (currentUser === "mj") {
            mjPicksCount++;
            mjPickedNames.push(winner);  // Track the picked name for MJ
        }

        // Remove the picked name from the `names` list
        names.splice(names.indexOf(winner), 1);

        // Update the name list after removing the winner
        updateNameList();

        // After the pick, if the user has reached their limit, disable further input
        if (
            joyPicksCount >= 5 || erikaPicksCount >= 7 || khianPicksCount >= 5 || mjPicksCount >= 7
        ) {
            drawButton.disabled = true;  // Disable the "PICK" button
        }

        // Check if the user has finished their picks and show their picked names
        if (
            joyPicksCount >= 5 || erikaPicksCount >= 7 || khianPicksCount >= 5 || mjPicksCount >= 7
        ) {
            // Show all picked names in the alert
            showAllPickedNamesAlert();
            resetForNextUser();
        }
    }
}

// Function to show SweetAlert2 modal with the winner's name
function showWinnerAlert(winner) {
    Swal.fire({
        html: `<strong>→ ${winner} ←</strong>`,  // Display only the winner's name
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'btn-success'
        }
    }).then(() => {
        // After closing the alert, do not remove the winner immediately
        updateNameList(); // Update the name list after each draw
    });
}

// Function to show all picked names for the user
function showAllPickedNamesAlert() {
    let pickedNamesList = [];
    if (currentUser === "joy") {
        pickedNamesList = joyPickedNames;
    } else if (currentUser === "erika") {
        pickedNamesList = erikaPickedNames;
    } else if (currentUser === "khian") {
        pickedNamesList = khianPickedNames;
    } else if (currentUser === "mj") {
        pickedNamesList = mjPickedNames;
    }

    Swal.fire({
        title: 'Your Picks:',
        html: `<strong>${pickedNamesList.join("<br>")}</strong>`,  // Show all picked names
        icon: 'info',
        confirmButtonText: 'OK',
        customClass: {
            confirmButton: 'btn-info'
        }
    });
}

// Reset input and buttons for the next user
function resetForNextUser() {
    // Enable validation button and reset the input field for the next user
    validateNameButton.disabled = false;
    userNameInput.disabled = false;  
    userNameInput.value = "";  // Clear the input field

    // Reset user-specific counts (optional, to make sure it's fresh for the next user)
    currentUser = '';
    joyPicksCount = 0;
    erikaPicksCount = 0;
    khianPicksCount = 0;
    mjPicksCount = 0;
    joyPickedNames = [];
    erikaPickedNames = [];
    khianPickedNames = [];
    mjPickedNames = [];
}

// Handle the validation process when clicking the validate button
validateNameButton.addEventListener('click', () => {
    const userName = userNameInput.value.trim();
    validateUserName(userName);
});

// Handle the drawing process when clicking the draw button
drawButton.addEventListener('click', () => {
    drawRandomWinner();
});

// Initially update the name list when the page loads
updateNameList();
