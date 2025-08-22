
// =============================
// KONFIGURASI
// =============================
// Contoh format: https://docs.google.com/spreadsheets/d/ID_SHEET/export?format=csv
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSKZFnWVSIK5c78A6f8fhh9QxHfJfGv1heyl8unahhoddEpUkOyWzHVB0Llx6AB3dHwhyLTJDgPySIN/pub?output=csv";

// Jika kolom dusun kamu banyak/berbeda nama, atur mapping-nya di sini:
const DUSUN_KEYS_ORDER = [
    "Dusun Kenep Krajan",
    "Dusun Kenep Gunungan",
    "Dusun Kluncing Legi",
    "Dusun Sumur Gemuling"
  ]; // sesuaikan
// =============================
// KONFIGURASI & DATA MAPPING
// =============================
let pendidikanChart; 
const pekerjaanMapping = {
    pekerjaan_petani: "Pertanian,Perkebunan,Perikanan",
    pekerjaan_industri: "Pabrik,Kerajinan,dll",
    pekerjaan_wiraswasta: "Wirausaha",
    pekerjaan_pelajar: "Pelajar/Mahasiswa",
    pekerjaan_guru : "Guru Swasta",
    perkerjaan_polri :"POLRI/ABRI",
    perkerjaan_pertambangan : "Pertambangan dan Pengalian",
    perkerjaan_kesehatan : "Tenaga Kesehatan",
    pekerjaan_lainnya: "Lainnya"
  };
  
  const statusNikahMapping = {
    nikah_belum: "Belum Menikah",
    nikah_menikah: "Menikah",
    nikah_janda_duda: "Janda/Duda"
  };
  
  const agamaMapping = {
    agama_islam: "Islam",
    agama_kristen: "Kristen",
    agama_hindu: "Hindu",
    agama_budha: "Budha"
  };
  
  const agamaIcons = {
    agama_islam: '<i class="fas fa-mosque"></i>',
    agama_kristen: '<i class="fas fa-church"></i>',
    agama_hindu: '<i class="fas fa-om"></i>',
    agama_budha: '<i class="fas fa-pray"></i>'
  };
  
  const statusNikahIcons = {
    nikah_belum: '👤',
    nikah_menikah: '💍',
    nikah_janda_duda: '🧓'
  };
  
  // =============================
  // FUNGSI-FUNGSI RENDER & LOGIKA
  // =============================
  
  // ... fungsi renderPekerjaan, renderStatusCards, loadData, dll ...
  
// =============================
// UTIL
// =============================
const $ = (sel) => document.querySelector(sel);
const setText = (sel, val) => { const el = $(sel); if (el) el.textContent = val; };
const toInt = (v) => {
  if (v === null || v === undefined) return 0;
  if (typeof v === "number") return v;
  return parseInt(String(v).replace(/[^\d-]/g, ""), 10) || 0;
};

// =============================
// STATE
// =============================
let umurChart, dusunChart;

// =============================
// RENDER
// =============================
function renderCards(data) {
  setText("#stat-total", `${toInt(data.total_penduduk)} Jiwa`);
  setText("#stat-kk", `${toInt(data.total_kk)} KK`);
  setText("#stat-l", `${toInt(data.laki_laki)} Jiwa`);
  setText("#stat-p", `${toInt(data.perempuan)} Jiwa`);
}

function renderUmurChart(data) {
  const labels = ["0–18", "19–35", "36–60", "61+"];

  const values = [
    toInt(data.umur_0_18 || data["umur 0_18"] || data["0_18"]),
    toInt(data.umur_19_35 || data["umur 19_35"] || data["19_35"]),
    toInt(data.umur_36_60 || data["umur 36_60"] || data["36_60"]),
    toInt(data.umur_61_plus || data["umur 61_plus"] || data["61_plus"]),
  ];

  const ctx = document.getElementById("umurChart").getContext("2d");
  if (umurChart) umurChart.destroy();

  umurChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [{
        label: "Jumlah (Jiwa)",
        data: values
        // biarkan Chart.js pilih warna default agar konsisten tema
      }]
    },
    options: {
      responsive: true,
      scales: { y: { beginAtZero: true } }
    }
  });
}

