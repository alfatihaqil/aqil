
class PortfolioSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 2;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
        this.setupEventListeners();
        this.startAutoSlide();
    }
    
    init() {
        // Initialize first slide
        this.updateSlides();
        this.animateSkillBars();
    }
    
    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Arrow navigation
        this.prevBtn.addEventListener('click', () => {
            this.previousSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        });
        
        // Expertise items hover effects
        const expertiseItems = document.querySelectorAll('.expertise-item');
        expertiseItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Skill bars hover effects
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const skillBar = item.querySelector('.skill-progress');
                skillBar.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
            });
            
            item.addEventListener('mouseleave', () => {
                const skillBar = item.querySelector('.skill-progress');
                skillBar.style.background = 'linear-gradient(90deg, #3498db, #2980b9)';
            });
        });
    }
    
    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                this.previousSlide();
            } else {
                this.nextSlide();
            }
        }
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlides();
        this.resetAutoSlide();
        
        // Animate skill bars when entering skills slide
        if (slideIndex === 1) {
            setTimeout(() => {
                this.animateSkillBars();
            }, 300);
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
        this.resetAutoSlide();
        
        if (this.currentSlide === 1) {
            setTimeout(() => {
                this.animateSkillBars();
            }, 300);
        }
    }
    
    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
        this.resetAutoSlide();
        
        if (this.currentSlide === 1) {
            setTimeout(() => {
                this.animateSkillBars();
            }, 300);
        }
    }
    
    updateSlides() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index < this.currentSlide) {
                slide.classList.add('prev');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Add slide entrance animation
        const activeSlide = this.slides[this.currentSlide];
        activeSlide.style.animation = 'slideIn 0.6s ease-out';
        
        setTimeout(() => {
            activeSlide.style.animation = '';
        }, 600);
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 300 + 200);
        });
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 10000); // Change slide every 10 seconds
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes glow {
        0% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.3); }
        50% { box-shadow: 0 0 20px rgba(52, 152, 219, 0.6); }
        100% { box-shadow: 0 0 5px rgba(52, 152, 219, 0.3); }
    }
    
    .profile-card > * {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .profile-card > *:nth-child(1) { animation-delay: 0.1s; }
    .profile-card > *:nth-child(2) { animation-delay: 0.2s; }
    .profile-card > *:nth-child(3) { animation-delay: 0.3s; }
    .profile-card > *:nth-child(4) { animation-delay: 0.4s; }
    .profile-card > *:nth-child(5) { animation-delay: 0.5s; }
    .profile-card > *:nth-child(6) { animation-delay: 0.6s; }
    
    .expertise-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .expertise-item:hover {
        animation: glow 2s infinite;
    }
    
    .skill-item {
        transition: transform 0.3s ease;
    }
    
    .skill-item:hover {
        transform: translateX(10px);
    }
    
    .highlight-item {
        transition: all 0.3s ease;
    }
    
    .highlight-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
    }
`;
document.head.appendChild(style);

// Initialize the portfolio slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSlider();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add console message
    console.log('🎉 Portofolio M.Akil Al Fatih berhasil dimuat!');
    console.log('💻 Spesialis Perakitan Komputer & Web Developer');
    console.log('📱 Gunakan keyboard (←/→), mouse, atau touch untuk navigasi');
});

// Add interactive effects
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 15) {
        console.log('🔧 Akil memang ahli dalam merakit komputer!');
        console.log('💡 Skill perakitan komputer: 90% - Sangat Impressive!');
        
        // Add special effect for hardware expertise
        const expertiseItems = document.querySelectorAll('.expertise-item');
        expertiseItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.background = 'linear-gradient(135deg, #3498db, #e74c3c)';
                item.style.color = 'white';
                item.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    item.style.background = 'rgba(52, 152, 219, 0.05)';
                    item.style.color = 'inherit';
                    item.style.transform = 'scale(1)';
                }, 2000);
            }, index * 200);
        });
        
        clickCount = 0;
    }
});

// Special interaction for skill bars
document.addEventListener('DOMContentLoaded', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        bar.addEventListener('click', () => {
            const width = bar.style.width;
            bar.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
            bar.style.height = '12px';
            
            setTimeout(() => {
                bar.style.background = 'linear-gradient(90deg, #3498db, #2980b9)';
                bar.style.height = '10px';
            }, 1000);
        });
    });
});
