const slideBtn = document.getElementById("slideBtn");
let photos = [
    "../VIDEOOK/TranThuan/img/anhnen.jpg",
    "../VIDEOOK/TranThuan/img/anh2.jpg",
    "../VIDEOOK/TranThuan/img/anh3.jpg"
];
let photoIndex = 0;
let slideTimer = null;
let isSlideshow = false;

function showPhoto(i) {
    photo.src = photos[i];
}

function stopSlideshow() {
    isSlideshow = false;
    clearInterval(slideTimer);
    slideTimer = null;
}
slideBtn.onclick = () => {
    if (!isSlideshow) {
        startSlideshow();
        slideBtn.textContent = "■";
        slideBtn.title = "Dừng chiếu phim";
    } else {
        stopSlideshow();
        slideBtn.textContent = "🎞️";
        slideBtn.title = "Chiếu phim";
    }
};



//KHAI BÁO Bật / Tắt nhạc
const turnOff = document.getElementById("turnOffMusic"); // 🔇
const turnOn = document.getElementById("turnOnMusic"); // 🎵
const audio = document.getElementById("audioplay");


const img = document.getElementById("img");
const fsBtn = document.getElementById("fsBtn");
const playBtn = document.getElementById("playBtn");

const textWrap = document.getElementById("textWrap");

const modeBtn = document.getElementById("modeBtn");
const photo = document.getElementById("photo");
let isVideo = true;



function getScaleByScreen() {
    const baseW = 1920;
    const baseH = 1080;
    const rateW = window.innerWidth / baseW;
    const rateH = window.innerHeight / baseH;
    return Math.min(rateW, rateH);
}
let uiScale = getScaleByScreen();

let scale = 1;
let posX = 0,
    posY = 0;
let isDrag = false;
let startX = 0,
    startY = 0;
let uiTimer = null;


fsBtn.onclick = () => {
    scale = 1;
    posX = 0;
    posY = 0;
    update();

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};



document.addEventListener("fullscreenchange", () => {
    if (document.fullscreenElement) {
        fsBtn.textContent = "⤢";
        fsBtn.title = "Thoát toàn màn hình";
        showUI();
    } else {
        fsBtn.textContent = "⛶";
        fsBtn.title = "Toàn màn hình";
        playBtn.classList.remove("hideUI");
        fsBtn.classList.remove("hideUI");
        slideBtn.classList.remove("hideUI");
        turnOff.classList.remove("hideUI");
        turnOn.classList.remove("hideUI");
        playBtn.classList.add("showUI");
        fsBtn.classList.add("showUI");
        slideBtn.classList.add("showUI");
        turnOff.classList.add("showUI");
        turnOn.classList.add("showUI");
    }
});

/* Zoom */
window.addEventListener("wheel", e => {
    e.preventDefault();
    let delta = e.deltaY > 0 ? -0.1 : 0.1;
    scale += delta;
    scale = Math.min(Math.max(scale, 1), 3);
    update();
}, { passive: false });

function startDrag(e) {
    isDrag = true;
    const t = isVideo ? img : photo;
    t.style.cursor = "grabbing";
    startX = e.clientX - posX;
    startY = e.clientY - posY;
}
img.addEventListener("mousedown", startDrag);
photo.addEventListener("mousedown", startDrag); //PHẦN KÉO



window.addEventListener("mouseup", () => {
    isDrag = false;
    img.style.cursor = "grab";
    photo.style.cursor = "grab";
});
window.addEventListener("mousemove", e => {
    if (!isDrag) return;
    posX = e.clientX - startX;
    posY = e.clientY - startY;
    update();
});



function tylemanhinh() { // THEO TY LE MAN HINH
    uiScale = getScaleByScreen();
    textWrap.style.transform =
        `translateX(-50%) scale(${uiScale})`;
}
tylemanhinh();
window.addEventListener("resize", tylemanhinh);

function update() {
    const transformValue = `translate(${posX}px, ${posY}px) scale(${scale})`;
    const target = isVideo ? img : photo;
    target.style.transform = transformValue;

    // Nếu đang xem ảnh thì cho chữ đi theo ảnh
    if (!isVideo) {
        // colorText.style.transform = `translateX(-50%) ${transformValue}`;
        // subText.style.transform   = `translateX(-50%) ${transformValue}`;
        // textWrap.style.transform = `translateX(-50%) ${transformValue}`;
        textWrap.style.transform = `translateX(-50%) translate(${posX}px, ${posY}px) scale(${scale * uiScale})`;
    }
}

playBtn.onclick = () => {
    if (img.paused) {
        img.play();
        playBtn.textContent = "❚❚";
        playBtn.title = "Tạm dừng";
    } else {
        img.pause();
        playBtn.textContent = "▶";
        playBtn.title = "Tiếp tục";
    }
};

