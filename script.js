// DOM Yüklendikten Sonra Çalışacak Kodlar
document.addEventListener('DOMContentLoaded', function() {
    // Mobil Menü Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });

    // Sayfa kaydırıldığında navigasyonu sabitleme
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 50);
    });

    // Geri Sayım Sayacı
        function updateCountdown() {
            // Organizasyon tarihini ayarlayın (YYYY, MM-1, DD, HH, MM)
            const eventDate = new Date(2024, 11, 31, 18, 0); // 31 Aralık 2024, 18:00
            const now = new Date();
            const diff = eventDate - now;

            if (diff <= 0) {
                document.querySelector('.countdown-section').innerHTML = `
                    <div class="container">
                        <h2>Organizasyon Başladı!</h2>
                        <p>Etkinliğimize katılmak için hala geç değil.</p>
                        <a href="events.html" class="btn">Etkinlik Detayları</a>
                    </div>
                `;
                
                document.getElementById('sayac').innerHTML = `
                    <h2>Organizasyon Başladı!</h2>
                    <p style="color: var(--white); font-size: 1.1rem;">Etkinlik şu anda devam ediyor!</p>
                `;
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Ana sayfa hero bölümü
            const heroDays = document.getElementById('hero-days');
            const heroHours = document.getElementById('hero-hours');
            const heroMinutes = document.getElementById('hero-minutes');
            const heroSeconds = document.getElementById('hero-seconds');

            if (heroDays) heroDays.textContent = `${days.toString().padStart(2, '0')} Gün`;
            if (heroHours) heroHours.textContent = `${hours.toString().padStart(2, '0')} Saat`;
            if (heroMinutes) heroMinutes.textContent = `${minutes.toString().padStart(2, '0')} Dakika`;
            if (heroSeconds) heroSeconds.textContent = `${seconds.toString().padStart(2, '0')} Saniye`;

            // Alt bölüm countdown
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) {
                const newDays = days.toString().padStart(2, '0');
                if (daysEl.textContent !== newDays) {
                    daysEl.textContent = newDays;
                    daysEl.parentElement.classList.add('pulse');
                    setTimeout(() => daysEl.parentElement.classList.remove('pulse'), 600);
                }
            }

            if (hoursEl) {
                const newHours = hours.toString().padStart(2, '0');
                if (hoursEl.textContent !== newHours) {
                    hoursEl.textContent = newHours;
                    hoursEl.parentElement.classList.add('pulse');
                    setTimeout(() => hoursEl.parentElement.classList.remove('pulse'), 600);
                }
            }

            if (minutesEl) {
                const newMinutes = minutes.toString().padStart(2, '0');
                if (minutesEl.textContent !== newMinutes) {
                    minutesEl.textContent = newMinutes;
                    minutesEl.parentElement.classList.add('pulse');
                    setTimeout(() => minutesEl.parentElement.classList.remove('pulse'), 600);
                }
            }

            if (secondsEl) {
                const newSeconds = seconds.toString().padStart(2, '0');
                if (secondsEl.textContent !== newSeconds) {
                    secondsEl.textContent = newSeconds;
                    secondsEl.parentElement.classList.add('pulse');
                    setTimeout(() => secondsEl.parentElement.classList.remove('pulse'), 600);
                }
            }
        }

        // Sayacı ilk kez çalıştır
        updateCountdown();
        
        // Sayacı her saniye güncelle
        setInterval(updateCountdown, 1000);

        // Sayfa yüklendiğinde animasyon ekle
        window.addEventListener('load', function() {
            const countdownBoxes = document.querySelectorAll('.countdown-box');
            countdownBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = '0';
                    box.style.transform = 'translateY(20px)';
                    box.style.transition = 'all 0.6s ease';
                    
                    setTimeout(() => {
                        box.style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, 100);
                }, index * 200);
            });
        });

        // Responsive font ayarları için resize event
        window.addEventListener('resize', function() {
            // Ekran boyutu değiştiğinde gerekli ayarlamaları yap
            const viewportWidth = window.innerWidth;
            const countdownBoxes = document.querySelectorAll('.countdown-box');
            
            if (viewportWidth <= 480) {
                countdownBoxes.forEach(box => {
                    box.style.minHeight = 'auto';
                });
            }
        }); 
        
    // Fotoğraf Galerisi Lightbox (Ekstra özellik)
    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const title = this.querySelector('h3').textContent;
            const date = this.querySelector('p').textContent;
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="close-lightbox">&times;</span>
                    <img src="${imgSrc}" alt="${title}">
                    <div class="lightbox-info">
                        <h3>${title}</h3>
                        <p>${date}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            const closeBtn = lightbox.querySelector('.close-lightbox');
            closeBtn.addEventListener('click', function() {
                lightbox.remove();
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.remove();
                }
            });
        });
    });

    // Bülten Formu Gönderimi
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Burada AJAX isteği yapılabilir
            alert(`Teşekkür ederiz! ${email} adresiyle bültenimize abone oldunuz.`);
            emailInput.value = '';
        });
    }

    // Yumuşak Kaydırma (Smooth Scrolling)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Mobil menüyü kapat
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Sponsor Logolarına Otomatik Kaydırma Efekti
    const sponsorLogos = document.querySelector('.sponsor-logos');
    if (sponsorLogos) {
        let scrollAmount = 0;
        const scrollSpeed = 1;
        
        function scrollSponsors() {
            scrollAmount += scrollSpeed;
            if (scrollAmount >= sponsorLogos.scrollWidth / 2) {
                scrollAmount = 0;
            }
            sponsorLogos.scrollLeft = scrollAmount;
            requestAnimationFrame(scrollSponsors);
        }
        
        // Mause üzerine gelince durdur
        sponsorLogos.addEventListener('mouseenter', function() {
            scrollSpeed = 0;
        });
        
        // Mause çıkınca devam et
        sponsorLogos.addEventListener('mouseleave', function() {
            scrollSpeed = 1;
        });
        
        scrollSponsors();
    }
});

