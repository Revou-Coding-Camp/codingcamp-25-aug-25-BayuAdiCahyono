function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 10 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// === SMOOTH SCROLLING ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === NAVBAR SCROLL EFFECT ===
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 30px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }

    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// === FORM HANDLING ===

const messageForm = document.getElementById('message-form');

if (messageForm) {
    messageForm.addEventListener('submit', function(e) {
        // 1. Mencegah halaman refresh (sudah benar)
        e.preventDefault();
        
        // 2. Mengambil semua nilai dari form
        const name = document.getElementById('full-name').value;
        const birthDate = document.getElementById('birth-date').value;
        const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
        const message = document.getElementById('messages').value;
        
        // [PERUBAHAN 1: VALIDASI DATA] - Kita tambahkan lagi pengecekan data kosong
        if (!name || !birthDate || !gender || !message) {
            alert("Harap isi semua kolom yang wajib diisi!");
            return; // Hentikan fungsi jika ada yang kosong
        }
        
        // 3. Update tampilan di bagian hasil
        document.getElementById('sender-full-name').textContent = name;
        document.getElementById('sender-birth-date').textContent = birthDate;
        document.getElementById('sender-gender').textContent = gender;
        document.getElementById('sender-messages').textContent = message;
        
        // 4. Bersihkan form setelah data diambil
        this.reset();
        
        // 5. Animasi & feedback untuk pengguna
        const button = this.querySelector('button');
        const originalText = button.innerHTML;

        // [PERUBAHAN 2: PENGALAMAN PENGGUNA (UX)] - Nonaktifkan tombol saat mengirim
        button.disabled = true;
        button.innerHTML = '✅ Terkirim!';
        button.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        // Kembalikan tombol ke keadaan semula setelah 3 detik
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            button.disabled = false; // [PERUBAHAN 2] - Aktifkan kembali tombolnya
        }, 3000);
    });
}

// === CURRENT TIME UPDATE ===
function updateCurrentTime() {
    // 1. Cari dulu elemennya
    const timeElement = document.getElementById('current-time');
    
    // 2. HANYA jalankan sisa kode JIKA elemennya ditemukan
    if (timeElement) {
        const now = new Date();
        const timeString = now.toLocaleString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
        timeElement.textContent = timeString;
    }
}

// === CITY CLICK INTERACTION ===
document.querySelectorAll('.city').forEach(city => {
    city.addEventListener('click', function() {
        const cityName = this.getAttribute('data-city');
        
        // Add pulse effect
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'float 2s ease-in-out infinite';
        }, 10);
        
        // Show city info (you can expand this)
        alert(`🏢 Kantor ${cityName} - Siap melayani Anda!`);
    });
});

// === SCROLL ANIMATIONS ===
function animateOnScroll() {
    const elements = document.querySelectorAll('section');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.remove('loading');
            element.classList.add('loaded');
        }
    });
}

// === INITIALIZATION ===
window.addEventListener('load', function() {
    createParticles();
    updateCurrentTime();
    animateOnScroll();
    
    // Update time every second
    setInterval(updateCurrentTime, 1000);
    
    function askForName() {
        const displayNameElement = document.getElementById('display-name');
        
        // Hanya jalankan jika elemen sapaannya ada di halaman ini
        if (displayNameElement) {
            // Cek dulu apakah nama sudah tersimpan di session storage
            let storedName = sessionStorage.getItem('userName');
            
            // Jika tidak ada nama yang tersimpan, baru kita tanya
            if (!storedName) {
                storedName = prompt("Halo! Boleh tahu nama kamu?");
                
                // Jika pengguna tidak mengisi, kita beri nama default 'Tamu'
                if (!storedName) {
                    storedName = "Pengunjung";
                }
                
                // Simpan nama yang didapat ke session storage
                sessionStorage.setItem('userName', storedName);
            }
            
            // Tampilkan nama dari storage
            displayNameElement.textContent = storedName;
        }
    }
    askForName();
});

window.addEventListener('scroll', animateOnScroll);

// === ENHANCED FORM VALIDATION ===
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});