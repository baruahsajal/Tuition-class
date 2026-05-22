// Global Variables & Setup
document.addEventListener('DOMContentLoaded', () => {
    // Background Grid Logic
    const grid = document.querySelector('.grid-overlay');
    if(grid) { grid.style.animation = 'hyperSpeed 15s linear infinite'; }
});

// Mobile Menu Toggle
function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.right = sidebar.style.right === '0px' ? '-300px' : '0px';
}

// ==== HOLOGRAPHIC NOTES ENGINE ====
function openNote(chapterId, chapterTitle, type) {
    const modal = document.getElementById('reader-modal');
    const headerTitle = document.getElementById('reader-chapter-title');
    const bodyContent = document.getElementById('reader-dynamic-body');
    
    // Set colors based on subject
    const color = type === 'math' ? '#f0f' : '#0ff';
    const shadow = type === 'math' ? '0 0 15px rgba(255,0,255,0.6)' : '0 0 15px rgba(0,255,255,0.6)';
    
    document.querySelector('.reader-content').style.borderColor = color;
    document.querySelector('.reader-content').style.boxShadow = shadow;
    headerTitle.style.color = color;

    // Simulate Holographic Decryption
    headerTitle.innerText = "DECRYPTING...";
    bodyContent.innerHTML = `<div style="text-align:center; padding-top: 100px;">
        <i class="fas fa-circle-notch fa-spin fa-3x" style="color: ${color};"></i>
        <p style="margin-top:20px; font-family:monospace; color:${color};">ACCESSING MAINFRAME REPOSITORY...</p>
    </div>`;
    
    modal.classList.add('active');

    // Load Content (This is where you will add your actual notes logic later)
    setTimeout(() => {
        headerTitle.innerHTML = `<i class="fas ${type === 'math' ? 'fa-square-root-variable' : 'fa-atom'}"></i> ${chapterTitle}`;
        
        // Placeholder for the Instructor to add content
        bodyContent.innerHTML = `
            <h2 style="color: #fff; margin-bottom: 20px;">Module Overview</h2>
            <p>Welcome to <strong>${chapterTitle}</strong>.</p>
            <div style="background: rgba(255,255,255,0.05); padding: 20px; border-left: 4px solid ${color}; margin-top: 20px; border-radius: 4px;">
                <p style="color: #94a3b8; font-family: monospace;">
                    // SYSTEM MESSAGE TO INSTRUCTOR (SAJAL BARUAH):<br>
                    // Add your digital notes, PDF embeds, or interactive HTML formulas for <strong>${chapterId}</strong> here.<br>
                    // You can map this dynamically using a database or hardcode it in the HTML later.
                </p>
            </div>
            <br>
            <button class="btn" style="border-color: ${color}; color: ${color};"><i class="fas fa-download"></i> Download Local PDF Form</button>
        `;
    }, 1200);
}

function closeNote() {
    document.getElementById('reader-modal').classList.remove('active');
}
