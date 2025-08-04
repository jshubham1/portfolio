document.addEventListener('DOMContentLoaded', () => {
    // GitHub Configuration
    const GITHUB_USERNAME = 'jshubham1';
    const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
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

    // Fetch GitHub Projects
    async function fetchGitHubProjects() {
        const projectsGrid = document.querySelector('#projects-grid');

        try {
            const response = await fetch(GITHUB_API_URL);
            const repos = await response.json();

            // Filter and sort repositories
            const featuredRepos = repos
                .filter(repo => !repo.fork && repo.description)
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
                .slice(0, 6);

            projectsGrid.innerHTML = '';

            featuredRepos.forEach(repo => {
                const projectCard = createProjectCard(repo);
                projectsGrid.appendChild(projectCard);
            });

        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
            projectsGrid.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-warning">
                        <i class="fas fa-exclamation-triangle me-2"></i>
                        Unable to fetch projects. Please check back later.
                    </div>
                </div>
            `;
        }
    }

    function createProjectCard(repo) {
        const col = document.createElement('div');
        col.className = 'col-lg-4 col-md-6 mb-4';

        const languages = repo.language ? [repo.language] : ['JavaScript'];
        const languageColors = {
            'JavaScript': 'warning',
            'Java': 'danger',
            'Python': 'success',
            'HTML': 'info',
            'CSS': 'primary'
        };

        col.innerHTML = `
            <div class="card project-card h-100 border-0 shadow-sm">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary mb-3">
                        <i class="fab fa-github me-2"></i>${repo.name}
                    </h5>
                    <p class="card-text flex-grow-1">${repo.description || 'No description available'}</p>
                    <div class="mb-3">
                        ${languages.map(lang => `
                            <span class="badge bg-${languageColors[lang] || 'secondary'} me-2">${lang}</span>
                        `).join('')}
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            <i class="fas fa-star me-1"></i>${repo.stargazers_count}
                            <i class="fas fa-code-branch ms-2 me-1"></i>${repo.forks_count}
                        </small>
                        <div>
                            <a href="${repo.html_url}" target="_blank" class="btn btn-outline-primary btn-sm">
                                <i class="fas fa-external-link-alt me-1"></i>View
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;

        return col;
    }

    // Updated loadRecommendations function in script.js
    function loadRecommendations() {
        const recommendations = [
            {
                name: "Santhosh Penumarthi",
                title: "Software Engineering Manager at Gap Inc.",
                date: "October 10, 2022",
                text: "I got to work with Shubham at Gap Inc. He is one of my team members. One thing he inspired me is his self-awareness. He knows where he is good at and on what areas he has to make more time for. Though he is exceptionally good on the technical front he strives to be at same level on the functional aspects as well. One other thing I liked about him is his constructive questioning ability.",
                relationship: "Santhosh managed Shubham directly"
            },
            {
                name: "Arishti Salaria",
                title: "Software Engineer @Gap Inc.",
                date: "September 15, 2022",
                text: "I recently joined GAP Inc. and was lucky enough to work with Shubham. He is super friendly, hardworking and has a great knowledge in the micro services and spring boot area. Being a fresher to the company he helped me learn about the company, team, functionalities in a great manner. Always supported me to learn and ask more and more doubts.",
                relationship: "Shubham was senior to Arishti but didn't manage Arishti directly"
            },
            {
                name: "Kelly Borowski",
                title: "Ex-corporate turned Meditation Teacher",
                date: "April 20, 2021",
                text: "Shubham is super easy to work with. I had the opportunity to work with Shubham on a web app development project. He is an excellent attentive listener, always openly receptive to input on UI/UX and implementation changes, while asking relevant questions to reach understanding and agreement on a direction forward.",
                relationship: "Kelly worked with Shubham but on different teams"
            },
            {
                name: "Nagendra Devireddy",
                title: "Software Engineer at Apple",
                date: "February 28, 2021",
                text: "I had the opportunity of mentoring him, his initial days of Qualcomm. He has an easiness to build interpersonal relations with others. Shubham possesses a winning combination of solid tech skills and business sense, I learned a great deal from him. Give him the really challenging tasks, the ones that everyone else is struggling with, and he will get them done.",
                relationship: "Nagendra was senior to Shubham but didn't manage Shubham directly"
            },
            {
                name: "Vaibhav Jain",
                title: "Principal Software Engineering Manager at Microsoft",
                date: "September 8, 2020",
                text: "Shubham is a dedicated and hardworking team member. He has been appreciated by his Project Lead and team members for his good work in AngularJs and Spring boot. He developed several modules using Clean Coding best practices. Shubham submitted research ideas to the Qualcomm's innovative idea's portal. Shubham has actively organized and participated in activities such as team outings.",
                relationship: "Vaibhav managed Shubham directly"
            },
            {
                name: "Abhishek Shukla",
                title: "Recalibrating",
                date: "May 15, 2018",
                text: "Shubham is a focused, dedicated and jovial professional who believes in having ideas, transforming his ideas to vision and putting that vision to action. An eloquent public speaker and a fitness enthusiast, he always focuses on getting things done. In addition to his meticulous work ethics, he also is a great team player and a good event organizer.",
                relationship: "Abhishek worked with Shubham on the same team"
            }
        ];

        const container = document.querySelector('#recommendations-container');
        container.innerHTML = '';

        recommendations.forEach((rec, index) => {
            const isActive = index === 0 ? 'active' : '';
            const slide = document.createElement('div');
            slide.className = `carousel-item ${isActive}`;

            // Generate initials for avatar
            const initials = rec.name.split(' ').map(n => n[0]).join('');

            // Generate a consistent color based on name
            const colors = ['primary', 'success', 'info', 'warning', 'danger', 'secondary'];
            const colorIndex = rec.name.charCodeAt(0) % colors.length;
            const avatarColor = colors[colorIndex];

            slide.innerHTML = `
                <div class="card recommendation-card border-0 mx-auto" style="max-width: 700px;">
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center mb-4">
                            <div class="rounded-circle bg-${avatarColor} d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                 style="width: 70px; height: 70px;">
                                <span class="text-white fw-bold fs-4">${initials}</span>
                            </div>
                            <div class="flex-grow-1">
                                <h5 class="mb-1 text-dark fw-bold">${rec.name}</h5>
                                <p class="mb-1 text-muted small">${rec.title}</p>
                                <small class="text-muted fst-italic">${rec.relationship}</small>
                            </div>
                        </div>

                        <blockquote class="mb-3">
                            <p class="text-dark fst-italic lh-base">"${rec.text}"</p>
                        </blockquote>

                        <div class="d-flex justify-content-between align-items-center">
                            <small class="text-muted">
                                <i class="fas fa-calendar-alt me-1"></i>${rec.date}
                            </small>
                            <div class="text-warning">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(slide);
        });
    }

    // Contact form handling
    document.querySelector('.contact-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Create email subject and body
        const subject = `Contact from ${data.firstName} ${data.lastName}`;
        const body = `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;

        // Open default email client
        window.location.href = `mailto:jshubham01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Reset form
        this.reset();

        // Show success message
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 3000);
    });

    // Initialize everything
    fetchGitHubProjects();
    loadRecommendations();

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
