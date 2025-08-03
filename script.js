
document.addEventListener('DOMContentLoaded', () => {
    // --- GitHub Configuration ---
    const GITHUB_USERNAME = 'jshubham1'; // Your GitHub username
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

    // --- Enhanced Navbar Functionality ---
    const header = document.querySelector('.main-header');
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('.nav-menu');
    let lastScrollY = window.scrollY;

    // Improved scroll behavior
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Smart navbar hiding/showing
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });

    // Enhanced mobile menu functionality
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // --- GitHub Projects Fetcher ---
    async function fetchGitHubProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        const sectionTitle = document.querySelector('#projects .section-title');

        // Show loading state
        projectsGrid.innerHTML = `
            <div class="loading-projects">
                <div class="loader"></div>
                <p>Fetching latest projects from GitHub...</p>
            </div>
        `;

        try {
            const response = await fetch(GITHUB_API_URL + '?sort=updated&per_page=50');

            if (!response.ok) {
                throw new Error(`GitHub API responded with ${response.status}: ${response.statusText}`);
            }

            const repositories = await response.json();

            // Filter and sort repositories
            const filteredRepos = repositories
                .filter(repo => !repo.fork && !repo.archived) // Exclude forks and archived repos
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort by last updated
                .slice(0, 5); // Get top 5

            // Clear loading state
            projectsGrid.innerHTML = '';

            // Update section title
            sectionTitle.textContent = 'Latest GitHub Projects';

            // Generate project cards
            filteredRepos.forEach((repo, index) => {
                const projectCard = createProjectCard(repo, index);
                projectsGrid.appendChild(projectCard);
            });

            // Re-apply animations to new elements
            applyAnimationsToProjects();

        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            showFallbackProjects();
        }
    }

    // --- Create Project Card from GitHub Data ---
    function createProjectCard(repo, index) {
        const card = document.createElement('div');
        card.className = 'project-card animate-on-scroll';
        card.style.animationDelay = `${index * 0.1}s`;

        // Generate project image based on primary language
        const projectImage = getProjectImage(repo.language);

        // Parse topics/technologies
        const technologies = repo.topics || [];
        if (repo.language && !technologies.includes(repo.language.toLowerCase())) {
            technologies.unshift(repo.language);
        }

        // Limit description length
        const description = repo.description
            ? (repo.description.length > 120
                ? repo.description.substring(0, 120) + '...'
                : repo.description)
            : 'No description available.';

        card.innerHTML = `
            <div class="project-image-container">
                <img alt="${repo.name} Project" class="project-image" src="${projectImage}">
                <div class="project-overlay">
                    <div class="project-links">
                        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" class="project-link" title="Live Demo">
                            <i class="fas fa-external-link-alt"></i>
                        </a>` : ''}
                        <a href="${repo.html_url}" target="_blank" class="project-link" title="View Source">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${formatRepoName(repo.name)}</h3>
                <p class="project-description">${description}</p>
                <div class="project-stats">
                    <span class="stat">
                        <i class="fas fa-star"></i>
                        ${repo.stargazers_count}
                    </span>
                    <span class="stat">
                        <i class="fas fa-code-branch"></i>
                        ${repo.forks_count}
                    </span>
                    <span class="stat">
                        <i class="fas fa-calendar-alt"></i>
                        ${formatDate(repo.updated_at)}
                    </span>
                </div>
                ${technologies.length > 0 ? `
                <div class="project-tech">
                    ${technologies.slice(0, 4).map(tech =>
                        `<span>${tech}</span>`
                    ).join('')}
                </div>
                ` : ''}
            </div>
        `;

        return card;
    }

    // --- Helper Functions ---
    function getProjectImage(language) {
        const imageMap = {
            'JavaScript': 'https://picsum.photos/seed/javascript/600/400',
            'Java': 'https://picsum.photos/seed/java/600/400',
            'Python': 'https://picsum.photos/seed/python/600/400',
            'TypeScript': 'https://picsum.photos/seed/typescript/600/400',
            'HTML': 'https://picsum.photos/seed/html/600/400',
            'CSS': 'https://picsum.photos/seed/css/600/400',
            'React': 'https://picsum.photos/seed/react/600/400',
            'Vue': 'https://picsum.photos/seed/vue/600/400',
            'Angular': 'https://picsum.photos/seed/angular/600/400',
            'Node.js': 'https://picsum.photos/seed/nodejs/600/400',
            'Go': 'https://picsum.photos/seed/golang/600/400',
            'Rust': 'https://picsum.photos/seed/rust/600/400',
            'C++': 'https://picsum.photos/seed/cpp/600/400',
            'C#': 'https://picsum.photos/seed/csharp/600/400'
        };

        return imageMap[language] || 'https://picsum.photos/seed/project/600/400';
    }

    function formatRepoName(name) {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    function showFallbackProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        const sectionTitle = document.querySelector('#projects .section-title');

        sectionTitle.textContent = 'Featured Projects';

        projectsGrid.innerHTML = `
            <div class="project-card animate-on-scroll">
                <div class="project-image-container">
                    <img alt="Banking API Project" class="project-image" src="https://picsum.photos/seed/banking/600/400">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="project-link">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">Banking Payment APIs</h3>
                    <p class="project-description">RESTful APIs for SEPA and International payments handling millions of transactions daily with high scalability and reliability.</p>
                    <div class="project-tech">
                        <span>Java 17</span>
                        <span>Spring Boot 3</span>
                        <span>Azure</span>
                        <span>PostgreSQL</span>
                    </div>
                </div>
            </div>
            <div class="error-message">
                <p><i class="fas fa-exclamation-triangle"></i> Unable to load projects from GitHub. Showing fallback projects.</p>
            </div>
        `;
    }

    function applyAnimationsToProjects() {
        const newProjectCards = document.querySelectorAll('.project-card');

        newProjectCards.forEach((card, index) => {
            // Apply 3D hover effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });

            // Re-observe for scroll animations
            observer.observe(card);
        });
    }

    // --- Enhanced scroll animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars
                if (entry.target.classList.contains('skill-card')) {
                    const skillBar = entry.target.querySelector('.skill-bar');
                    if (skillBar) {
                        const level = skillBar.getAttribute('data-level');
                        setTimeout(() => {
                            skillBar.style.width = level + '%';
                        }, 200);
                    }
                }
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach((el, index) => {
        el.style.setProperty('--animation-order', index);
        observer.observe(el);
    });

    // --- Initialize GitHub Projects ---
    fetchGitHubProjects();

    // --- Active nav link highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a.nav-link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentSectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { 
        rootMargin: '-30% 0px -70% 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Email Popup Functionality ---
    const emailLinks = document.querySelectorAll('a[href*="mailto:jshubham@live.in"]');
    const emailPopup = document.getElementById('emailPopup');
    const closePopup = document.getElementById('closePopup');

    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            emailPopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (closePopup) {
    closePopup.addEventListener('click', () => {
        emailPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    }

    if (emailPopup) {
    emailPopup.addEventListener('click', (e) => {
        if (e.target === emailPopup) {
            emailPopup.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    }

    // --- Contact Form Functionality ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Create mailto link with form data
        const mailtoLink = `mailto:jshubham@live.in?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hi Shubham,\n\n${message}\n\nBest regards,\n${name}\n${email}`)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fas fa-check"></i>';
        submitBtn.style.background = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
    });
    }

    // --- Smooth Scrolling Enhancement ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Typing Animation Enhancement ---
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        typingText.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Blinking cursor animation
                setInterval(() => {
                    typingText.style.borderRightColor = 
                        typingText.style.borderRightColor === 'transparent' 
                            ? 'var(--accent-color)' 
                            : 'transparent';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // --- Parallax Effect for Background Shapes ---
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // --- Add Loading Animation ---
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.animate-on-load');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animationDelay = `${index * 0.2}s`;
            }, 100);
        });
    });

    // --- Add Particle Animation to Hero Section ---
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(255, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${5 + Math.random() * 10}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        aboutSection.appendChild(particle);
    }
    }
});

// --- Add custom CSS for loading state and GitHub projects ---
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) * {
        animation-play-state: paused !important;
    }
    
    .loaded .animate-on-load {
        animation-play-state: running !important;
    }

    /* Loading Projects Styles */
    .loading-projects {
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 60px 20px;
        color: var(--text-color);
    }

    .loader {
        width: 40px;
        height: 40px;
        border: 4px solid var(--light-bg-color);
        border-top: 4px solid var(--accent-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .loading-projects p {
        font-size: 1.1rem;
        opacity: 0.8;
    }

    /* Project Stats Styles */
    .project-stats {
        display: flex;
        gap: 15px;
        margin: 15px 0;
        font-size: 0.9rem;
        color: var(--text-color);
        opacity: 0.8;
    }

    .stat {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .stat i {
        color: var(--accent-color);
        font-size: 0.8rem;
    }

    /* Error Message Styles */
    .error-message {
        grid-column: 1 / -1;
        background: rgba(255, 107, 107, 0.1);
        border: 1px solid rgba(255, 107, 107, 0.3);
        border-radius: 8px;
        padding: 15px;
        text-align: center;
        margin-top: 20px;
    }

    .error-message p {
        color: #d63031;
        margin: 0;
    }

    .error-message i {
        margin-right: 8px;
    }

    /* Responsive adjustments for project stats */
    @media(max-width: 480px) {
        .project-stats {
            flex-wrap: wrap;
            gap: 10px;
        }

        .stat {
            font-size: 0.8rem;
        }
    }
`;
document.head.appendChild(style);
