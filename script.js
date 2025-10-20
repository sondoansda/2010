// --- Hiệu ứng lấp lánh ---
const canvas = document.getElementById("sparkle");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 100 }).map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 2,
  d: Math.random() * 1
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.beginPath();
  stars.forEach(s => {
    ctx.moveTo(s.x, s.y);
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
  });
  ctx.fill();
  moveStars();
}

let angle = 0;
function moveStars() {
  angle += 0.01;
  stars.forEach(s => {
    s.y += Math.cos(angle + s.d) + 1 + s.r / 2;
    if (s.y > canvas.height) {
      s.y = 0;
      s.x = Math.random() * canvas.width;
    }
  });
}
setInterval(drawStars, 30);

// --- Phát nhạc + Hoa rơi ---
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("music");
  const playButton = document.getElementById("playMusic");

  playButton.addEventListener("click", () => {
    if (music.paused) {
      music.play()
        .then(() => {
          playButton.innerHTML = "🎶 Đang phát nhạc...";
          playButton.style.backgroundColor = "#ff4da6";
          createFlowers(); // 🌸 Thả hoa khi bắt đầu nhạc
        })
        .catch(err => {
          console.log("Không thể phát nhạc:", err);
          alert("Hãy click lại để bật nhạc!");
        });
    } else {
      music.pause();
      playButton.innerHTML = "🎵 Phát lại bài 'Nắm Lấy Tay Anh'";
      playButton.style.backgroundColor = "#ff99cc";
    }
  });
});

// --- Hiệu ứng hoa rơi ---
function createFlowers() {
  for (let i = 0; i < 40; i++) {
    const flower = document.createElement("div");
    flower.classList.add("flower");

    // Random emoji hoa
    const emojis = ["🌸", "🌷", "💐", "🌺", "🌹"];
    flower.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

    // Random vị trí và tốc độ
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.fontSize = 20 + Math.random() * 20 + "px";
    flower.style.animationDuration = 4 + Math.random() * 5 + "s";

    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 9000);
  }
}
