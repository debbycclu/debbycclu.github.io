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

    // Load projects from API
    const loadProjects = async () => {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            
            const projectsGrid = document.querySelector('.projects-grid');
            if (projectsGrid && data.projects) {
                projectsGrid.innerHTML = data.projects.map(project => `
                    <div class="project-card">
                        <img src="${project.image}" alt="${project.title}">
                        <h3>${project.title}</h3>
                        <p>${project.description}</p>
                        <div class="project-links">
                            <a href="${project.github}" target="_blank">GitHub</a>
                            <a href="${project.demo}" target="_blank">Live Demo</a>
                        </div>
                    </div>
                `).join('');
            }
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    loadProjects();
});
