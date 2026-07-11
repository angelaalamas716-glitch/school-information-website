const themeToggle = document.getElementById('themeToggle');

window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeToggle) themeToggle.textContent = ' Light Mode';
    } else {
        if (themeToggle) themeToggle.textContent = ' Dark Mode';
    }
});

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? ' Light Mode' : ' Dark Mode';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Hamburger menu toggle (mobile/tablet nav)
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navLinks = document.getElementById('navLinks');

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // Close the menu automatically after tapping a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
        });
    });
}

// Move the theme toggle button into the mobile nav dropdown on small screens,
// and back into the header controls on desktop/tablet.
const headerControls = document.querySelector('.header-controls');
const themeToggleSlot = document.getElementById('themeToggleSlot');
const mobileQuery = window.matchMedia('(max-width: 768px)');

function placeThemeToggle(e) {
    if (!themeToggle) return;
    if (e.matches) {
        if (themeToggleSlot) themeToggleSlot.appendChild(themeToggle);
    } else {
        if (headerControls) headerControls.insertBefore(themeToggle, hamburgerBtn);
    }
}

if (themeToggleSlot && headerControls) {
    placeThemeToggle(mobileQuery);
    mobileQuery.addEventListener('change', placeThemeToggle);
}

const searchBox = document.getElementById('searchBox');
if (searchBox) {
    searchBox.addEventListener('input', () => {
        const query = searchBox.value.trim().toLowerCase();
        const allCards = document.querySelectorAll('.card');
        let found = false;

        allCards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(query) || query === '') {
                card.style.display = 'block';
                found = true;
            } else {
                card.style.display = 'none';
            }
        });

        const noResult = document.getElementById('noResultMsg');
        if (!found && query !== '') {
            if (!noResult) {
                const msg = document.createElement('div');
                msg.id = 'noResultMsg';
                msg.className = 'card';
                msg.innerHTML = '<p style="text-align:center; color:var(--text-light);">No matching content found.</p>';
                document.querySelector('section .container').appendChild(msg);
            }
        } else if (noResult) {
            noResult.remove();
        }
    });
}

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// Auto-slide every 5 seconds
if (slides.length > 0) {
    showSlide(0);
    setInterval(() => changeSlide(1), 5000);
}

function filterAnnouncements(category) {
    const items = document.querySelectorAll('.announcement-item');
    const buttons = document.querySelectorAll('.filter-buttons button');

    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
