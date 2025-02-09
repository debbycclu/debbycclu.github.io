document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const buttonText = submitButton.querySelector('.button-text');
            const buttonLoading = submitButton.querySelector('.button-loading');
            
            buttonText.classList.add('hidden');
            buttonLoading.classList.remove('hidden');
            submitButton.disabled = true;

            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if (response.ok) {
                    alert('Message sent successfully! I will get back to you soon.');
                    contactForm.reset();
                } else {
                    throw new Error(data.error || 'Failed to send message');
                }
            } catch (error) {
                alert('Error sending message: ' + error.message);
            } finally {
                // Reset button state
                buttonText.classList.remove('hidden');
                buttonLoading.classList.add('hidden');
                submitButton.disabled = false;
            }
        });
    }

    // Projects Data
    const projects = [
        {
            title: "Health Monitoring App Testing",
            category: "software-development",
            categoryLabel: "#SoftwareDevelopment",
            description: "Enhanced health monitoring app with end-to-end data streaming between Apple Watch and backend systems.",
            image: "/images/projects/health-app.jpg",
            tools: ["XCode", "Kafka", "Python", "InfluxDB", "Django", "Postman", "Pilot Testing"],
            link: "/projects/health-monitoring-integration.html"
        },
        {
            title: "Insurance Process Automation",
            category: "product-management",
            categoryLabel: "#ProductManagement",
            description: "Streamlined internal workflows and optimized tools for cross-functional collaboration.",
            image: "/images/projects/insurance-automation.jpg",
            tools: ["Python", "Jira", "Phrase CMS", "Mermaid Diagrams", "API Integration"],
            link: "/projects/insurance-process-automation.html"
        },
        {
            title: "Network Infrastructure Management",
            category: "project-management",
            categoryLabel: "#ProjectManagement",
            description: "Led enterprise network solutions and event infrastructure projects, serving over 5,000 users.",
            image: "/images/projects/network-management.jpg",
            tools: ["Network Design", "Project Management", "B2B SaaS", "Salesforce", "Security"],
            link: "/projects/network-management.html"
        },
        {
            title: "Exhibition Management",
            category: "project-management",
            categoryLabel: "#ProjectManagement",
            description: "Led Japanese cultural exhibitions in Taiwan, managing IP licensing and visitor experience.",
            image: "/images/projects/exhibition-management.jpg",
            tools: ["Project Management", "Team Leadership", "Event Planning", "Excel", "Localization"],
            link: "/projects/exhibition-management.html"
        },
        {
            title: "Movie Trends Analytics",
            category: "data-analysis",
            categoryLabel: "#DataAnalysis",
            description: "Developed interactive dashboards for sales tracking, enabling data-driven decision making.",
            image: "/images/projects/sales-analytics.jpg",
            tools: ["Tableau", "SQL", "Java", "Hadoop", "Data Analysis", "Visualization"],
            link: "#",
            comingSoon: true
        },
        {
            title: "Personal Portfolio Website",
            category: "web-development",
            categoryLabel: "#WebDevelopment",
            description: "Modern, responsive portfolio website showcasing projects and professional experience.",
            image: "/images/projects/portfolio-website.jpg",
            tools: ["AI", "GCP", "Google Sheets API", "Version Control", "Responsive Design"],
            link: "#",
            comingSoon: true
        }
    ];

    // Function to create project card HTML
    function createProjectCard(project) {
        return `
            <div class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <span class="category-label">${project.categoryLabel}</span>
                    ${project.comingSoon ? 
                        `<img src="${project.image}" alt="${project.title}">` :
                        `<a href="${project.link}"><img src="${project.image}" alt="${project.title}"></a>`
                    }
                </div>
                <div class="project-info">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tools">
                        ${project.tools.map(tool => `<span class="tool-tag">${tool}</span>`).join('')}
                    </div>
                    ${project.comingSoon ? 
                        '<span class="project-coming-soon">Coming Soon</span>' : 
                        `<a href="${project.link}" class="project-link">Learn More</a>`
                    }
                </div>
            </div>
        `;
    }

    // Function to filter projects
    function filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'flex';
                // Reset animation
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'fadeInUp 0.6s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Function to initialize projects
    function initializeProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        // Render all projects
        projectsGrid.innerHTML = projects.map(project => createProjectCard(project)).join('');

        // Add event listeners to filter buttons
        const filterButtons = document.querySelectorAll('.filter-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                filterProjects(button.dataset.category);
            });
        });
    }

    // Initialize when DOM is loaded
    initializeProjects();
});
