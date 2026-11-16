// --- 1. DARK / LIGHT THEME TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        htmlElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
});

// --- 2. GALLERY CATEGORY FILTER ---
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryCards = document.querySelectorAll('.gallery-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        galleryCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// --- 3. LIGHTBOX IMAGE ZOOM SYSTEM ---
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(button) {
    const cardImg = button.parentElement.parentElement.querySelector('img');
    lightboxImg.src = cardImg.src;
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

// --- 4. HOTEL RATE CALCULATOR TOOL ---
const calculateRateBtn = document.getElementById('calculate-rate-btn');
calculateRateBtn.addEventListener('click', () => {
    const ratePerNight = parseFloat(document.getElementById('room-select').value) || 0;
    const nights = parseInt(document.getElementById('nights-input').value) || 1;
    
    const totalCost = ratePerNight * nights;
    
    document.getElementById('total-cost-title').innerText = `Estimated Cost: $${totalCost}`;
    document.getElementById('total-cost-desc').innerText = `For ${nights} night(s). Includes complimentary breakfast, Wi-Fi, and taxes.`;
    document.getElementById('rate-result').classList.remove('hidden');
});

// --- 5. FAQ ACCORDION ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        faqItems.forEach(other => {
            if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

// --- 6. BOOKING MODAL POPUP ---
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('open-modal-btn');

function toggleModal() {
    modal.classList.toggle('active');
}

openModalBtn.addEventListener('click', toggleModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) toggleModal();
});

// --- 7. ANIMATED STATS COUNTERS ---
const counters = document.querySelectorAll('.counter');
let animated = false;

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition && !animated) {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = target / 40;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 25);
                } else {
                    counter.innerText = target + (target === 99 ? '%' : '+');
                }
            };
            updateCount();
        });
        animated = true;
    }
});

// --- 8. CONTACT FORM SUBMISSION ---
const contactForm = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    successMsg.classList.remove('hidden');
    contactForm.reset();
    setTimeout(() => {
        successMsg.classList.add('hidden');
    }, 5000);
});