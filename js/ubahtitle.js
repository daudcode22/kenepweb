let page = window.location.pathname.split("/").pop().toLowerCase();

// Hilangkan ekstensi .html kalau ada
if (page.includes(".")) {
  page = page.split(".")[0];
}

let titleText = "Desa Kenep";
let headerText = "";

if (page === "" || page === "index") {
  titleText = "Beranda - Desa Kenep";
  headerText = "Beranda";
} else if (page === "profil") {
  titleText = "Profil Desa - Desa Kenep";
  headerText = "Profil Desa";
} else if (page === "galeri") {
  titleText = "Galeri - Desa Kenep";
  headerText = "Galeri";
}

document.title = titleText;

const headerEl = document.getElementById("page-title");
if (headerEl) headerEl.textContent = headerText;
