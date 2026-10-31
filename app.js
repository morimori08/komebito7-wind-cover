const WORKS = {
  1: {
    title: "作品①『風選のあと、唇にのこる音』",
    file: "./assets/komebito7_work1_fusen_wind.jpg",
    downloadName: "komebito7_work1_fusen_wind.jpg",
    defaultTone: "white",
    comment: `作品名：『風選のあと、唇にのこる音』
昔からお米づくりの仕上げには、風を送って軽い籾殻だけを吹き飛ばし、実の詰まったお米だけを手元に残す「風選（ふうせん）」という工程があります。また音声学の世界でも、人が「実り（ヒンディー語でファル）」という言葉を発するときには唇から小さな息の風が吹き出し、「ひととき（パル）」と呟くときには風が静かに止まります。
本作は、和紙と木肌の上に置いたお米と薄い紙片・籾殻に、左（裏表紙）から右（表表紙）へひと吹きの風を送り、余分な殻が弧を描いて舞い去ったあとに、艶やかなお米の粒が陽だまりの中に寄り添って残る瞬間を捉えたものです。日々の慌ただしさや余分な殻を心地よい風がさらっていったあとに、手元に静かに残る確かなひととき――1952年の精米店から始まった『こめびと』の時間を、目に見える風の軌跡として表現しました。`
  },
  2: {
    title: "作品②『まだ家具のない部屋に、最初の風を通す』",
    file: "./assets/komebito7_work2_first_breeze.jpg",
    downloadName: "komebito7_work2_first_breeze.jpg",
    defaultTone: "dark",
    comment: `作品名：『まだ家具のない部屋に、最初の風を通す』
新しい住まいへ引っ越した日、あるいは旅先のホテルにチェックインした夕暮れ、私たちが最初にするのは窓を開けて「風を通す」ことです。どんなに美しく整えられた空間も、最初の風が通り抜けた瞬間に初めて、その人の「いい時間」が流れる生きた場所へと変わります。
本作は、風の軌跡を繊細な針穴（ピンホール）として透かした薄い美濃和紙を窓辺に吊るし、秋風を受けてふわりと帆のように膨らんだ和紙と、その針穴を通り抜けた太陽光が無垢の木の床面に描いた「お米の粒のような光の風紋」を捉えた作品です。目に見えない風が光と影を連れて部屋へ入ってくる、始まりのひとときを込めました。`
  },
  3: {
    title: "作品③『二千年の風名を、麻布の舟に積む』",
    file: "./assets/komebito7_work3_wind_names_linen.jpg",
    downloadName: "komebito7_work3_wind_names_linen.jpg",
    defaultTone: "dark",
    comment: `作品名：『二千年の風名を、麻布の舟に積む』
かつて日本の農村や海辺では、稲穂を揺らす風にも舟を送り出す風にも、「やませ」「いなさ」「はえ」「まぜ」と一つずつ固有の名前をつけて風と対話していました。季節風（モンスーン）の語源である「季節を運ぶ風（mawsim）」もまた、海を越えて人と食文化をつないだ風です。
本作は、精米袋や旅の帆を思わせる生成りの麻布の上に、淡墨の風の流線と麻糸を添え、同じ風向きに寄り添う黄金色の稲穂と白い桜貝を自然光の斜光で捉えたミクストメディア作品です。大地で育まれたお米の旅路と、人生という長い旅路に吹く穏やかな追い風を重ね合わせています。`
  }
};

let currentWorkId = 1;

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach(b => b.classList.toggle("active", b.dataset.tab === name));
  document.querySelectorAll(".tab-panel").forEach(p => p.classList.toggle("active", p.id === "tab-" + name));
  if (name === "studio") renderStudio();
}

function selectWork(id) {
  currentWorkId = id;
  const w = WORKS[id];
  [1, 2, 3].forEach(i => document.getElementById("wbtn-" + i).classList.toggle("active", i === id));
  document.getElementById("galleryImg").src = w.file;
  document.getElementById("workTitle").textContent = w.title;
  document.getElementById("workComment").textContent = w.comment;
  const dl = document.getElementById("downloadJpgBtn");
  dl.href = w.file;
  dl.setAttribute("download", w.downloadName);
  document.getElementById("logoTone").value = w.defaultTone;
  updateGalleryOverlay();
}

