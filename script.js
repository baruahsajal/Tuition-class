// ==========================================
// S.BARUAH ACADEMY MAINFRAME - CORE LOGIC
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ist-clock')) startISTClock();
    if (document.getElementById('studentGraph')) initializeDynamicGraph();
    if (document.getElementById('payment-history-table')) loadPayments();
});

// ==== GLOBAL UTILITIES ====
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.style.right = sidebar.style.right === '0px' ? '-300px' : '0px';
    }
}

function startISTClock() {
    const clockElement = document.getElementById('ist-clock');
    setInterval(() => {
        const date = new Date();
        const options = { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        clockElement.innerText = `IST: ${date.toLocaleTimeString('en-US', options)}`;
    }, 1000);
}

// ==== AUTHENTICATION PORTAL ====
function checkLogin() {
    const idInput = document.getElementById('portal-id').value;
    if (idInput === "SB-ADMIN-2026") {
        document.body.innerHTML += `<div style="position:fixed; inset:0; background:var(--neon); z-index:9999; animation: flash 0.5s forwards;"></div>`;
        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 500);
    } else {
        alert("ACCESS DENIED: Invalid Biometric/ID Signature.");
    }
}

// ==== NEW: PAYMENT LEDGER SYSTEM (Local Storage) ====
function logPayment() {
    const student = document.getElementById('ledger-student').value;
    const month = document.getElementById('ledger-month').value;
    const amount = document.getElementById('ledger-amount').value;

    if (!student || !month || !amount) {
        alert("System Error: All fields must be filled to log a transaction.");
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    const newTransaction = { date: today, student: student, month: month, amount: amount };

    // Fetch existing records from LocalStorage
    let records = JSON.parse(localStorage.getItem('baruahAcademyPayments')) || [];
    records.push(newTransaction);
    
    // Save back to LocalStorage
    localStorage.setItem('baruahAcademyPayments', JSON.stringify(records));

    // Clear inputs and reload table
    document.getElementById('ledger-student').value = '';
    document.getElementById('ledger-month').value = '';
    document.getElementById('ledger-amount').value = '';
    loadPayments();
}

function loadPayments() {
    const tableBody = document.getElementById('payment-history-table');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    const records = JSON.parse(localStorage.getItem('baruahAcademyPayments')) || [];

    if (records.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:15px; color:#94a3b8;">No transactions found in local memory.</td></tr>`;
        return;
    }

    // Load records in reverse order (newest first)
    records.slice().reverse().forEach(record => {
        const row = `
            <tr style="border-bottom: 1px solid rgba(0,255,0,0.2);">
                <td style="padding: 10px; color: #94a3b8;">${record.date}</td>
                <td style="padding: 10px; color: #fff;">${record.student}</td>
                <td style="padding: 10px; color: #cbd5e1;">${record.month}</td>
                <td style="padding: 10px; color: var(--neon-green); font-weight: bold;">₹${record.amount}</td>
                <td style="padding: 10px;"><span style="background: rgba(0,255,0,0.1); color: var(--neon-green); padding: 2px 6px; border-radius: 4px; font-size: 0.8rem;">VERIFIED</span></td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// ==== COURSE SELECTION TERMINAL ====
function selectCourse(grade, price) {
    document.querySelectorAll('.fee-card').forEach(card => {
        card.classList.remove('selected');
        card.style.borderColor = "var(--border)";
        card.style.boxShadow = "none";
    });

    const selectedCard = document.getElementById(`card-${grade}`);
    if (selectedCard) {
        selectedCard.classList.add('selected');
        selectedCard.style.borderColor = "var(--neon)";
        selectedCard.style.boxShadow = "var(--neon-glow)";
        
        const qrImg = document.getElementById('dynamic-qr');
        if (qrImg) {
            document.getElementById('qr-loading').style.display = 'flex';
            const upiLink = `upi://pay?pa=sajalbaruah0614@upi&pn=Sajal%20Baruah&am=${price}&cu=INR`;
            qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(upiLink)}`;
            qrImg.onload = () => document.getElementById('qr-loading').style.display = 'none';
        }
    }
}

// ==== STUDENT PERFORMANCE GRAPH ====
let studentChart;
function initializeDynamicGraph() {
    const ctx = document.getElementById('studentGraph');
    if (!ctx) return;

    Chart.defaults.color = '#0ff';
    Chart.defaults.font.family = 'monospace';

    studentChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Physics Logic', 'Math Agility', 'Assignment Speed', 'Test Accuracy', 'Module Completion'],
            datasets: [{
                label: 'Student Neural Link Status',
                data: [0, 0, 0, 0, 0],
                backgroundColor: 'rgba(0, 255, 255, 0.2)',
                borderColor: '#0ff',
                pointBackgroundColor: '#f0f',
                pointBorderColor: '#fff',
            }]
        },
        options: {
            scales: { r: { angleLines: { color: 'rgba(0, 255, 255, 0.2)' }, grid: { color: 'rgba(0, 255, 255, 0.2)' } } },
            maintainAspectRatio: false
        }
    });
}

function updateStudentList(classSelectId, studentSelectId) {
    const classId = document.getElementById(classSelectId).value;
    const studentSelect = document.getElementById(studentSelectId);
    if (!studentSelect) return;

    studentSelect.innerHTML = '<option value="">-- Select Subject ID --</option>';
    
    const mockDb = {
        "8": ["NK8 - Nikhil Kurmi", "SK8 - Sita Karmakar"],
        "9": ["PK9 - Pranku Kurmi", "AU9 - Antara Uria", "AB9 - Ayush Barua"]
    };

    if (mockDb[classId]) {
        mockDb[classId].forEach(student => {
            studentSelect.innerHTML += `<option value="${student}">${student}</option>`;
        });
    }
}

function updateGraph() {
    if (!studentChart) return;
    const newData = Array.from({length: 5}, () => Math.floor(Math.random() * 100));
    studentChart.data.datasets[0].data = newData;
    studentChart.update();
}

// ==== AI CONSTRUCT ====
function toggleAIChat() {
    const chat = document.getElementById('ai-chat-window');
    if (chat) chat.style.display = chat.style.display === 'block' ? 'none' : 'block';
}

function simulateAIResponse() {
    const input = document.getElementById('ai-input');
    const history = document.getElementById('chat-history');
    if (!input.value.trim()) return;

    history.innerHTML += `<div style="color: #fff; text-align: right; margin: 10px 0; font-size: 0.9rem;">> ${input.value}</div>`;
    
    setTimeout(() => {
        const responses = [
            "Calculating velocity parameters... The trajectory requires a foundational understanding of inertia.",
            "Accessing mathematical arrays. Please refer to Sector 09 Polynomial notes.",
            "Logic anomaly detected. Rerouting conceptual framework to Newton's Third Law."
        ];
        const reply = responses[Math.floor(Math.random() * responses.length)];
        history.innerHTML += `<div class="ai-message" style="color: var(--neon); background: rgba(0,255,255,0.1); padding: 8px; border-left: 2px solid var(--neon); font-size: 0.9rem; margin-bottom: 10px;">NEXUS: ${reply}</div>`;
        history.scrollTop = history.scrollHeight;
    }, 800);
    
    input.value = '';
}

// ==== HOLOGRAPHIC DATA VAULT ====
function triggerAlienVault(chapterName) {
    const overlay = document.getElementById('alien-door-overlay');
    const status = document.getElementById('verify-status');
    const btn = document.getElementById('secure-download-btn');
    
    if(overlay) {
        overlay.style.display = 'flex';
        status.innerText = "SCANNING BIOMETRICS...";
        status.style.color = "#fff";
        btn.style.display = 'none';

        setTimeout(() => {
            status.innerText = `ACCESS GRANTED: ${chapterName.toUpperCase()}`;
            status.style.color = "var(--neon-green)";
            btn.style.display = 'inline-block';
        }, 2000);
    }
}

function openNote(chapterId, chapterTitle, type) {
    const modal = document.getElementById('reader-modal');
    const headerTitle = document.getElementById('reader-chapter-title');
    const bodyContent = document.getElementById('reader-dynamic-body');
    if(!modal) return;

    const color = type === 'math' ? '#f0f' : '#0ff';
    document.querySelector('.reader-content').style.borderColor = color;
    document.querySelector('.reader-content').style.boxShadow = `0 0 15px ${color}`;
    headerTitle.style.color = color;

    headerTitle.innerText = "DECRYPTING MAINFRAME...";
    bodyContent.innerHTML = `<div style="text-align:center; padding-top: 100px;"><i class="fas fa-circle-notch fa-spin fa-3x" style="color: ${color};"></i></div>`;
    modal.classList.add('active');

    setTimeout(() => {
        headerTitle.innerHTML = `<i class="fas ${type === 'math' ? 'fa-square-root-variable' : 'fa-atom'}"></i> ${chapterTitle}`;
        bodyContent.innerHTML = `
            <div style="padding: 10px; color: #cbd5e1;">
                <h2 style="color: #fff; margin-bottom: 20px;">Module Diagnostics</h2>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-left: 4px solid ${color}; border-radius: 4px;">
                    <p style="font-family: monospace;">// INSTRUCTOR OVERRIDE ACTIVATED<br>// Load PDF, Math formulas, or embedded content for <strong>${chapterId}</strong> here.</p>
                </div>
            </div>
        `;
    }, 1000);
}

function closeNote() { 
    const modal = document.getElementById('reader-modal');
    if(modal) modal.classList.remove('active'); 
}

// ==== HTML5 CANVAS OBSTACLE SIMULATOR ====
function initializeFlightGameSimulator() {
    const gameContainer = document.getElementById('game-matrix-container');
    if(!gameContainer) return;

    gameContainer.innerHTML = `
        <div class="glass" style="border-color: #ffaa00; text-align: center; background: rgba(255,170,0,0.05);">
            <h3 style="color: #ffaa00;"><i class="fas fa-gamepad"></i> FlightGame Matrix initialized</h3>
            <p style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 15px;">Awaiting pilot input. Ready for physics calculations.</p>
            <button class="btn" style="border-color: #ffaa00; color: #ffaa00;" onclick="startFlightSimulator()">Inject Canvas Assets</button>
            <canvas id="flightCanvas" width="400" height="300" style="display:none; width:100%; border: 1px solid #ffaa00; margin-top:15px; border-radius: 8px; background:#000;"></canvas>
        </div>
    `;
}

function startFlightSimulator() {
    alert("System Booting: Stand by for FlightGame custom assets load... (Requires your specific bird image and audio files to run)");
    document.getElementById('flightCanvas').style.display = 'block';
}
