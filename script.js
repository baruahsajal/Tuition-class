// 1. Sidebar Toggle
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// 2. High-Precision IST Clock
function updateISTClock() {
    const clockElement = document.getElementById('ist-clock');
    if (!clockElement) return;

    const options = {
        timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', 
        year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    };
    const now = new Date().toLocaleString('en-IN', options);
    clockElement.innerHTML = `<i class="fas fa-clock"></i> ${now}`;
}
setInterval(updateISTClock, 1000);
updateISTClock();

// 3. Dynamic Course Selection & QR Generator
function selectCourse(classNumber, amount) {
    const cards = document.querySelectorAll('.fee-card');
    cards.forEach(card => card.classList.remove('selected'));
    
    const targetCard = document.getElementById(`card-${classNumber}`);
    if(targetCard) targetCard.classList.add('selected');
    
    const qrImage = document.getElementById('dynamic-qr');
    const qrLoading = document.getElementById('qr-loading');
    
    if(qrImage && qrLoading) {
        qrLoading.style.display = 'flex';
        const pa = 'sajalbaruah0614@upi';
        const pn = 'Sajal Baruah';
        const upiLink = `upi://pay?pa=${pa}&pn=${pn}&am=${amount}&cu=INR`;
        
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiLink)}`;
        
        setTimeout(() => {
            qrLoading.style.display = 'none';
        }, 500);
    }
}

// 4. Secure Student Portal Logic (Case-Insensitive)
function checkLogin() {
    const inputField = document.getElementById('portal-id');
    const userInput = inputField.value.trim().toLowerCase(); 
    const correctID = "sajalbaruah2005_10_9";

    if (userInput === correctID) {
        alert("Login Successful! Redirecting...");
        window.location.href = "dashboard.html";
    } else {
        alert("Access Denied. You typed: '" + inputField.value + "' - Please check for typos or contact Sajal Sir.");
    }
}
