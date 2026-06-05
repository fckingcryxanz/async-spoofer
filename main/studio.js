// public/modules/main/studio.js
export function renderStudio() {
    const viewport = document.getElementById('view-port');
    
    viewport.innerHTML = `
        <div class="view-header">
            <h1>Studio Integration</h1>
            <p>Spoof your assets directly into the engine.</p>
        </div>
        
        <div class="studio-controls glass-card">
            <div class="input-section">
                <label>Target Asset ID</label>
                <input type="text" id="targetId" placeholder="e.g. 18239401">
            </div>
            
            <div class="drop-zone" id="dropZone">
                <p>Drag & Drop your new .mp3 or .fbx here</p>
                <span>or click to upload</span>
            </div>
            
            <button class="primary-btn" id="startSpoof">Start Spoofing</button>
        </div>
    `;

    // Логика кнопки
    document.getElementById('startSpoof')?.addEventListener('click', () => {
        const id = document.getElementById('targetId').value;
        if(id) {
            alert(`Starting spoofing for ID: ${id}`);
        } else {
            alert("Please enter a Target ID");
        }
    });
}
