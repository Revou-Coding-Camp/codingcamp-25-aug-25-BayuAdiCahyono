// 1. Fungsi untuk mengganti nama di banner
function replaceName() {
    let name = prompt("Siapakah nama Anda?", "");
    if (name) {
        document.getElementById("display-name").textContent = name;
    }
}

// Panggil fungsi saat dokumen selesai dimuat
document.addEventListener("DOMContentLoaded", function() {
    replaceName();
});


// 2. Fungsi untuk validasi dan submit form
document.getElementById("message-form").addEventListener("submit", function(event) {
    // Mencegah form dari auto-refresh
    event.preventDefault();

    // Mengambil nilai dari input
    const fullName = document.getElementById("full-name").value;
    const birthDate = document.getElementById("birth-date").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const messages = document.getElementById("messages").value;

    // Validasi: Cek jika ada field yang kosong
    if (!fullName || !birthDate || !gender || !messages) {
        alert("Semua kolom harus diisi!");
        return; // Hentikan fungsi jika ada yang kosong
    }

    // Jika validasi berhasil, tampilkan hasilnya
    const currentTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    
    document.getElementById("current-time").textContent = currentTime;
    document.getElementById("sender-full-name").textContent = fullName;
    document.getElementById("sender-birth-date").textContent = birthDate;
    document.getElementById("sender-gender").textContent = gender.value;
    document.getElementById("sender-messages").textContent = messages;

    // Opsional: Kosongkan form setelah submit
    document.getElementById("message-form").reset();
});