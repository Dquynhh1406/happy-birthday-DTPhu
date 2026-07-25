const input = document.getElementById('command-input');
const terminalBody = document.getElementById('terminal-body');
const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.4; // Đặt âm lượng nhạc nền 40%

// Âm thanh gõ phím & Ting ting mở quà
const typeSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
const winSound = new Audio('https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3');

// 🎁 Danh sách quà
const presentlist = [
    "100.000 VNĐ", "120.000 VNĐ", "150.000 VNĐ",
    "The NOexistenceN of you AND me + Five Nights at Freddy's",
    "Valheim", "Overcooked! 2", "Rain World", "Shift At Midnight"
];

let hasRolled = false;
let isMusicStarted = false;

const giftBoxASCII = `
       🎁 🎁 🎁 🎁 🎁 🎁 🎁
      ┌───────────────────┐
      │  ┌─────────────┐  │
      │  │ SECRET GIFT │  │
      │  └─────────────┘  │
      └───────────────────┘
`;

// Phát tiếng lách cách khi gõ
input.addEventListener('input', () => {
    typeSound.currentTime = 0;
    typeSound.play();
});

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        // Tự động bật nhạc ở lần gõ Enter đầu tiên
        if (!isMusicStarted) {
            bgMusic.play().catch(e => console.log("Trình duyệt chặn autoplay"));
            isMusicStarted = true;
        }

        const command = this.value.trim();
        this.value = '';

        printOutput(`<span class="prompt">phu_tlos@lilac-space:~$</span> ${command}`);
        processCommand(command);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

function printOutput(text) {
    const div = document.createElement('div');
    div.className = 'output';
    div.innerHTML = text;
    terminalBody.insertBefore(div, input.parentElement);
}

// Hàm giả lập gõ chữ từ từ
function typeWriter(text, element, speed = 20) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            terminalBody.scrollTop = terminalBody.scrollHeight;
            setTimeout(type, speed);
        }
    }
    type();
}

