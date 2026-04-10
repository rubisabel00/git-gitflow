// ============================= //
// Tab Navigation
// ============================= //

document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and content
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
        
        // Scroll to the content
        document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
    });
});

// ============================= //
// Simulator State Management
// ============================= //

class GitFlowSimulator {
    constructor() {
        this.state = {
            features: [],
            releases: [],
            hotfixes: [],
            mainBranches: [
                { id: 1, name: 'Initial Commit', branch: 'main', color: '#d32f2f' },
                { id: 2, name: 'Initial Commit', branch: 'develop', color: '#4caf50' }
            ],
            currentFeatures: [],
            currentReleases: [],
            currentHotfixes: [],
            commitCount: 0,
            version: '1.0.0'
        };
        
        this.history = [];
        this.currentIndex = 0;
        this.saveState('Estado inicial del repositorio');
    }
    
    saveState(message) {
        this.history = this.history.slice(0, this.currentIndex + 1);
        this.history.push({
            state: JSON.parse(JSON.stringify(this.state)),
            message: message
        });
        this.currentIndex++;
    }
    
    startFeature(name) {
        const id = Date.now();
        this.state.currentFeatures.push({
            id: id,
            name: name || `feature-${this.state.currentFeatures.length + 1}`,
            commits: 0
        });
        this.saveState(`✓ Rama feature/${name || 'nueva-caracteristica'} creada desde develop`);
    }
    
    commitFeature() {
        if (this.state.currentFeatures.length > 0) {
            this.state.currentFeatures[0].commits++;
            this.state.commitCount++;
            this.saveState(`💾 Commit realizado en feature/${this.state.currentFeatures[0].name}`);
        }
    }
    
    finishFeature() {
        if (this.state.currentFeatures.length > 0) {
            const feature = this.state.currentFeatures.shift();
            this.state.features.push(feature);
            this.saveState(`✅ Feature/${feature.name} fusionada en develop`);
        }
    }
    
    startRelease(version) {
        const id = Date.now();
        this.state.currentReleases.push({
            id: id,
            name: version || `v${this.state.version}`,
            commits: 0
        });
        this.saveState(`🟠 Rama release/${version || this.state.version} creada desde develop`);
    }
    
    finishRelease() {
        if (this.state.currentReleases.length > 0) {
            const release = this.state.currentReleases.shift();
            this.state.releases.push(release);
            this.state.mainBranches.push({
                id: this.state.mainBranches.length + 1,
                name: release.name,
                branch: 'main',
                color: '#d32f2f'
            });
            this.saveState(`🏁 Release ${release.name} completada y mergeada a main y develop`);
        }
    }
    
    startHotfix(name) {
        const id = Date.now();
        this.state.currentHotfixes.push({
            id: id,
            name: name || `hotfix-${this.state.currentHotfixes.length + 1}`,
            commits: 0
        });
        this.saveState(`🔴 Rama hotfix/${name || 'bug-fix'} creada desde main`);
    }
    
    finishHotfix() {
        if (this.state.currentHotfixes.length > 0) {
            const hotfix = this.state.currentHotfixes.shift();
            this.state.hotfixes.push(hotfix);
            this.saveState(`🚑 Hotfix/${hotfix.name} corregida y mergeada a main y develop`);
        }
    }
    
    reset() {
        this.state = {
            features: [],
            releases: [],
            hotfixes: [],
            mainBranches: [
                { id: 1, name: 'Initial Commit', branch: 'main', color: '#d32f2f' },
                { id: 2, name: 'Initial Commit', branch: 'develop', color: '#4caf50' }
            ],
            currentFeatures: [],
            currentReleases: [],
            currentHotfixes: [],
            commitCount: 0,
            version: '1.0.0'
        };
        this.history = [];
        this.currentIndex = 0;
        this.saveState('Estado inicial del repositorio');
    }
    
    getLog() {
        const messages = this.history.slice(0, this.currentIndex + 1).map((entry, index) => {
            const time = new Date().toLocaleTimeString();
            return `[${index}] ${entry.message}`;
        });
        return messages.reverse().slice(0, 10).join('<br>');
    }
}

// ============================= //
// Simulator Visualization
// ============================= //

const simulator = new GitFlowSimulator();

