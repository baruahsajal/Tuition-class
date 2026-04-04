// 1. Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('active');
}

// 2. High-Precision IST Clock (Date + Time)
function updateClock() {
    const clock = document.getElementById('ist-clock');
    if(clock) {
        const now = new Date();
        const options = { 
            timeZone: 'Asia/Kolkata', 
            weekday: 'short', day: '2-digit', month: 'short',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        };
        clock.innerHTML = `<i class="fas fa-clock"></i> IST: ${now.toLocaleString('en-IN', options)}`;
    }
}
setInterval(updateClock, 1000);
updateClock();

// 3. Student Login System
function checkLogin() {
    const inputID = document.getElementById('login-pass').value.toLowerCase().trim();
    
    // LIST OF ACCESSIBLE IDs
    const authorizedIDs = [
        "sajalbaruah2005_10_9",
        "student2026_9_1",
        "admin_sajal"
    ];

    if (authorizedIDs.includes(inputID)) {
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Invalid Student ID! Please check your ID or contact Sajal Sir.");
    }
}
