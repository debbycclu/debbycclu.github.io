class ImageModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalCaption = document.getElementById('modalTitle');
        this.closeButtons = document.querySelectorAll('[data-close-modal]');
        
        this.bindEvents();
        this.setupImageTriggers();
    }

    bindEvents() {
        // Close modal when clicking close button or overlay
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.closeModal());
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.classList.contains('active')) {
                this.closeModal();
            }
        });

        // Trap focus within modal when open
        this.modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusableElements = this.modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    setupImageTriggers() {
        // Add click handlers to all images that should trigger the modal
        const projectImages = document.querySelectorAll('[data-modal-image], .project-hero-image img, .image-grid img, .content-with-image img, .image-gallery img, .marketing-showcase img');
        
        projectImages.forEach(img => {
            // Add data attribute and aria label
            img.setAttribute('data-modal-image', '');
            img.setAttribute('aria-label', `${img.alt}. Click to enlarge`);
            img.setAttribute('role', 'button');
            img.setAttribute('tabindex', '0');

            // Add click handler
            img.addEventListener('click', () => this.openModal(img));

            // Add keyboard handler
            img.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openModal(img);
                }
            });
        });
    }

    openModal(imgElement) {
        // Store the element that had focus before opening modal
        this.previouslyFocused = document.activeElement;

        // Update modal content
        this.modalImage.src = imgElement.src;
        this.modalImage.alt = imgElement.alt;
        this.modalCaption.textContent = imgElement.alt;

        // Show modal
        this.modal.classList.add('active');
        
        // Set focus to close button
        const closeButton = this.modal.querySelector('.modal-close');
        setTimeout(() => closeButton.focus(), 100);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Announce to screen readers
        this.announceToScreenReader(`Image modal opened: ${imgElement.alt}`);
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = '';

        // Return focus to the previously focused element
        if (this.previouslyFocused) {
            this.previouslyFocused.focus();
        }

        // Announce to screen readers
        this.announceToScreenReader('Image modal closed');
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('class', 'sr-only');
        announcement.textContent = message;
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageModal();
});
