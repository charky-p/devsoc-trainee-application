const earth = document.getElementById('earth');
const orbit = document.getElementById('orbit-system');
const speedSlider = document.getElementById('speed-slider');
const speedDisplay = document.getElementById('speed-value');
const modeToggle = document.getElementById('mode-toggle');

let currentRotation = 0;
let lastAngle = 0;
let rotationSpeed = 0.1;
let isManual = false;

// Toggle Mode
modeToggle.addEventListener('click', () => {
    isManual = !isManual;
    modeToggle.textContent = isManual ? "MODE: MANUAL" : "MODE: AUTO";
    modeToggle.classList.toggle('manual-active');
});

speedSlider.addEventListener('input', (e) => {
    rotationSpeed = parseFloat(e.target.value);
    speedDisplay.textContent = rotationSpeed.toFixed(1);
});

// Auto rotate loop
function autoRotate() {
    // Only auto-increment if we are NOT in manual mode
    if (!isManual) {
        currentRotation += rotationSpeed;
        orbit.style.transform = `rotate(${currentRotation}deg)`;
    }
    requestAnimationFrame(autoRotate);
}

autoRotate();

document.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    if (isManual) {
        let delta = targetAngle - lastAngle;

        // Deal with smooth wrapping
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        currentRotation += delta;
        orbit.style.transform = `rotate(${currentRotation}deg)`;
    }
    
    lastAngle = targetAngle;
});

// Adding orbit objects
const colors = ['#ff4d4d', '#4dff88', '#4db8ff', '#ff4dff', '#ffff4d', '#ffa64d'];
let colorIndex = 0;

document.addEventListener('click', (e) => {
    if (e.target.closest('#controls') || e.target.closest('#disclaimer') || e.target.closest('#info')) return;

    const newObj = document.createElement('div');
    newObj.className = 'space-object';

    const color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;

    const size = Math.floor(Math.random() * 20) + 10;
    
    const distance = Math.floor(Math.random() * 250) + 200;
    
    const startAngle = Math.random() * 360;

    // Apply styles
    newObj.style.width = `${size}px`;
    newObj.style.height = `${size}px`;
    newObj.style.backgroundColor = color;
    newObj.style.boxShadow = `0 0 15px ${color}`;
    
    newObj.style.transform = `translate(-50%, -50%) rotate(${startAngle}deg) translateX(${distance}px)`;

    orbit.appendChild(newObj);
});
