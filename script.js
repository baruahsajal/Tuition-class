// ==== SYSTEM INITIALIZATION ====
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('leaderboard-container')) {
        renderLeaderboard();
        populateInstructorDropdown();
    }
});

// ==== NAVIGATION ====
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.right = sidebar.style.right === '0px' ? '-300px' : '0px';
}

// ==== HOLOGRAPHIC VAULT (NOTES) ====
function openNote(chapterId, chapterTitle, type) {
    const modal = document.getElementById('reader-modal');
    const headerTitle = document.getElementById('reader-chapter-title');
    const bodyContent = document.getElementById('reader-dynamic-body');
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
            <div style="padding: 30px; color: #cbd5e1;">
                <h2 style="color: #fff; margin-bottom: 20px;">Module Diagnostics</h2>
                <div style="background: rgba(255,255,255,0.05); padding: 20px; border-left: 4px solid ${color}; border-radius: 4px;">
                    <p style="font-family: monospace;">// INSTRUCTOR OVERRIDE ACTIVATED<br>// Embed PDF, Math formulas, or text for <strong>${chapterId}</strong> here.</p>
                </div>
                <button class="btn" style="margin-top:20px; border-color: ${color}; color: ${color};"><i class="fas fa-download"></i> Extract PDF</button>
            </div>
        `;
    }, 1000);
}

function closeNote() { document.getElementById('reader-modal').classList.remove('active'); }

// ==== GAMIFICATION ENGINE (LEADERBOARD & MEMES) ====
let leaderboardData = [
    { id: "S1", name: "Rahul Sharma", class: "Class 9", xp: 1250, trend: "up" },
    { id: "S2", name: "Priya Das", class: "Class 8", xp: 1100, trend: "up" },
    { id: "S3", name: "Pranku Kurmi", class: "Class 9", xp: 950, trend: "neutral" },
    { id: "S4", name: "Nikhil Kurmi", class: "Class 8", xp: 800, trend: "down" },
    { id: "S5", name: "Ayush Barua", class: "Class 9", xp: 400, trend: "down" }
];

const memes = {
    negative: [{ text: "Homework kahan hai? Dhoondne par bhi nahi mil raha! 😭", img: "https://media.giphy.com/media/l2JhtKtDWYNKdRpoA/giphy.gif" }],
    positive: [{ text: "Einstein Pro Max Activated! 🧠💥", img: "https://media.giphy.com/media/2bYewTk7K2No1Nv0K/giphy.gif" }],
    neutral: [{ text: "Na upar, na niche. Zindagi balance chal rahi hai. ⚖️", img: "https://media.giphy.com/media/Ry1MOAeAYXvRVQLPw3/giphy.gif" }]
};

function renderLeaderboard() {
    const container = document.getElementById('leaderboard-container');
    container.innerHTML = ''; 
    leaderboardData.sort((a, b) => b.xp - a.xp);

    leaderboardData.forEach((student, index) => {
        let trendIcon = student.trend === 'up' ? '<i class="fas fa-arrow-trend-up" style="color:var(--neon-green)"></i>' : 
                      student.trend === 'down' ? '<i class="fas fa-arrow-trend-down" style="color:#ff4444"></i>' : 
                      '<i class="fas fa-minus" style="color:#94a3b8"></i>';

        container.innerHTML += `
            <div class="student-row rank-${index + 1}">
                <div class="rank-badge">${index + 1}</div>
                <div style="flex: 1; margin-left: 15px;">
                    <div style="color: #fff; font-weight: 700;">${student.name}</div>
                    <div style="color: #94a3b8; font-size: 0.8rem; font-family: monospace;">${student.class}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.2rem; font-weight: 900; color: var(--neon-green);">${student.xp} XP</div>
                    <div>${trendIcon}</div>
                </div>
            </div>`;
    });
}

function populateInstructorDropdown() {
    const select = document.getElementById('student-select');
    select.innerHTML = '<option value="">-- Select Student --</option>';
    let sorted = [...leaderboardData].sort((a, b) => a.name.localeCompare(b.name));
    sorted.forEach(s => select.innerHTML += `<option value="${s.id}">${s.name} (${s.class})</option>`);
}

function updateScore() {
    const studentId = document.getElementById('student-select').value;
    const score = parseInt(document.getElementById('score-input').value);
    if(!studentId || isNaN(score)) return alert("Select student and enter XP.");

    let sName = "";
    leaderboardData = leaderboardData.map(s => {
        if(s.id === studentId) {
            sName = s.name; s.xp += score;
            s.trend = score > 0 ? "up" : score < 0 ? "down" : "neutral";
        }
        return s;
    });

    renderLeaderboard(); triggerMeme(sName, score);
    document.getElementById('score-input').value = '';
}

function completeBounty(btn, xpReward) {
    btn.innerHTML = '<i class="fas fa-check"></i> Claimed!';
    btn.style.color = "var(--neon-green)";
    btn.style.borderColor = "var(--neon-green)";
    btn.disabled = true;
    alert(`Instructor Notification: Log +${xpReward} XP for this bounty completion!`);
}

function triggerMeme(name, score) {
    const modal = document.getElementById('meme-modal');
    const cat = score <= 0 ? memes.negative : score > 50 ? memes.positive : memes.neutral;
    const meme = cat[Math.floor(Math.random() * cat.length)];
    
    document.getElementById('meme-title').innerText = score <= 0 ? `WARNING: ${name} XP Dropped!` : `LEVEL UP: ${name}!`;
    document.getElementById('meme-img').src = meme.img;
    document.getElementById('meme-text').innerText = meme.text;
    modal.style.display = 'flex';
}
