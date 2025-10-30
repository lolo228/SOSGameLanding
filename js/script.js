// Mobile Menu Toggle
const burgerMenu = document.querySelector('.burger-menu');
const headerNav = document.querySelector('.header__nav');

burgerMenu.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    headerNav.classList.toggle('active');
    document.body.style.overflow = headerNav.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        headerNav.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Language Selector
const languageSelector = document.querySelector('.language-selector');
const languageCurrent = document.querySelector('.language-selector__current');
const languageDropdown = document.querySelector('.language-selector__dropdown');

if (languageSelector) {
    languageCurrent.addEventListener('click', (e) => {
        e.stopPropagation();
        languageSelector.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageSelector.classList.remove('active');
    });

    // Language selection
    const languageLinks = document.querySelectorAll('.language-selector__dropdown a');
    languageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = link.getAttribute('data-lang');
            languageCurrent.textContent = lang;
            languageSelector.classList.remove('active');
        });
    });
}

// Gallery Slider with Stack Effect
const gallerySlides = document.querySelectorAll('.gallery__slide');
const galleryNext = document.querySelector('.gallery__arrow--next');
let currentSlideIndex = 0;

function updateSlider(newIndex) {
    const totalSlides = gallerySlides.length;
    
    // Обновляем индекс
    currentSlideIndex = (newIndex + totalSlides) % totalSlides;
    
    // Обновляем позиции всех слайдов
    gallerySlides.forEach((slide, index) => {
        // Убираем активный класс со всех
        slide.classList.remove('active');
        
        // Вычисляем относительную позицию слайда
        let position = (index - currentSlideIndex + totalSlides) % totalSlides;
        
        // Устанавливаем data-index для CSS позиционирования
        slide.setAttribute('data-index', position);
        
        // Активный слайд
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        }
    });
}

// Клик по стрелке - переключение на следующий слайд
if (galleryNext) {
    galleryNext.addEventListener('click', () => {
        updateSlider(currentSlideIndex + 1);
    });
}

// Клик по точкам внутри каждого слайда
gallerySlides.forEach((slide) => {
    const dots = slide.querySelectorAll('.gallery__dot');
    dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
            e.stopPropagation(); // Предотвращаем всплытие
            const targetSlide = parseInt(dot.getAttribute('data-slide'));
            updateSlider(targetSlide);
        });
    });
});

// Клик по самому слайду тоже переключает
gallerySlides.forEach((slide) => {
    slide.addEventListener('click', () => {
        updateSlider(currentSlideIndex + 1);
    });
});

// Инициализация
updateSlider(0);

// Newsletter Form Validation
const newsletterForm = document.getElementById('newsletterForm');
const emailInput = document.getElementById('emailInput');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailInput.classList.add('error');
            alert('Please enter your email address');
            return;
        }
        
        if (!emailRegex.test(email)) {
            emailInput.classList.add('error');
            alert('Please enter a valid email address');
            return;
        }
        
        emailInput.classList.remove('error');
        alert('Thank you for subscribing!');
        emailInput.value = '';
    });
    
    emailInput.addEventListener('input', () => {
        emailInput.classList.remove('error');
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.backgroundColor = 'rgba(8, 10, 11, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.backdropFilter = 'none';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

