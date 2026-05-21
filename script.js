// Sidebar Toggle Architecture
function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
}

// Global Core Database Array Mapping Your Real Students
const academyStudents = [
    { id: "PK9", name: "Pranku Kurmi", class: "9", fee: 500, due_day: 2 },
    { id: "AU9", name: "Antara Uria", class: "9", fee: 500, due_day: 2 },
    { id: "NK8", name: "Nikhil Kurmi", class: "8", fee: 400, due_day: 2 },
    { id: "AB9", name: "Ayush Barua", class: "9", fee: 500, due_day: 7 },
    { id: "SK8", name: "Sita Karmakar", class: "8", fee: 400, due_day: 18 }
];

// Clean India Standard Time Formatting String
function getISTString() {
    const options = {
        timeZone: 'Asia/Kolkata', weekday: 'short', day: '2-digit', month: 'short', 
        year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    };
    return new Date().toLocaleString('en-IN', options);
}

function updateISTClock() {
    const clockElement = document.getElementById('ist-clock');
    const dashClock = document.getElementById('dashboard-clock');
    const timeStr = getISTString();

    if (clockElement) clockElement.innerHTML = `<i class="fas fa-clock"></i> ${timeStr}`;
    if (dashClock) dashClock.innerHTML = `<i class="fas fa-microchip"></i> System Time: ${new Date().toLocaleTimeString('en-IN', {timeZone: 'Asia/Kolkata'})}`;
}
setInterval(updateISTClock, 1000);
updateISTClock();

// =========================================
// INTERACTIVE DATA VAULT ENGINE (NEW)
// =========================================
function accessModule(chapterName, moduleCode) {
    const panelId = `panel-${moduleCode}`;
    const panel = document.getElementById(panelId);
    if (!panel) return;

    panel.classList.remove('active');
    
    // Simulate decryption processing
    setTimeout(() => {
        panel.innerHTML = `
            <div style="font-family: monospace; color: #94a3b8; font-size: 0.85rem; margin-bottom: 15px;">
                <span style="color: #10b981;">> Establishing secure connection...</span> <br>
                > Target Module: [${moduleCode}] <br>
                > Decrypting payload: <span style="color: var(--neon); font-weight: 800;">${chapterName}</span>... <span style="color: #10b981;">[100% DONE]</span>
            </div>
            <a href="#" class="btn" style="width: 100%; font-size: 0.9rem; padding: 12px; background: rgba(59, 130, 246, 0.1); border: 1px solid var(--neon); color: var(--neon); box-shadow: 0 0 15px rgba(96, 165, 250, 0.2);">
                <i class="fas fa-file-pdf"></i> Download Secure PDF
            </a>
        `;
        panel.classList.add('active');
    }, 200);
}

