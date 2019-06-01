// Init Github
const github = new Github();
// Init UI Class
const ui = new UI();
// Search input
const searchUser = document.getElementById("searchUser");

// Search input event listener
searchUser.addEventListener("keyup", e => {
    // Get input text
    const userText = e.target.value;

    if (userText != "") {
        // Make HTTP call
        github.getUser(userText).then(data => {
            if (data.profile.message === "Not Found") {
                ui.clearProfile();
                ui.showAlert("User not found", "alert alert-danger");
            } else {
                // Show Profile
                ui.clearAlert();
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    } else {
        // Clear Profile
        ui.clearProfile();
    }
});