function updateGalleryOverlay() {
  const showGuide = document.getElementById("toggleGuide").checked;
  const tone = document.getElementById("logoTone").value;
  const b5Only = document.getElementById("toggleB5Only").checked;
  const overlay = document.getElementById("mastheadOverlay");
  const fold = document.getElementById("foldLine");
  const stage = document.getElementById("b4Stage");
  const labels = document.getElementById("spreadLabels");

  overlay.style.display = showGuide ? "block" : "none";
  fold.style.display = (showGuide && !b5Only) ? "block" : "none";
  overlay.className = "masthead-overlay tone-" + tone;
  stage.classList.toggle("b5-front-only", b5Only);
  labels.style.visibility = b5Only ? "hidden" : "visible";
}

function copyText(str) {
  navigator.clipboard.writeText(str).then(() => showToast("クリップボードにコピーしました"));
}

function copyCurrentComment() {
  copyText(WORKS[currentWorkId].comment);
}

function copyWorkComment(id) {
  copyText(WORKS[id].comment);
}

function updateCountdown() {
  const deadline = new Date("2026-11-15T23:59:00+09:00").getTime();
  const now = Date.now();
  const diff = deadline - now;
  const el = document.getElementById("countdown");
  if (diff <= 0) {
    el.textContent = "応募締切時刻を過ぎています";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  el.textContent = `締切：2026/11/15(日) 23:59（残り ${days}日 ${hours}時間）`;
}

/* =========================================================
   Tab 2: Non-AI Optical B4 JPEG Cropper Studio (3640 x 2570)
   ========================================================= */
let studioImg = null;
let panX = 0;
let panY = 0;
let isDragging = false;
let dragStartX = 0;
let dragStartY = 0;

function initStudio() {
  const canvas = document.getElementById("cropCanvas");
  const input = document.getElementById("photoInput");

  input.addEventListener("change", e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        studioImg = img;
        panX = 0;
        panY = 0;
        document.getElementById("zoomRange").value = 100;
        document.getElementById("brightRange").value = 100;
        renderStudio();
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  });

  const startDrag = (x, y) => { isDragging = true; dragStartX = x - panX; dragStartY = y - panY; };
  const moveDrag = (x, y) => {
    if (!isDragging || !studioImg) return;
    panX = x - dragStartX;
    panY = y - dragStartY;
    renderStudio();
  };
  const endDrag = () => { isDragging = false; };

  canvas.addEventListener("mousedown", e => startDrag(e.offsetX, e.offsetY));
  window.addEventListener("mousemove", e => {
    if (!isDragging) return;
    const rect = canvas.getBoundingClientRect();
    moveDrag(e.clientX - rect.left, e.clientY - rect.top);
  });
  window.addEventListener("mouseup", endDrag);

  canvas.addEventListener("touchstart", e => {
    if (e.touches.length === 1) {
      const rect = canvas.getBoundingClientRect();
      startDrag(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  }, { passive: true });
  canvas.addEventListener("touchmove", e => {
    if (e.touches.length === 1 && isDragging) {
      e.preventDefault();
      const rect = canvas.getBoundingClientRect();
      moveDrag(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }
  }, { passive: false });
  canvas.addEventListener("touchend", endDrag);

  renderStudio();
}

function drawPhotoToContext(ctx, targetW, targetH, scaleFactorForPan) {
  const zoom = parseInt(document.getElementById("zoomRange").value, 10) / 100;
  const bright = parseInt(document.getElementById("brightRange").value, 10);
  const flipH = document.getElementById("studioFlipH").checked;

  ctx.save();
  ctx.fillStyle = "#2b2723";
  ctx.fillRect(0, 0, targetW, targetH);

  if (!studioImg) {
    ctx.fillStyle = "#cfc8bc";
    ctx.font = "bold 36px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("右の「ファイルを選択」から実写写真を読み込んでください", targetW / 2, targetH / 2 - 15);
    ctx.font = "26px sans-serif";
    ctx.fillStyle = "#9c9488";
    ctx.fillText("JIS B4ヨコ（3640 × 2570 px）比率でトリミング・ロゴ余白確認ができます", targetW / 2, targetH / 2 + 35);
    ctx.restore();
    return;
  }

  const baseScale = Math.max(targetW / studioImg.width, targetH / studioImg.height);
  const drawW = studioImg.width * baseScale * zoom;
  const drawH = studioImg.height * baseScale * zoom;
  const cx = targetW / 2 + panX * scaleFactorForPan;
  const cy = targetH / 2 + panY * scaleFactorForPan;

  ctx.filter = `brightness(${bright}%)`;
  ctx.translate(cx, cy);
  if (flipH) ctx.scale(-1, 1);
  ctx.drawImage(studioImg, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

function renderStudio() {
  const zoom = document.getElementById("zoomRange").value;
  const bright = document.getElementById("brightRange").value;
  document.getElementById("zoomVal").textContent = zoom + "%";
  document.getElementById("brightVal").textContent = bright + "%";

  const canvas = document.getElementById("cropCanvas");
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const panScale = rect.width > 0 ? canvas.width / rect.width : 1;

  drawPhotoToContext(ctx, canvas.width, canvas.height, panScale);

  if (document.getElementById("studioShowLogo").checked) {
    ctx.save();
    // Center fold
    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 4;
    ctx.setLineDash([16, 12]);
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();

    // Title safe zone (right half upper)
    ctx.strokeStyle = "rgba(220, 60, 40, 0.9)";
    ctx.fillStyle = "rgba(220, 60, 40, 0.14)";
    const tx = canvas.width * 0.585;
    const ty = canvas.height * 0.11;
    const tw = canvas.width * 0.325;
    const th = canvas.height * 0.17;
    ctx.fillRect(tx, ty, tw, th);
    ctx.strokeRect(tx, ty, tw, th);

    ctx.fillStyle = "rgba(255,255,255,0.92)";
    ctx.font = "96px 'Hiragino Mincho ProN', serif";
    ctx.textAlign = "center";
    ctx.fillText("こめびと", tx + tw / 2, ty + th * 0.76);

    // Vertical essay safe zone
    const ex = canvas.width * 0.875;
    const ey = canvas.height * 0.31;
    const ew = canvas.width * 0.085;
    const eh = canvas.height * 0.31;
    ctx.fillStyle = "rgba(220, 60, 40, 0.14)";
    ctx.fillRect(ex, ey, ew, eh);
    ctx.strokeRect(ex, ey, ew, eh);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 22px sans-serif";
    ctx.fillText("巻頭エッセイ帯", ex + ew / 2, ey + eh / 2);
    ctx.restore();
  }
}

function exportCleanB4Jpeg() {
  if (!studioImg) {
    showToast("先に写真ファイルを選択してください");
    return;
  }
  const outCanvas = document.createElement("canvas");
  outCanvas.width = 3640;
  outCanvas.height = 2570;
  const outCtx = outCanvas.getContext("2d");

  const previewCanvas = document.getElementById("cropCanvas");
  const rect = previewCanvas.getBoundingClientRect();
  const panScale = (rect.width > 0 ? previewCanvas.width / rect.width : 1) * (3640 / previewCanvas.width);

  drawPhotoToContext(outCtx, 3640, 2570, panScale);

  outCanvas.toBlob(blob => {
    if (!blob) return;
    const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "komebito7_realphoto_B4_3640x2570.jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    document.getElementById("exportStatus").textContent =
      `書き出し完了：3640×2570px（${sizeMB} MB ／ 10MB以下規定クリア・ガイド線なし）`;
    showToast("応募用B4 JPEGを保存しました");
  }, "image/jpeg", 0.92);
}

window.addEventListener("DOMContentLoaded", () => {
  [1, 2, 3].forEach(i => {
    document.getElementById("comment-text-" + i).value = WORKS[i].comment;
  });
  selectWork(1);
  updateCountdown();
  setInterval(updateCountdown, 60000);
  initStudio();
});