// Lightbox için CSS ekleme (JavaScript ile)
const lightboxStyle = document.createElement('style');
lightboxStyle.textContent = `
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        animation: fadeIn 0.3s forwards;
    }
    
    @keyframes fadeIn {
        to { opacity: 1; }
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .lightbox-content img {
        max-height: 80vh;
        max-width: 100%;
        border-radius: 8px;
    }
    
    .close-lightbox {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    
    .lightbox-info {
        color: white;
        text-align: center;
        margin-top: 15px;
    }
    
    .lightbox-info h3 {
        margin-bottom: 5px;
    }
`;
document.head.appendChild(lightboxStyle);

// Örnek organizasyon verileri
const organizasyonlar = [
  { id: 1, isim: "Çevre Temizliği Kampanyası", tarih: "2025-06-20T10:00:00" },
  { id: 2, isim: "Kültür Festivali", tarih: "2025-07-05T18:00:00" },
  { id: 3, isim: "Eğitim Semineri", tarih: "2025-08-15T14:00:00" }
];


// Sayaç hedef tarihi (ilk organizasyonun tarihi)
let hedefTarih = new Date(organizasyonlar[0].tarih);

// Sayaç elemanları
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

// Sayaç fonksiyonu
function sayaciGuncelle() {
  const simdi = new Date().getTime();
  const fark = hedefTarih.getTime() - simdi;

  if (fark <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    clearInterval(sayacInterval);
    return;
  }

  const gun = Math.floor(fark / (1000 * 60 * 60 * 24));
  const saat = Math.floor((fark % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const dakika = Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60));
  const saniye = Math.floor((fark % (1000 * 60)) / 1000);

  daysEl.textContent = gun.toString().padStart(2, "0");
  hoursEl.textContent = saat.toString().padStart(2, "0");
  minutesEl.textContent = dakika.toString().padStart(2, "0");
  secondsEl.textContent = saniye.toString().padStart(2, "0");
}

 // Sayaç güncellemesi her saniye
  sayaciGuncelle();
  window.sayacInterval = setInterval(sayaciGuncelle, 1000);

  // Sayfa yüklendiğinde işlemleri başlat
window.addEventListener("DOMContentLoaded", () => {
  organizasyonlariYukle();
  sonFotograflariYukle();
  fotograflariYukle();

  // Sayaç güncellemesi her saniye
  sayaciGuncelle();
  window.sayacInterval = setInterval(sayaciGuncelle, 1000);

  animasyonlariBaslat();

  // İstersen ileride harita entegrasyonu buraya eklenebilir
});


function toggleImages(container) {
  const images = container.querySelectorAll('.toggle-image');
  images.forEach(img => img.classList.toggle('active'));
}


//apply.js 
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('show');
});

function toggleImages(container) {
  const images = container.querySelectorAll('.toggle-image');
  images.forEach(img => img.classList.toggle('active'));
}

// Mobil menü aç/kapa
document.querySelector('.mobile-menu-btn').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
});
