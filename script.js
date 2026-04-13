// Sidebar Toggle
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// IST Clock & Form Filler
function getISTString() {
    const options = {
        timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', 
        year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    };
    return new Date().toLocaleString('en-IN', options);
}

function updateISTClock() {
    const clockElement = document.getElementById('ist-clock');
    if (clockElement) clockElement.innerHTML = `<i class="fas fa-clock"></i> ${getISTString()}`;
}
setInterval(updateISTClock, 1000);
updateISTClock();

// QR Code Dynamics
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
        setTimeout(() => { qrLoading.style.display = 'none'; }, 500);
    }
}

// Portal Login
function checkLogin() {
    const inputField = document.getElementById('portal-id');
    const userInput = inputField.value.trim().toLowerCase(); 
    const correctID = "sajalbaruah2005_10_9";

    if (userInput === correctID) {
        window.location.href = "dashboard.html";
    } else {
        alert("Access Denied. You typed: '" + inputField.value + "' - Please check for typos.");
    }
}

// Modals
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    if(modalId === 'attendanceModal') {
        document.getElementById('att-time').value = getISTString();
    } else if (modalId === 'paymentModal') {
        document.getElementById('pay-time').value = getISTString();
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// Student ID Dropdown Generator (A-Z)
function updateStudentList(classSelectId, studentSelectId) {
    const classVal = document.getElementById(classSelectId).value;
    const studentSelect = document.getElementById(studentSelectId);
    
    studentSelect.innerHTML = '<option value="">-- Select Student ID --</option>'; 
    
    if(!classVal) return; 

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    for(let i = 0; i < alphabet.length; i++) {
        const studentID = `${alphabet[i]}${classVal}`; 
        const option = document.createElement('option');
        option.value = studentID;
        option.text = `Student ${studentID}`;
        studentSelect.appendChild(option);
    }
}

// Graph Engine
let studentChart = null;

function updateGraph() {
    const studentID = document.getElementById('graphStudentSelect').value;
    const canvas = document.getElementById('studentGraph');
    
    if(!studentID || !canvas) return;
    const ctx = canvas.getContext('2d');
    if(studentChart != null) { studentChart.destroy(); }

    const mathScores = Array.from({length: 6}, () => Math.floor(Math.random() * 40) + 60);
    const sciScores = Array.from({length: 6}, () => Math.floor(Math.random() * 40) + 60);

    if (typeof Chart !== 'undefined') {
        Chart.defaults.color = '#94a3b8';
        Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

        studentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [
                    { label: 'Math Performance (%)', data: mathScores, borderColor: '#0ff', backgroundColor: 'rgba(0, 255, 255, 0.1)', borderWidth: 2, tension: 0.4, fill: true },
                    { label: 'Science Performance (%)', data: sciScores, borderColor: '#f0f', backgroundColor: 'rgba(255, 0, 255, 0.1)', borderWidth: 2, tension: 0.4, fill: true }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { title: { display: true, text: `Analytics for Student ${studentID}`, color: '#fff', font: { size: 16, weight: 'bold' } } },
                scales: {
                    y: { min: 40, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } },
                    x: { grid: { color: 'rgba(255,255,255,0.05)' } }
                }
            }
        });
    }
}