function drawSimulatorState() {
    const canvas = document.getElementById('simulator-canvas');
    const log = document.getElementById('simulator-log');
    
    // Clear canvas
    canvas.innerHTML = '';
    
    // Draw main branch
    drawBranch(canvas, 50, 80, 'main', '#d32f2f', simulator.state.mainBranches);
    
    // Draw develop branch
    drawBranch(canvas, 50, 180, 'develop', '#4caf50', [
        ...simulator.state.features,
        ...simulator.state.releases,
        ...simulator.state.hotfixes
    ]);
    
    // Draw current features
    let yOffset = 280;
    simulator.state.currentFeatures.forEach((feature, index) => {
        drawBranch(canvas, 50 + (index * 180), yOffset, `feature/${feature.name}`, '#2196f3', 
            Array(feature.commits).fill(null).map((_, i) => ({ name: `Commit ${i + 1}` })));
    });
    
    // Draw current releases
    if (simulator.state.currentReleases.length > 0) {
        const release = simulator.state.currentReleases[0];
        drawBranch(canvas, 50, yOffset + 80, `release/${release.name}`, '#ff9800', 
            Array(release.commits).fill(null).map((_, i) => ({ name: `Fix ${i + 1}` })));
    }
    
    // Draw current hotfixes
    if (simulator.state.currentHotfixes.length > 0) {
        const hotfix = simulator.state.currentHotfixes[0];
        drawBranch(canvas, 650, yOffset, `hotfix/${hotfix.name}`, '#e91e63', 
            Array(hotfix.commits).fill(null).map((_, i) => ({ name: `Fix ${i + 1}` })));
    }
    
    // Update log
    log.innerHTML = simulator.getLog();
}

function drawBranch(canvas, x, y, branchName, color, commits) {
    const ns = 'http://www.w3.org/2000/svg';
    
    // Draw branch line
    const line = document.createElementNS(ns, 'line');
    line.setAttribute('x1', x);
    line.setAttribute('y1', y);
    line.setAttribute('x2', x + (commits.length * 40));
    line.setAttribute('y2', y);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '3');
    canvas.appendChild(line);
    
    // Draw commits
    commits.forEach((commit, index) => {
        const commitX = x + (index * 40);
        const circle = document.createElementNS(ns, 'circle');
        circle.setAttribute('cx', commitX);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', color);
        canvas.appendChild(circle);
    });
    
    // Draw branch label
    const text = document.createElementNS(ns, 'text');
    text.setAttribute('x', x - 5);
    text.setAttribute('y', y - 10);
    text.setAttribute('font-size', '12');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', color);
    text.setAttribute('text-anchor', 'end');
    text.textContent = branchName;
    canvas.appendChild(text);
}

// ============================= //
// Event Listeners for Simulator
// ============================= //

document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        
        switch(action) {
            case 'start-feature':
                const featureName = prompt('Nombre de la característica:', 'nueva-funcionalidad');
                if (featureName) {
                    simulator.startFeature(featureName);
                } else {
                    simulator.startFeature();
                }
                break;
            case 'commit-feature':
                simulator.commitFeature();
                break;
            case 'finish-feature':
                simulator.finishFeature();
                break;
            case 'start-release':
                const releaseName = prompt('Número de versión:', '1.1.0');
                if (releaseName) {
                    simulator.startRelease(releaseName);
                } else {
                    simulator.startRelease();
                }
                break;
            case 'finish-release':
                simulator.finishRelease();
                break;
            case 'start-hotfix':
                const hotfixName = prompt('Nombre del hotfix:', 'bug-crítico');
                if (hotfixName) {
                    simulator.startHotfix(hotfixName);
                } else {
                    simulator.startHotfix();
                }
                break;
            case 'finish-hotfix':
                simulator.finishHotfix();
                break;
            case 'reset':
                if (confirm('¿Reiniciar el simulador? Se perderá todo el progreso.')) {
                    simulator.reset();
                }
                break;
        }
        
        drawSimulatorState();
    });
});

// ============================= //
// Scenario Buttons
// ============================= //