function processCommand(cmd) {
    switch(cmd.toLowerCase()) {
        case '!lilac help':
            printOutput(`
🌿 <span class="lilac-name">Lilac:</span> Đây là danh sách các lệnh dành cho anh Phú:
----------------------------------------------------------------------
  <span class="cmd-text">!lilac wish</span>   : Nhận lời chúc từ Diễm Quỳnh! 💌
  <span class="cmd-text">!lilac secret</span> : Khám phá bí mật ẩn giấu... 🔮
  <span class="cmd-text">!lilac random</span> : Random bí mật ngẫu nhiên từ Diễm Quỳnh! 🎁
  <span class="cmd-text">!lilac music</span>  : Bật / Tắt nhạc nền 🎵
  <span class="cmd-text">clear</span>         : Xóa sạch màn hình terminal
----------------------------------------------------------------------
            `);
            break;

        case '!lilac music':
            if (bgMusic.paused) { bgMusic.play(); printOutput(`🌿 <span class="lilac-name">Lilac:</span> Đã BẬT nhạc nền. 🎵`); }
            else { bgMusic.pause(); printOutput(`🌿 <span class="lilac-name">Lilac:</span> Đã TẮT nhạc nền. 🔇`); }
            break;

        case '!lilac wish':
            printOutput(`
🌿 <span class="lilac-name">Lilac:</span> Đang tải thông điệp...
<div class="wish-box">
🎂 <b>CHÚC MỪNG SINH NHẬT TUỔI 20 DƯƠNG THIÊN PHÚ (TLOS)!</b> 🎂

Chúc mừng sinh nhật tuổi 20 của mày nha Dương Thiên Phú! Trước hết là 
mong mày có sức khỏe tinh thần lẫn vật chất đều ổn định, khỏe mạnh, gặp
được nhiều cơ hội mới, gặt hái được những điều mày mong muốn. Thứ hai
là càng lớn thì sẽ càng gặp nhiều chuyện khó khăn, tao mong mày luôn
tiến lên phía trước, đủ dũng cảm và đủ sức để vượt qua những chuyện
ông trời thử thách mày, tao tin là mày sẽ làm được những điều mày muốn. 
Thứ ba là mong cuộc sống của mày về sau sẽ tìm được góc nhỏ bình yên,
một ai đó, hoặc điều gì đó làm cho thế giới trong đôi mắt mày có thêm
màu sắc. Và cuối cùng thì chúc mày có ngày sinh nhật vui vẻ, những điều
tốt đẹp sẽ đến với mày!
</div>
👉 <i>Gõ tiếp <span class="cmd-text">!lilac secret</span> để xem tiếp Quỳnh giấu gì nhé!</i>
            `);
            break;

        case '!lilac secret':
            printOutput(`
🌿 <span class="lilac-name">Lilac:</span> Đang giải mã dữ liệu ẩn...
<div class="secret-box">
Sinh nhật tuổi 20 mà chỉ có vài dòng chữ thì có phải hơi kì lạ quá 
đúng không? 

Nên Diễm Quỳnh đã cất công che giấu hẳn một đoạn mã bí mật trong hệ 
thống này. Có một thứ gì đó đang chờ Phú kích hoạt để giải trí sau 
những giờ chạy deadline bù đầu.
</div>
👉 <i>Gõ ngay <span class="cmd-text">!lilac random</span> để xem bí mật đó là gì nha! 🎁</i>
            `);
            break;

        case '!lilac random':
            if (hasRolled) {
                printOutput(`🌿 <span class="lilac-name">Lilac:</span> <span class="error">⚠️ Bí mật chỉ được random 1 lần thôi! Đừng quên gửi Quỳnh nhé! 😉</span>`);
                break;
            }

            printOutput(`🌿 <span class="lilac-name">Lilac:</span> Kích hoạt quy trình mở khóa phần thưởng...`);
            
            // Minigame giả lập hack / decrypt tiến trình
            const hackDiv = document.createElement('div');
            hackDiv.className = 'output hacking-text';
            terminalBody.insertBefore(hackDiv, input.parentElement);
            
            let progress = 0;
            const hackInterval = setInterval(() => {
                progress += 10;
                let bars = '█'.repeat(progress/10) + '░'.repeat(10 - progress/10);
                hackDiv.innerHTML = `[LILAC SYSTEM] Bypassing security... <span class="progress-bar">[${bars}] ${progress}%</span>`;
                terminalBody.scrollTop = terminalBody.scrollHeight;

                if (progress >= 100) {
                    clearInterval(hackInterval);
                    hackDiv.innerHTML += "<br>✅ Giải mã thành công! Đang trích xuất Hộp quà...";
                    
                    setTimeout(() => {
                        printOutput(`<pre style="color: #B35900;">${giftBoxASCII}</pre>`);
                        startRoulette();
                    }, 500);
                }
            }, 200);
            break;

        case 'clear':
            document.querySelectorAll('.output').forEach(out => out.remove());
            break;

        case '': break;
        default:
            printOutput(`🌿 <span class="lilac-name">Lilac:</span> Lệnh này tớ chưa học! Gõ <span class="cmd-text">!lilac help</span> để xem danh sách nhé.`);
    }
}

function startRoulette() {
    let count = 0;
    const interval = setInterval(() => {
        const tempGift = presentlist[Math.floor(Math.random() * presentlist.length)];
        printOutput(`🎲 Đang xoay... <span style="color: #00676B; font-weight:bold;">${tempGift}</span>`);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        count++;

        if (count >= 5) {
            clearInterval(interval);
            const finalGift = presentlist[Math.floor(Math.random() * presentlist.length)];
            winSound.play(); // Âm thanh chiến thắng!

            printOutput(`
✨ <b>OH HOÁ RA ĐÂY LÀ QUÀ!</b> ✨
----------------------------------------------------------------------
🎁 Món quà bất ngờ mà Diễm Quỳnh dành tặng Phú là:
<div class="gift-result">🎁 ${finalGift} 🎁</div>
📸 <b>LÀM SAO ĐỂ NHẬN?</b>
<i>Giờ bạn hãy <b>CHỤP MÀNH HÌNH</b> này lại và gửi ngay cho <b>Diễm Quỳnh</b> 
để nhận quà đi nhé! 🚀</i>
----------------------------------------------------------------------
            `);

            confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ['#00676B', '#B35900', '#5B247A'] });
            hasRolled = true;
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }, 400);
}
