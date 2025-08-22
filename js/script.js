<<<<<<< HEAD


// Peta Desa Kenep (koordinat contoh)
const map = L.map('map').setView([-7.618200066027505, 112.74874664441553], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([-7.618200066027505, 112.74874664441553]).addTo(map)
    .bindPopup("<b>Desa Kenep</b><br>Lokasi Pusat Desa")
    .openPopup();


// active navlink
// const navLinks = document.querySelectorAll("nav a");


//     navLinks.forEach(link => {
//         link.addEventListener("click", function() {
//             console.log('navLinks count =', document.querySelectorAll('nav a').length);
//             navLinks.forEach(nav => nav.classList.remove("active")); // hapus semua
//             this.classList.add("active"); // tambahkan ke yang diklik
//         });
//     });
=======


// Peta Desa Kenep (koordinat contoh)
const map = L.map('map').setView([-7.618200066027505, 112.74874664441553], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

L.marker([-7.618200066027505, 112.74874664441553]).addTo(map)
    .bindPopup("<b>Desa Kenep</b><br>Lokasi Pusat Desa")
    .openPopup();


// active navlink
// const navLinks = document.querySelectorAll("nav a");


//     navLinks.forEach(link => {
//         link.addEventListener("click", function() {
//             console.log('navLinks count =', document.querySelectorAll('nav a').length);
//             navLinks.forEach(nav => nav.classList.remove("active")); // hapus semua
//             this.classList.add("active"); // tambahkan ke yang diklik
//         });
//     });
>>>>>>> ce7c057 (second change)
    