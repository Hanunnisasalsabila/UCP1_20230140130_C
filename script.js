document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        Swal.fire({
            title: '🎉 Diskon Spesial 20%!',
            html: `Dapatkan diskon <strong>20%</strong> untuk pendaftaran pertama Anda.<br><br> 
                  Gunakan kode: <span class="promo-code">NIGHTOWL20</span>`,
            icon: 'info',
            background: 'rgba(27, 38, 59, 0.97)',
            showCancelButton: true,
            confirmButtonText: 'Daftar Sekarang',
            cancelButtonText: 'Nanti Saja',
            customClass: {
                popup: 'custom-swal-popup',
                title: 'swal-title',
                htmlContainer: 'swal-html',
                confirmButton: 'swal-confirm-btn',
                cancelButton: 'swal-cancel-btn'
            },
            buttonsStyling: false,
            timer: 10000,
            timerProgressBar: true,
            didOpen: () => {
                const promoCode = document.querySelector('.promo-code');
                promoCode.style.display = 'inline-block';
                promoCode.animate([
                    { transform: 'scale(1)', background: 'rgba(76, 201, 240, 0.3)' },
                    { transform: 'scale(1.05)', background: 'rgba(76, 201, 240, 0.5)' },
                    { transform: 'scale(1)', background: 'rgba(76, 201, 240, 0.3)' }
                ], {
                    duration: 2000,
                    iterations: Infinity
                });
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'contact.html';
            }
        });
    }, 3000);

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                Swal.fire({
                    title: '✅ Pesan Terkirim!',
                    html: `Terima kasih telah menghubungi <strong>NightOwl</strong>.<br>
                          Tim kami akan merespons dalam 1x24 jam.`,
                    icon: 'success',
                    background: 'rgba(27, 38, 59, 0.97)',
                    confirmButtonText: 'Mengerti',
                    customClass: {
                        popup: 'custom-swal-popup',
                        title: 'swal-title',
                        htmlContainer: 'swal-html',
                        confirmButton: 'swal-confirm-btn'
                    },
                    buttonsStyling: false,
                    willClose: () => {
                        contactForm.reset();
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                        
                        const formContainer = document.querySelector('.contact-form');
                        formContainer.animate([
                            { boxShadow: '0 0 0 0 rgba(67, 97, 238, 0)' },
                            { boxShadow: '0 0 0 10px rgba(67, 97, 238, 0.3)' },
                            { boxShadow: '0 0 0 0 rgba(67, 97, 238, 0)' }
                        ], {
                            duration: 1000
                        });
                    }
                });
            }, 1500);
        });
    }

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', smoothScroll);
        }
    });

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            history.pushState(null, null, targetId);
        }
    }

    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon i');
            if (icon) {
                icon.animate([
                    { transform: 'rotate(0deg)' },
                    { transform: 'rotate(15deg)' },
                    { transform: 'rotate(-5deg)' },
                    { transform: 'rotate(0deg)' }
                ], {
                    duration: 500
                });
            }
        });
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .info-item, .form-group');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    document.querySelectorAll('.feature-card, .info-item, .form-group').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

const style = document.createElement('style');
style.textContent = ``;
document.head.appendChild(style);

// Fungsi untuk menampilkan waktu real-time
function updateDateTime() {
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const dayName = days[now.getDay()];
    
    const date = now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    const time = now.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    const dayElement = document.getElementById('current-day');
    const dateElement = document.getElementById('current-date');
    const timeElement = document.getElementById('current-time');
    
    if (dayElement) dayElement.textContent = dayName;
    if (dateElement) dateElement.textContent = date;
    if (timeElement) timeElement.textContent = time;
}
document.addEventListener('DOMContentLoaded', function() {
    updateDateTime();
    setInterval(updateDateTime, 1000);   
    // Update elemen
    document.getElementById('current-day').textContent = dayName;
    document.getElementById('current-date').textContent = date;
    document.getElementById('current-time').textContent = time;
});

// Fungsi untuk memutar musik
function playBackgroundMusic() {
    // Buat elemen audio
    const audio = document.createElement('audio');
    audio.src = 'image/background-music.mp3'; // Ganti dengan file musik Anda
    audio.loop = true;
    audio.volume = 0.3; // Volume 30%
    audio.id = 'bg-music';
    
    // Tambahkan ke body
    document.body.appendChild(audio);
    
    // Mulai pemutaran setelah interaksi pengguna
    const playMusic = () => {
        audio.play().catch(e => console.log('Autoplay prevented:', e));
        document.removeEventListener('click', playMusic);
        document.removeEventListener('keydown', playMusic);
    };
    
    // Tunggu interaksi pengguna pertama
    document.addEventListener('click', playMusic);
    document.addEventListener('keydown', playMusic);
    
    // Tambahkan kontrol musik sederhana
    const musicControl = document.createElement('div');
    musicControl.innerHTML = `
        <button id="music-toggle" style="
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(27, 38, 59, 0.8);
            border: none;
            color: white;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.1);
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 1000;
        ">
            <i class="fas fa-music"></i>
        </button>
    `;
    document.body.appendChild(musicControl);
    
    // Toggle musik
    document.getElementById('music-toggle').addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            musicControl.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.pause();
            musicControl.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Update waktu setiap detik
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Mulai musik
    playBackgroundMusic();
    
    // ... (kode yang sudah ada sebelumnya)
});