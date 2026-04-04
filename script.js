// 1. Sidebar Toggle
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// 2. High-Precision IST Clock (Matches your request: Sat, 04 Apr 2026...)
function updateISTClock() {
    const clockElement = document.getElementById('ist-clock');
    if (!clockElement) return;

    const options = {
        timeZone: 'Asia/Kolkata',
        weekday: 'short', 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true
    };

    const now = new Date().toLocaleString('en-IN', options);
    clockElement.innerHTML = `<i class="fas fa-clock"></i> ${now}`;
}
setInterval(updateISTClock, 1000);
updateISTClock();

// 3. Secure Portal Logic
function checkLogin() {
    const userInput = document.getElementById('portal-id').value.trim();
    const correctID = "sajalbaruah2005_10_9";

    if (userInput === correctID) {
        alert("Access Granted. Welcome back!");
        window.location.href = "dashboard.html";
    } else {
        alert("❌ Access Denied: Invalid Student ID. Please contact Sajal Sir.");
    }
}
