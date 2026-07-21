const input = document.getElementById('command-input');
const terminalBody = document.getElementById('terminal-body');

// 🎮 Danh sách game Steam
const gamesList = [
    "Phasmophobia (Game săn ma cực cuốn)",
    "Hollow Knight (Siêu phẩm chặt chém thử thách)",
    "Resident Evil 7: Biohazard (Kinh dị đỉnh cao)",
    "Celeste (Game nhảy nền siêu khó)",
    "Portal 2 (Game giải đố hack não)",
    "Subnautica (Sinh tồn khám phá đại dương)",
    "Cuphead (Bắn boss phong cách hoạt hình cổ điển)",
    "Dead Cells (Hành động chặt chém cực đã)"
];

let hasRolled = false;

// Vẽ hộp quà bằng ASCII
const giftBoxASCII = `
       🎁 🎁 🎁 🎁 🎁 🎁 🎁
      ┌───────────────────┐
      │  ┌─────────────┐  │
      │  │ SECRET GIFT │  │
      │  └─────────────┘  │
      └───────────────────┘
`;

input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
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

function processCommand(cmd) {
    switch(cmd.toLowerCase()) {
        case '!lilac help':
            printOutput(`
🌿 <span class="lilac-name">Lilac:</span> Đây là danh sách các lệnh dành cho anh Phú:
----------------------------------------------------------------------
  <span class="cmd-text">!lilac wish</span>   : Nhận lời chúc từ Diễm Quỳnh! 💌
  <span class="cmd-text">!lilac secret</span> : Khám phá bí mật ẩn giấu... 🔮
  <span class="cmd-text">!lilac random</span> : Random bí mật ngẫu nhiên từ Diễm Quỳnh! 🎁
  <span class="cmd-text">clear</span>         : Xóa sạch màn hình terminal
----------------------------------------------------------------------
            `);
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
                printOutput(`🌿 <span class="lilac-name">Lilac:</span> <span class="error">⚠️ Cảnh báo: Bí mật chỉ được random 1 lần thôi! Đừng quên chụp màn hình gửi Quỳnh nhé! </span>`);
                break;
            }

            printOutput(`🌿 <span class="lilac-name">Lilac:</span> Đang trích xuất Hộp quà bí mật...`);
            printOutput(`<pre style="color: #ffb703;">${giftBoxASCII}</pre>`);

            let count = 0;
            const interval = setInterval(() => {
                const tempGame = gamesList[Math.floor(Math.random() * gamesList.length)];
                printOutput(`[LILAC SYSTEM] Randomizing... 🎲 <span style="color: #90e0ef;">${tempGame}</span>`);
                terminalBody.scrollTop = terminalBody.scrollHeight;
                count++;

                if (count >= 6) {
                    clearInterval(interval);
                    const finalGame = gamesList[Math.floor(Math.random() * gamesList.length)];

                    printOutput(`
✨ <b>OH HOÁ RA ĐÂY LÀ QUÀ!</b> ✨
----------------------------------------------------------------------
🎁 Bí mật mà Diễm Quỳnh dành tặng Phú là một tựa game Steam:
<div class="gift-result">🎮 GAME: ${finalGame} 🎮</div>
📸 <b>LÀM SAO ĐỂ NHẬN?</b>
<i>Giờ bạn hãy <b>CHỤP MÀNH HÌNH</b> này lại và gửi ngay cho <b>Diễm Quỳnh</b> 
để nhận quà đi nhé! 🚀</i>
----------------------------------------------------------------------
                    `);

                    // Hiệu ứng pháo hoa
                    confetti({
                        particleCount: 120,
                        spread: 80,
                        origin: { y: 0.6 }
                    });

                    hasRolled = true;
                    terminalBody.scrollTop = terminalBody.scrollHeight;
                }
            }, 450);
            break;

        case 'clear':
            const outputs = document.querySelectorAll('.output');
            outputs.forEach(out => out.remove());
            break;

        case '':
            break;

        default:
            printOutput(`🌿 <span class="lilac-name">Lilac:</span> Lệnh này tớ chưa học! Gõ <span class="cmd-text">!lilac help</span> để xem danh sách lệnh nhé.`);
    }
}