// Modern Dynamic Dashboard Table Matrix Loader
function buildFeeLedgerEngine() {
    const container = document.getElementById('ledger-table-body');
    if (!container) return;
    const currentDay = new Date().getDate();
    let dailyTargetSum = 0;
    let matchingDueList = [];

    container.innerHTML = "";

    academyStudents.forEach(student => {
        const isDueToday = (student.due_day === currentDay);
        let badgeStyle = "background: rgba(255,255,255,0.05); color: #94a3b8;";
        let statusText = "Pending Cycle";

        if (isDueToday) {
            badgeStyle = "background: rgba(239,68,68,0.2); color: #ef4444; border: 1px solid #ef4444; box-shadow: 0 0 10px rgba(239,68,68,0.4);";
            statusText = "DUE TODAY";
            dailyTargetSum += student.fee;
            matchingDueList.push(student.name);
        } else if (currentDay > student.due_day) {
            badgeStyle = "background: rgba(234,179,8,0.1); color: #eab308;";
            statusText = "Overdue Window";
        }

        const row = `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05); transition: 0.3s;" onmouseover="this.style.background='rgba(59, 130, 246, 0.1)'" onmouseout="this.style.background='transparent'">
                <td style="padding: 12px; font-family: monospace; color: var(--accent); font-weight:700;">${student.id}</td>
                <td style="padding: 12px; font-weight: 600;">${student.name}</td>
                <td style="padding: 12px; color: #cbd5e1;">Class ${student.class}</td>
                <td style="padding: 12px; font-weight: 700;">₹${student.fee}</td>
                <td style="padding: 12px; color: var(--neon);">${student.due_day}th of month</td>
                <td style="padding: 12px;"><span style="padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; ${badgeStyle}">${statusText}</span></td>
            </tr>
        `;
        container.innerHTML += row;
    });

    const alertBanner = document.getElementById('fee-alert-banner');
    if (alertBanner) {
        if (dailyTargetSum > 0) {
            alertBanner.style.display = "block";
            alertBanner.style.background = "rgba(239,68,68,0.15)";
            alertBanner.style.color = "#f87171";
            alertBanner.style.border = "1px solid rgba(239,68,68,0.3)";
            alertBanner.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ACTION REQUIRED: Fee Collection Active Today for [${matchingDueList.join(', ')}]. Expected intake: ₹${dailyTargetSum}`;
        } else {
            alertBanner.style.display = "block";
            alertBanner.style.background = "rgba(16,185,129,0.1)";
            alertBanner.style.color = "#34d399";
            alertBanner.style.border = "1px solid rgba(16,185,129,0.2)";
            alertBanner.innerHTML = `<i class="fas fa-check-circle"></i> System Secure: No collection queues scheduled for Day ${currentDay} of the month.`;
        }
    }
}
document.addEventListener('DOMContentLoaded', buildFeeLedgerEngine);

// Linked Student Dropdown List Multi-Selector
function updateStudentList(classSelectId, studentSelectId) {
    const classVal = document.getElementById(classSelectId).value;
    const studentSelect = document.getElementById(studentSelectId);
    studentSelect.innerHTML = '<option value="">-- Select Student --</option>'; 
    if(!classVal) return; 

    const targets = academyStudents.filter(s => s.class === classVal);
    targets.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.text = `${student.name} (${student.id})`;
        studentSelect.appendChild(option);
    });
}

// Course Grid Link Actions & Android QR Deep Link
function selectCourse(classNumber, amount) {
    document.querySelectorAll('.fee-card').forEach(c => c.classList.remove('selected'));
    const targetCard = document.getElementById(`card-${classNumber}`);
    if(targetCard) targetCard.classList.add('selected');

    const qrImage = document.getElementById('dynamic-qr');
    const qrLoading = document.getElementById('qr-loading');
    if(qrImage && qrLoading) {
        qrLoading.style.display = 'flex';
        const params = `pa=sajalbaruah0614@upi&pn=Sajal%20Baruah&am=${amount}&cu=INR`;
        const baseUpi = `upi://pay?${params}`;

        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(baseUpi)}`;

        const intents = {
            'btn-gpay': `intent://pay?${params}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end;`,
            'btn-phonepe': `intent://pay?${params}#Intent;scheme=upi;package=com.phonepe.app;end;`,
            'btn-paytm': `intent://pay?${params}#Intent;scheme=upi;package=net.one97.paytm;end;`,
            'btn-amazon': `intent://pay?${params}#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end;`,
            'btn-bhim': `intent://pay?${params}#Intent;scheme=upi;package=in.org.npci.upiapp;end;`,
            'btn-mobikwik': `intent://pay?${params}#Intent;scheme=upi;package=com.mobikwik_new;end;`
        };
        Object.keys(intents).forEach(id => {
            const el = document.getElementById(id);
            if(el) el.href = intents[id];
        });
        setTimeout(() => { qrLoading.style.display = 'none'; }, 400);
    }
}

// Secure Login Gateway Validation
function checkLogin() {
    const input = document.getElementById('portal-id');
    if (input && input.value.trim() === "sajalbaruah2005_10_9") {
        window.location.href = "dashboard.html";
    } else {
        alert("System Credentials Rejected. Access Terminated.");
    }
}

// Structural UI Modals Configuration
function openModal(modalId) {
    const el = document.getElementById(modalId);
    if(el) {
        el.style.display = "block";
        const targetField = document.getElementById(modalId === 'attendanceModal' ? 'att-time' : 'pay-time');
        if(targetField) targetField.value = getISTString();
    }
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if(el) el.style.display = "none";
}

window.onclick = function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = "none";
    }
}
