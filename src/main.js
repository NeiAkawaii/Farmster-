const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const actionBtn = document.getElementById('actionBtn');

// ปรับขนาดภาพให้พอดีหน้าจอมือถือเสมอ
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// ข้อมูลตัวละคร
let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 32,
    speed: 5,
    color: '#3498db' // สีตัวละครชั่วคราว
};

let target = { x: player.x, y: player.y };
let farmPlots = []; // ที่เก็บข้อมูลแปลงผัก

// รับค่าการแตะหน้าจอให้เดินตาม
function setTarget(e) {
    if (e.touches) {
        target.x = e.touches[0].clientX;
        target.y = e.touches[0].clientY;
    }
}
canvas.addEventListener('touchstart', setTarget);
canvas.addEventListener('touchmove', setTarget);

// ระบบขุดดิน
actionBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    farmPlots.push({
        x: player.x - 20, 
        y: player.y - 20, 
        size: 40,
        color: '#8e44ad' // สีแปลงดินชั่วคราว
    });
});

// คำนวณระบบฟิสิกส์และการเดิน
function update() {
    let dx = target.x - player.x;
    let dy = target.y - player.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    
    // ถ้ายังไม่ถึงจุดที่แตะ ให้เดินต่อไป
    if (dist > player.speed) {
        player.x += (dx / dist) * player.speed;
        player.y += (dy / dist) * player.speed;
    }
}

// วาดกราฟิกทั้งหมดลงจอ
function draw() {
    // 1. พื้นหลังหญ้า
    ctx.fillStyle = '#2ecc71';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. วาดแปลงดินทั้งหมดที่เคยขุดไว้
    farmPlots.forEach(plot => {
        ctx.fillStyle = plot.color;
        ctx.fillRect(plot.x, plot.y, plot.size, plot.size);
    });

    // 3. วาดตัวละคร
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.size/2, player.y - player.size/2, player.size, player.size);
}

// ลูปทำงานซ้ำๆ (Game Loop)
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// เริ่มรันเกม
gameLoop();