function showUI() {
    playBtn.classList.remove("hideUI");
    fsBtn.classList.remove("hideUI");
    modeBtn.classList.remove("hideUI");
    slideBtn.classList.remove("hideUI");
    turnOff.classList.remove("hideUI");
    turnOn.classList.remove("hideUI");

    playBtn.classList.add("showUI");
    fsBtn.classList.add("showUI");
    modeBtn.classList.add("showUI");
    slideBtn.classList.add("showUI");
    turnOff.classList.add("showUI");
    turnOn.classList.add("showUI");




    slideBtn



    clearTimeout(uiTimer);
    uiTimer = setTimeout(() => {
        if (document.fullscreenElement) {
            playBtn.classList.remove("showUI");
            fsBtn.classList.remove("showUI");
            modeBtn.classList.remove("showUI");
            slideBtn.classList.remove("showUI");
            turnOff.classList.remove("showUI");
            turnOn.classList.remove("showUI");

            playBtn.classList.add("hideUI");
            fsBtn.classList.add("hideUI");
            modeBtn.classList.add("hideUI");
            slideBtn.classList.add("hideUI");
            turnOff.classList.add("hideUI");
            turnOn.classList.add("hideUI");
        }
    }, 3000);
}

document.addEventListener("click", () => {
    if (document.fullscreenElement) showUI();
});

modeBtn.onclick = () => {
    // reset zoom & vị trí
    scale = 1;
    posX = 0;
    posY = 0;
    update();

    if (isVideo) {
        // sang ảnh
        img.pause();
        img.style.display = "none";
        photo.style.display = "block";
        colorText.style.display = "block";
        subText.style.display = "block";
        textWrap.style.display = "flex";
        modeBtn.textContent = "🎬";
        modeBtn.title = "Quay lại video";
    } else {
        // về video
        img.style.display = "block";
        colorText.style.display = "none";
        subText.style.display = "none";
        textWrap.style.display = "none";
        photo.style.display = "none";
        img.play();
        modeBtn.textContent = "📷"; //🌄 📷
        modeBtn.title = "Xem ảnh";

        // về video
        // stopPhotoEffect(); // 👈 TẮT HIỆU ỨNG
    }
    isVideo = !isVideo;
};


/* ===== CHỮ ĐỔI MÀU ===== */

var farbbibliothek = [];
// farbbibliothek[3] = [               màu tết
//     "#8B0000","#B00000","#D10000","#FF0000","#FF3333","#FF6666",
//     "#FF9999","#FFCC99","#FFA500","#FFB000","#FFD700","#FFFF00",
//     "#FFD700","#FFB000","#FFA500","#FFCC99","#FF9999","#FF6666",
//     "#FF3333","#FF0000","#D10000","#B00000","#8B0000","#660000"
// ];

farbbibliothek[3] = [
    "#FFFFFF", // trắng
    "#FFF5CC",
    "#FFE699",
    "#FFD966",
    "#FFCC33",
    "#FFB000", // vàng cam
    "#FFD700", // vàng kim
    "#FFF000",
    "#FFFF66",
    "#FFF9B0",
    "#FFFFFF",

    "#FFE6F0", // hồng nhạt
    "#FFB6C1",
    "#FFA0B4",
    "#FF85A1",
    "#FF6F91",

    "#FFD700",
    "#FFCC33",
    "#FFE699",
    "#FFF5CC",
    "#FFFFFF"
];

var farben = farbbibliothek[3];
var Buchstabe = [];
var text = "CHÚC MỪNG NĂM MỚI\nBÍNH NGỌ";

function string2array(b) {
    Buchstabe = [];
    while (farben.length < b.length) {
        farben = farben.concat(farben);
    }
    for (var k = 0; k < b.length; k++) {
        Buchstabe[k] = b.charAt(k);
    }
}

function divserzeugen() {
    var out = "";
    for (var b = 0; b < Buchstabe.length; b++) {
        if (Buchstabe[b] === "\n") {
            out += "<br>";
        } else {
            out += "<span id='a" + b + "'>" + Buchstabe[b] + "</span>";
        }
    }
    document.getElementById("colorText").innerHTML = out; // KHÔNG dùng document.write
    farbschrift();
}

function farbschrift() {
    for (var b = 0; b < Buchstabe.length; b++) {
        var el = document.getElementById("a" + b);
        if (el) el.style.color = farben[b];
    }
    farbverlauf();
}

function farbverlauf() {
    farben.unshift(farben.pop());
    setTimeout(farbschrift, 100);
}

/* Khởi động */
string2array(text);
divserzeugen();

const colorText = document.getElementById("colorText");
colorText.style.display = "none";


const tracks = [
    "https://files.catbox.moe/85tslb.mp3",
    "https://files.catbox.moe/bkdq1l.mp3",
    "https://files.catbox.moe/c2p58e.mp3"

    //https://files.catbox.moe/xpj454.mp4
];

let currentTrack = 0;

audio.src = tracks[currentTrack];
audio.loop = true;
audio.volume = 0.6;

turnOff.addEventListener("click", () => {
    audio.src = tracks[currentTrack];
    audio.loop = true;
    audio.play().catch(() => {});

    turnOff.style.display = "none";
    turnOn.style.display = "flex";
});

turnOn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;

    currentTrack = (currentTrack + 1) % tracks.length;

    turnOff.style.display = "flex";
    turnOn.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
    audio.play().then(() => {
        turnOff.style.display = "none";
        turnOn.style.display = "flex";
    }).catch(() => {
        turnOff.style.display = "flex";
        turnOn.style.display = "none";
    });
});

function startPhotoEffect() {
    photo.classList.add("photoEffect");
}

function stopPhotoEffect() {
    photo.classList.remove("photoEffect");
    photo.style.animation = "none";
    photo.offsetHeight; // force reflow
    photo.style.animation = "";
}