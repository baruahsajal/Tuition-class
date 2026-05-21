// Database Array
const academyStudents = [
    { id: "PK9", name: "Pranku Kurmi", class: "9", fee: 500, due_day: 2 },
    { id: "AU9", name: "Antara Uria", class: "9", fee: 500, due_day: 2 },
    { id: "NK8", name: "Nikhil Kurmi", class: "8", fee: 400, due_day: 2 },
    { id: "AB9", name: "Ayush Barua", class: "9", fee: 500, due_day: 7 },
    { id: "SK8", name: "Sita Karmakar", class: "8", fee: 400, due_day: 18 }
];

// Dropdown Loader
function updateStudentList(classSelectId, studentSelectId) {
    const classVal = document.getElementById(classSelectId).value;
    const studentSelect = document.getElementById(studentSelectId);
    studentSelect.innerHTML = '<option value="">-- Select Subject ID --</option>'; 
    if(!classVal) return; 
    const targets = academyStudents.filter(s => s.class === classVal);
    targets.forEach(student => {
        const option = document.createElement('option'); option.value = student.id; option.text = `${student.name} [ID: ${student.id}]`;
        studentSelect.appendChild(option);
    });
}

// Gamification XP Engine
let currentXP = parseInt(localStorage.getItem('nexus_xp')) || 0;
function updateGamification() {
    const level = Math.floor(currentXP / 1000) + 1;
    const progress = (currentXP % 1000) / 10;
    document.getElementById('xp-counter').innerText = currentXP;
    document.getElementById('user-level').innerText = level;
    document.getElementById('xp-bar').style.width = `${progress}%`;
    localStorage.setItem('nexus_xp', currentXP);
}
document.addEventListener('DOMContentLoaded', updateGamification);

// Advanced Radar Analytics
let studentChart = null;
function updateGraph() {
    const id = document.getElementById('graphStudentSelect').value;
    const canvas = document.getElementById('studentGraph');
    if(!id || !canvas) return;
    const ctx = canvas.getContext('2d');
    if(studentChart) studentChart.destroy();

    const skillData = [ Math.floor(Math.random() * 40)+60, Math.floor(Math.random() * 40)+60, Math.floor(Math.random() * 40)+60, Math.floor(Math.random() * 40)+60, Math.floor(Math.random() * 40)+60 ];
    
    studentChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Physics Logic', 'Chem Equations', 'Bio Retention', 'Algebra', 'Geometry'],
            datasets: [{ label: 'Cognitive Scan', data: skillData, borderColor: '#f0f', backgroundColor: 'rgba(255, 0, 255, 0.2)', borderWidth: 2 }]
        },
        options: {
            responsive: true, maintainAspectRatio: false,
            scales: { r: { angleLines: { color: 'rgba(255, 0, 255, 0.2)' }, grid: { color: 'rgba(255, 0, 255, 0.2)' }, pointLabels: { color: '#0ff', font: { family: 'monospace' } }, ticks: { display: false, min: 0, max: 100 } } },
            plugins: { legend: { display: false } }
        }
    });
}

// AI Tutor Simulation
function toggleAIChat() { document.getElementById('ai-chat-window').classList.toggle('active'); }
function simulateAIResponse() {
    const input = document.getElementById('ai-input');
    const history = document.getElementById('chat-history');
    const q = input.value.trim();
    if (!q) return;
    history.innerHTML += `<div class="user-message">${q}</div>`;
    input.value = '';
    setTimeout(() => {
        history.innerHTML += `<div class="ai-message" id="typing-indicator">> Neural net processing...</div>`;
        history.scrollTop = history.scrollHeight;
        setTimeout(() => {
            document.getElementById('typing-indicator').remove();
            history.innerHTML += `<div class="ai-message">> Accessing matrix for "${q}".<br>> Note: Backend logic linkage disabled in static environment. Please consult Sajal Baruah for manual override.</div>`;
            history.scrollTop = history.scrollHeight;
        }, 1500);
    }, 400);
}

// =========================================
// ALIEN DOOR VERIFICATION PROTOCOL
// =========================================
function triggerAlienVault(chapterName) {
    const overlay = document.getElementById('alien-door-overlay');
    const status = document.getElementById('verify-status');
    const sub = document.getElementById('verify-sub');
    const scanner = document.getElementById('scanner-line');
    const downloadBtn = document.getElementById('secure-download-btn');
    const doorLeft = document.querySelector('.alien-door.left');
    const doorRight = document.querySelector('.alien-door.right');

    // Reset State
    doorLeft.classList.remove('open');
    doorRight.classList.remove('open');
    downloadBtn.style.display = 'none';
    scanner.style.opacity = '1';
    overlay.style.display = 'flex';
    
    // Sequence 1: Init
    status.innerText = "INITIATING BIOMETRIC SCAN...";
    sub.innerText = `Target: ${chapterName}`;
    status.style.color = "var(--neon)";

    // Sequence 2: Verifying
    setTimeout(() => {
        status.innerText = "DECRYPTING SECTOR...";
        status.style.color = "#f0f";
    }, 1500);

    // Sequence 3: Access Granted & Doors Open
    setTimeout(() => {
        scanner.style.opacity = '0';
        status.innerText = "ACCESS GRANTED";
        status.style.color = "#00ff00";
        sub.innerText = "Welcome to the Data Vault.";
        
        // Grant XP for opening a module
        currentXP += 50;
        updateGamification();

        // Open Doors
        setTimeout(() => {
            doorLeft.classList.add('open');
            doorRight.classList.add('open');
            
            // Show Download Button inside the transparent gap
            setTimeout(() => {
                downloadBtn.style.display = 'inline-block';
            }, 800);
            
        }, 500);
    }, 3000);
}

// Click outside to close overlay once doors are open
document.getElementById('alien-door-overlay').addEventListener('click', function(e) {
    if (e.target === this && document.querySelector('.alien-door.left').classList.contains('open')) {
        this.style.display = 'none';
    }
});
