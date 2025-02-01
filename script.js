// Particle animation
class ParticleAnimation {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.numberOfParticles = 100;

        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
    }

    init() {
        this.resize();
        this.createParticles();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < this.numberOfParticles; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2,
                dx: (Math.random() - 0.5) * 2,
                dy: (Math.random() - 0.5) * 2
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();

            // Update position
            particle.x += particle.dx;
            particle.y += particle.dy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.dx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.dy *= -1;

            // Draw connections
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 * (1 - distance/100)})`;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });
    }

    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle animation
new ParticleAnimation();

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav ul');

menuBtn?.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    nav.classList.toggle('active');
});

// Scroll reveal
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));

// Project data
const projects = [
    {
        title: 'EyeQ',
        description: 'Revolutionary eye-tracking solution for educational assessment',
        image: 'project1.jpg',
        technologies: ['Python', 'TensorFlow', 'OpenCV', 'React Native']
    },
    {
        title: 'Data Processing Suite',
        description: 'Automated financial data processing and analysis platform',
        image: 'project2.jpg',
        technologies: ['Python', 'PyQt5', 'Pandas']
    }
];

// Populate projects
const projectsGrid = document.querySelector('.projects-grid');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card parallax-card reveal-text';
    projectCard.innerHTML = `
        <img src="images/${project.image}" alt="${project.title}" class="project-image">
        <div class="project-content">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `
                    <span class="tech-tag">${tech}</span>
                `).join('')}
            </div>
        </div>
    `;
    projectsGrid.appendChild(projectCard);
});

// 3D card effect
document.querySelectorAll('.parallax-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Form handling
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    contactForm.reset();
});