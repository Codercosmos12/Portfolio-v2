const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('show'));
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();

const counters = document.querySelectorAll('[data-count]');
const countUp = (el) => {
    const target = Number(el.dataset.count);
    let n = 0;
    const step = Math.max(1, Math.floor(target / 40));
    const timer = setInterval(() => {
        n += step;
        if (n >= target) { n = target; clearInterval(timer); }
        el.textContent = `${n}${target === 100 ? '%' : '+'}`;
    }, 30);
};
counters.forEach(countUp);

document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -4;
        const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 4;
        card.style.transform = `perspective(850px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = 'perspective(850px) rotateX(0) rotateY(0)');
});

// Starfield background.
const c = document.getElementById('starfield');
const ctx = c.getContext('2d');
let w, h, stars;
function resize() {
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    stars = Array.from({ length: Math.min(160, Math.floor(w / 10)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 1.5 + 0.5
    }));
}
function draw() {
    ctx.clearRect(0, 0, w, h);
    stars.forEach((s) => {
        s.y += s.z;
        if (s.y > h) s.y = 0;
        ctx.fillStyle = `rgba(180,220,255,${0.2 + s.z / 2.4})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.z, 0, Math.PI * 2);
        ctx.fill();
    });
    requestAnimationFrame(draw);
}
window.addEventListener('resize', resize);
resize();
draw();
