// Sidebar Toggle
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Secure Portal Logic
function checkLogin() {
    // 1. Get the value the user typed in
    const userInput = document.getElementById('portal-id').value.trim();
    
    // 2. Set your common ID exactly as requested
    const correctID = "SAJALBaruah2005_10_9";

    // 3. Check if they match
    if (userInput === correctID) {
        alert("Login Successful! Redirecting to Dashboard...");
        window.location.href = "dashboard.html";
    } else {
        alert("Access Denied. Please contact Sajal Sir for your ID.");
    }
}
