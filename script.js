// Saira Portfolio JavaScript

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('nav');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on links
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('nav-active');
    } else {
        navbar.classList.remove('nav-active');
    }
    
    // Update scroll progress
    updateScrollProgress();
    
    // Update active navigation link
    updateActiveNavLink();
});

// Scroll Progress Indicator
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Create or update scroll indicator
    let scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) {
        scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        document.body.appendChild(scrollIndicator);
    }
    scrollIndicator.style.width = scrolled + '%';
}

// Update Active Navigation Link
function updateActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-orange-500');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('text-orange-500');
        }
    });
}

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill progress bars when in view
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress div');
    
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const width = bar.style.width;
            bar.style.width = '0%';
            bar.classList.add('animated');
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 2s ease-in-out';
            }, 200);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
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
function initAnimations() {
    const animatedElements = document.querySelectorAll('.grid > div, .text-center, .bg-gray-800, .bg-gray-900');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Typing effect for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message! I will get back to you soon.');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Newsletter subscription
function handleNewsletterForm() {
    const newsletterForm = document.querySelector('footer .flex');
    if (newsletterForm) {
        const button = newsletterForm.querySelector('button');
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const email = input.value;
            
            if (email && validateEmail(email)) {
                // Show success message
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.classList.add('bg-green-500');
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.classList.remove('bg-green-500');
                    input.value = '';
                }, 2000);
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Testimonial slider (if needed)
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    if (testimonials.length > 3) {
        // Hide testimonials beyond the first 3
        testimonials.forEach((testimonial, index) => {
            if (index >= 3) {
                testimonial.style.display = 'none';
            }
        });
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(() => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            testimonials[currentTestimonial].style.display = 'block';
        }, 5000);
    }
}

// Parallax effect for background elements
function handleParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Team member selection handler
function handleTeamMemberSelection() {
    const teamSelect = document.getElementById('team-member');
    const memberInfo = document.getElementById('member-info');
    const memberDetails = document.getElementById('member-details');
    
    if (teamSelect) {
        teamSelect.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            
            if (selectedValue && teamMembers[selectedValue]) {
                const member = teamMembers[selectedValue];
                memberDetails.innerHTML = `
                    <div class="grid md:grid-cols-2 gap-4">
                        <div>
                            <p class="mb-2"><span class="text-white font-semibold">Name:</span> ${member.name}</p>
                            <p class="mb-2"><span class="text-white font-semibold">Role:</span> ${member.role}</p>
                        </div>
                        <div>
                            <p class="mb-2"><span class="text-white font-semibold">Skills:</span> ${member.skills}</p>
                            <p class="mb-2"><span class="text-white font-semibold">Experience:</span> ${member.experience}</p>
                        </div>
                    </div>
                    <p class="mt-4 text-sm leading-relaxed">${member.description}</p>
                `;
                memberInfo.classList.remove('hidden');
                
                // Add fade-in animation
                memberInfo.style.opacity = '0';
                memberInfo.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    memberInfo.style.opacity = '1';
                    memberInfo.style.transform = 'translateY(0)';
                }, 100);
            } else {
                memberInfo.classList.add('hidden');
            }
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAnimations();
    handleContactForm();
    handleNewsletterForm();
    handleTeamMemberSelection(); // Add team member handler
    initTestimonialSlider();
    handleParallax();
    initLazyLoading();
    
    // Add scroll event for skill bars animation
    window.addEventListener('scroll', animateSkillBars);
    
    // Add loading class to body and remove after page load
    document.body.classList.add('loading');
    window.addEventListener('load', () => {
        document.body.classList.remove('loading');
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Add some interactive features
document.addEventListener('mousemove', (e) => {
    // Add subtle mouse follow effect to buttons
    const buttons = document.querySelectorAll('.btn-primary');
    buttons.forEach(button => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            button.style.setProperty('--mouse-x', x + 'px');
            button.style.setProperty('--mouse-y', y + 'px');
        }
    });
});

// Console message for developers
console.log(`
🎨 Saira Portfolio Website
👨‍💻 Built with HTML, CSS, JavaScript & Tailwind CSS
🚀 Features: Responsive Design, Smooth Animations, Interactive Elements
📱 Mobile-friendly and Accessibility-focused
`);

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page loaded in ${pageLoadTime}ms`);
        }, 0);
    });
}