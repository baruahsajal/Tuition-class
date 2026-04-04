// 1. Mobile Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('active');
}

// 2. High-Quality IST Clock
function updateClock() {
    const clock = document.getElementById('ist-clock');
    if(clock) {
        const now = new Date();
        const options = { 
            timeZone: 'Asia/Kolkata', 
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        };
        clock.innerHTML = `<i class="fas fa-calendar-alt"></i> ${now.toLocaleString('en-IN', options)}`;
    }
}
setInterval(updateClock, 1000);
updateClock();

// 3. Login Access
function checkLogin() {
    const input = document.getElementById('login-pass').value;
    if(input === "SAJAL2026") {
        window.location.href = "dashboard.html";
    } else {
        alert("Access Denied! Check your Student ID.");
    }
}
