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
            title: "Health Monitoring Integration",
            category: "software-development",
            categoryLabel: "#SoftwareDevelopment",
            description: "Led an end-to-end pilot test for a new health monitoring app, collecting data via Apple Watch and integrating data management on iPhone and web platforms with an ML algorithm to identify abnormal heart rate patterns.",
            image: "/images/projects/health-testing.jpg",
            tools: ["Python", "Kafka", "Machine Learning", "iOS Development"],
            link: "https://debbylu.com/projects/health-monitoring-integration"
        },
        {
            title: "Insurance Process Automation",
            category: "product-management",
            categoryLabel: "#ProductManagement",
            description: "Collaborated with engineering and product teams to design and implement an automated customer reinstatement flow, streamlining process efficiency and reducing human error.",
            image: "/images/projects/insurance-automation.JPG",
            tools: ["Product Management", "Process Automation", "User Research"],
            link: "https://debbylu.com/projects/insurance-process-automation"
        },
        {
            title: "Network Management System",
            category: "project-management",
            categoryLabel: "#ProjectManagement",
            description: "Oversaw office networks and device management for 30 startups with over 5,000 devices as an IT Managed Service Provider, increasing the customer base by 50% and achieving a 95% customer retention rate.",
            image: "/images/projects/network-management.jpg",
            tools: ["Network Management", "IT Operations", "Customer Success"],
            link: "https://debbylu.com/projects/network-management"
        },
        {
            title: "Exhibition Management Platform",
            category: "project-management",
            categoryLabel: "#ProjectManagement",
            description: "Directed a core team of four in localizing and launching Japanese exhibits in Taiwan, securing the intellectual property (IP) license and venue authorization, and generating $1M in net profit within three months.",
            image: "/images/projects/exhibition-management.jpg",
            tools: ["Project Management", "Event Planning", "Business Development"],
            link: "https://debbylu.com/projects/exhibition-management"
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