function renderDusunChart(data) {
  // Ambil nilai dusun sesuai urutan preferensi
  const labels = [];
  const values = [];

  DUSUN_KEYS_ORDER.forEach((key) => {
    // dukung nama kolom variasi: "Dusun A", "dusun_a", "dusun a"
    const candidates = [
      key,
      key.toLowerCase(),
      key.replace(/\s+/g, "_"),
      key.toLowerCase().replace(/\s+/g, "_")
    ];
    let val = 0;
    for (const c of candidates) {
      if (data[c] != null && data[c] !== "") { val = toInt(data[c]); break; }
    }
    labels.push(key);
    values.push(val);
  });

  const ctx = document.getElementById("dusunChart").getContext("2d");
  if (dusunChart) dusunChart.destroy();

  dusunChart = new Chart(ctx, {
    type: "pie",
    data: { labels, datasets: [{ data: values }] },
    options: { responsive: true }
  });
}
// Render kartu status (untuk status perkawinan & agama)
function renderStatusCards(containerId, data, mapping, icons) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
  
    for (const key in mapping) {
      const label = mapping[key];
      const value = Number(data[key]) || 0;
      const iconHTML = icons[key] || '<div class="icon">❓</div>';
  
      const cardHTML = `
        <div class="status-card">
          <div class="icon">${iconHTML}</div>
          <div class="label">${label}</div>
          <div class="count">${value.toLocaleString()}</div>
        </div>
      `;
      container.insertAdjacentHTML("beforeend", cardHTML);
    }
  }
//   render pendidikan
function renderPendidikanChart(data) {
    const labels = [
      "Belum/Tidak Sekolah",
      "SD",
      "SMP",
      "SMA",
      "Perguruan Tinggi"
    ];
  
    const values = [
      toInt(data.belum_sekolah),
      toInt(data.sd),
      toInt(data.smp),
      toInt(data.sma),
      toInt(data.perguruan_tinggi)
    ];
  
    const ctx = document.getElementById("pendidikanChart").getContext("2d");
  
    if (pendidikanChart) pendidikanChart.destroy();
  
    pendidikanChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Jumlah (Jiwa)",
          data: values,
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          borderRadius: 5,
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
  // Render pekerjaan: kartu + tabel
function renderPekerjaan(data, mapping) {
    const container = document.getElementById("pekerjaanCards");
    container.innerHTML = ""; // reset
  
    for (const key in mapping) {
      if (mapping.hasOwnProperty(key)) {
        const label = mapping[key];
        const val = data[key] || 0;
     
        
        const card = document.createElement("div");
        card.classList.add("card-pekerjaan");
  
        card.innerHTML = `
        <span class="label">${label}</span>
        <span class="value">${val.toLocaleString()} Jiwa</span>
      `;
      
  
        container.appendChild(card);
      }
    }
  }
  async function loadDataFromSheet(gid) {
    const url = `${SHEET_CSV_URL}&gid=${gid}`; // BASE_CSV_URL tanpa &gid
    try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        return parsed.data[0]; // ambil baris pertama
    } catch(e) {
        console.error("Gagal load sheet gid=" + gid, e);
        return null;
    }
}

  
// =============================
// FETCH DATA DARI GOOGLE SHEETS (CSV)
// =============================
function showLoading(b) { $("#loading").hidden = !b; }
function showLoaded() { $("#loaded").hidden = false; }
function showError(b) { $("#error").hidden = !b; }

async function loadData() {
  showLoading(true);
  showError(false);

  try {
      const sheet1 = await loadDataFromSheet(0); // sheet pertama
      const sheet2 = await loadDataFromSheet(1014910457); // sheet kedua
      const sheet3 = await loadDataFromSheet(1568639834); // sheet ketiga
   
      if(sheet1) renderCards(sheet1);
      if(sheet1) renderUmurChart(sheet1);
      if(sheet1) renderDusunChart(sheet1);
      if(sheet2) renderPekerjaan(sheet2, pekerjaanMapping);
      if(sheet2) renderStatusCards("statusPerkawinanCards", sheet2, statusNikahMapping, statusNikahIcons);
      if(sheet3) renderStatusCards("agamaCards", sheet3, agamaMapping, agamaIcons);
      if(sheet1) renderPendidikanChart(sheet1);

      showLoading(false);
      showLoaded();
  } catch(e) {
      console.error(e);
      showLoading(false);
      showError(true);
  }
}

  

document.addEventListener("DOMContentLoaded", loadData);