document.querySelectorAll('.scenario-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const scenario = btn.getAttribute('data-scenario');
        simulator.reset();
        
        switch(scenario) {
            case 'feature':
                simulator.startFeature('login');
                simulator.commitFeature();
                simulator.commitFeature();
                simulator.finishFeature();
                break;
            case 'release-hotfix':
                simulator.startFeature('auth');
                simulator.commitFeature();
                simulator.finishFeature();
                simulator.startRelease('1.1.0');
                simulator.finishRelease();
                simulator.startHotfix('payment-error');
                simulator.commitFeature();
                simulator.finishHotfix();
                break;
            case 'multiple-features':
                simulator.startFeature('dashboard');
                simulator.commitFeature();
                simulator.startFeature('notifications');
                simulator.commitFeature();
                simulator.finishFeature();
                simulator.commitFeature();
                simulator.finishFeature();
                break;
        }
        
        drawSimulatorState();
        document.getElementById('practica').scrollIntoView({ behavior: 'smooth' });
    });
});

// ============================= //
// Smooth Scroll to Tab on Load
// ============================= //

window.addEventListener('load', () => {
    drawSimulatorState();
});

// ============================= //
// Highlight Code Examples
// ============================= //

document.querySelectorAll('code').forEach(codeBlock => {
    if (codeBlock.textContent.includes('git')) {
        codeBlock.style.cursor = 'pointer';
        codeBlock.addEventListener('click', function() {
            if (navigator.clipboard && this.textContent) {
                navigator.clipboard.writeText(this.textContent).then(() => {
                    const originalText = this.textContent;
                    this.textContent = '✓ Copiado!';
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                });
            }
        });
    }
});

// ============================= //
// Add Interactive Elements
// ============================= //

function addInteractiveElements() {
    // Animar elementos al scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    document.querySelectorAll('.concept-card, .benefit-card, .branch-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

window.addEventListener('load', addInteractiveElements);

// ============================= //
// Search Functionality (Optional)
// ============================= //

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        // Permite búsqueda nativa del navegador
        e.preventDefault();
        alert('Usa la búsqueda nativa del navegador (Ctrl+F) para encontrar contenido en la página');
    }
});

// ============================= //
// Print Styles
// ============================= //

window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.nav-tabs').forEach(el => el.style.display = 'none');
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.nav-tabs').forEach(el => el.style.display = 'flex');
});

// ============================= //
// Local Storage para guardar progreso
// ============================= //

function saveProgress() {
    const activeTab = document.querySelector('.tab-btn.active').getAttribute('data-tab');
    localStorage.setItem('gitflow-guide-active-tab', activeTab);
    localStorage.setItem('gitflow-guide-simulator-state', JSON.stringify(simulator.state));
}

function loadProgress() {
    const savedTab = localStorage.getItem('gitflow-guide-active-tab');
    if (savedTab) {
        const tabBtn = document.querySelector(`[data-tab="${savedTab}"]`);
        if (tabBtn) {
            tabBtn.click();
        }
    }
    
    const savedSimulatorState = localStorage.getItem('gitflow-guide-simulator-state');
    if (savedSimulatorState) {
        try {
            simulator.state = JSON.parse(savedSimulatorState);
        } catch (e) {
            console.log('No saved simulator state');
        }
    }
}

window.addEventListener('beforeunload', saveProgress);
window.addEventListener('load', () => {
    loadProgress();
    drawSimulatorState();
});

// ============================= //
// Tema oscuro automático (opcional)
// ============================= //

function checkDarkMode() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // El usuario prefiere modo oscuro
        document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    }
}

// Descomenta si quieres soporte para modo oscuro
// window.addEventListener('load', checkDarkMode);

// ============================= //
// Mobile Menu Optimization
// ============================= //

if (window.innerWidth < 768) {
    document.querySelector('.nav-tabs').addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            setTimeout(() => {
                document.querySelector('.main-content').scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    });
}

// ============================= //
// Easter Egg
// ============================= //

let konami = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konami.push(e.key);
    konami = konami.slice(-10);
    
    if (konami.join(',') === konamiCode.join(',')) {
        alert('🎉 ¡Encontraste el código Konami! Eres un experto en Git Flow! 🚀');
    }
});

console.log('%c🎯 Guía Interactiva de Git Flow Cargada', 'color: #1976d2; font-size: 16px; font-weight: bold;');
console.log('%cTienes dudas? Consulta la documentación oficial de Git Flow en https://nvie.com/posts/a-successful-git-branching-model/', 'color: #4caf50; font-size: 12px;');
