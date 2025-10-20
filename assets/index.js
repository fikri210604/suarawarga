function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  // Data awal (bisa diganti ambil dari file JSON)
  let aspirasiData = JSON.parse(localStorage.getItem("aspirasi")) || [
    { id: 1, judul: "Perbaikan Jalan RT 05", kategori: "Infrastruktur", deskripsi: "Jalan utama RT 05 mengalami kerusakan parah yang mengganggu aktivitas warga.", status: "Selesai", lokasi: "RT 05", dukungan: 342, liked: false },
    { id: 2, judul: "Taman Bermain Anak", kategori: "Lingkungan", deskripsi: "Pembangunan taman bermain di lapangan RW 02 untuk anak-anak.", status: "Proses", lokasi: "RW 02", dukungan: 189, liked: false },
    { id: 3, judul: "Penerangan Jalan", kategori: "Sosial", deskripsi: "Beberapa area masih gelap di malam hari, usulan pemasangan lampu jalan.", status: "Menunggu", lokasi: "RT 07", dukungan: 156, liked: false }
  ];
  
  // Render aspirasi
  function renderAspirasi() {
    const container = document.getElementById("aspirasi-list");
    container.innerHTML = aspirasiData.map(item => `
      <div class="aspirasi-card">
        <span class="badge-${getBadgeColor(item.status)}">${item.status}</span>
        <h3 class="text-lg font-semibold mt-2 mb-1">${item.judul}</h3>
        <p class="text-gray-700 mb-3">${item.deskripsi}</p>
        <div class="meta mb-3">📍 ${item.lokasi}</div>
  
        <div class="flex justify-between items-center">
          <button onclick="toggleLike(${item.id})"
            class="text-sm px-4 py-2 rounded-lg font-semibold transition ${
              item.liked ? 'bg-green-600 text-white' : 'bg-red-600 text-white hover:bg-red-700'
            }">
            👍 ${item.liked ? 'Disukai' : 'Dukung'}
          </button>
          <span class="text-gray-600 font-medium">${item.dukungan} Dukungan</span>
        </div>
      </div>
    `).join("");
  }
  
  function getBadgeColor(status) {
    status = status.toLowerCase();
    if (status.includes("selesai")) return "green";
    if (status.includes("proses")) return "blue";
    if (status.includes("menunggu")) return "yellow";
    return "gray";
  }
  
  // Tambah aspirasi baru
  const form = document.getElementById("aspirasi-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const judul = document.getElementById("judul").value.trim();
      const lokasi = document.getElementById("lokasi").value.trim();
      const kategori = document.getElementById("kategori").value.trim();
      const deskripsi = document.getElementById("deskripsi").value.trim();
  
      if (!judul || !lokasi || !kategori || !deskripsi) {
        alert("Harap isi semua field sebelum mengirim aspirasi.");
        return;
      }
  
      const baru = {
        id: Date.now(),
        judul,
        kategori,
        deskripsi,
        status: "Menunggu",
        lokasi,
        dukungan: 0,
        liked: false
      };
  
      aspirasiData.push(baru);
      localStorage.setItem("aspirasi", JSON.stringify(aspirasiData));
      renderAspirasi();
      showPage("aspirasi");
      e.target.reset();
    });
  }
  
  // Fungsi toggle like/unlike
  function toggleLike(id) {
    const aspirasi = aspirasiData.find(a => a.id === id);
    if (aspirasi) {
      aspirasi.liked = !aspirasi.liked;
      aspirasi.dukungan += aspirasi.liked ? 1 : -1;
      localStorage.setItem("aspirasi", JSON.stringify(aspirasiData));
      renderAspirasi();
    }
  }
  
  // Inisialisasi
  document.addEventListener("DOMContentLoaded", renderAspirasi);
  