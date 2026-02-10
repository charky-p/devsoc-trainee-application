const orbit = document.getElementById('orbit-system');

let currentRotation = 0; 
let lastAngle = 0;

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const dx = mouseX - centerX;
    const dy = mouseY - centerY;
    
    const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);

    let delta = targetAngle - lastAngle;

    // Deal with wrapping degree around
    if (delta > 180) {
        delta -= 360;
    } else if (delta < -180) {
        delta += 360;
    }

    currentRotation += delta;

    orbit.style.transform = `rotate(${currentRotation}deg)`;
    lastAngle = targetAngle;
});