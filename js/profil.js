<<<<<<< HEAD
const btn = document.getElementById("toggle-btn");
  const hiddenItems = document.querySelectorAll("#program-list .hidden");
  let expanded = false;

  btn.addEventListener("click", () => {
 
    expanded = !expanded;
    hiddenItems.forEach(item => {
      item.style.display = expanded ? "list-item" : "none";
    });
    btn.textContent = expanded ? "Sembunyikan" : "Tampilkan Lebih Banyak";
  });

  // Pastikan awalnya disembunyikan
=======
const btn = document.getElementById("toggle-btn");
  const hiddenItems = document.querySelectorAll("#program-list .hidden");
  let expanded = false;

  btn.addEventListener("click", () => {
 
    expanded = !expanded;
    hiddenItems.forEach(item => {
      item.style.display = expanded ? "list-item" : "none";
    });
    btn.textContent = expanded ? "Sembunyikan" : "Tampilkan Lebih Banyak";
  });

  // Pastikan awalnya disembunyikan
>>>>>>> ce7c057 (second change)
  hiddenItems.forEach(item => item.style.display = "none");