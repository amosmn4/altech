document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('.nav-list');

    mobileToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navList.classList.toggle('open');
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Dropdown functionality handled via CSS hover, removed conflicting JS handling

    // Project slider functionality
    const projectItems = document.querySelectorAll('.project-item');
    let currentProject = 0;

    function showProject(index) {
        projectItems.forEach((item, i) => {
            item.style.display = i === index ? 'flex' : 'none';
        });
    }

    // Initialize dots
    const dotsContainer = document.querySelector('.slider-dots');
    projectItems.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentProject = i;
            showProject(currentProject);
            updateDots();
        });
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentProject);
        });
    }

    // Show initial project
    showProject(currentProject);

    // Auto advance projects
    setInterval(() => {
        currentProject = (currentProject + 1) % projectItems.length;
        showProject(currentProject);
        updateDots();
    }, 5000);

    // Hero Section Slider
    const heroSlides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 5000); // Automatically change hero slide every 5 seconds

    // Form submission functionality
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Simulate form submission (You would replace this with an actual API call)
        alert('Thank you for your message. We will get back to you soon!');
        form.reset();
    });

    // Image zoom functionality for project images
    const projectImages = document.querySelectorAll('.project-slide img');
    projectImages.forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoomed');
        });
    });

    // Header scroll effect - change background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Dark/Light Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.body.setAttribute('data-theme', 'light');
        } else {
            document.body.setAttribute('data-theme', 'dark');
        }
    });


    // Search Functionality
    const searchBox = document.querySelector('.search-box input');
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.classList.add('search-results');
    searchBox.addEventListener('input', () => {
        const query = searchBox.value.toLowerCase();
        searchResultsContainer.innerHTML = ''; // Clear previous results
        if (query) {
            const results = [...document.querySelectorAll('section')]
                .filter(section => section.innerText.toLowerCase().includes(query))
                .map(section => `<p>${section.innerText}</p>`);
            searchResultsContainer.innerHTML = results.join('');
            searchBox.parentNode.appendChild(searchResultsContainer);
        }
    });
});
