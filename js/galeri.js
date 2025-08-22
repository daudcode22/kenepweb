
// Ambil elemen modal
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");

// Tambahkan event click ke semua gambar
document.querySelectorAll(".thumbnail").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

// Tutup modal jika klik tombol close
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Tutup modal jika klik area luar gambar
modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
