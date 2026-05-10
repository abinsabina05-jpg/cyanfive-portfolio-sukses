// ========================================
// KELOMPOK SUKSES - SECURE JAVASCRIPT
// ========================================

// Security: Sanitize HTML to prevent XSS
function sanitizeHTML(str) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, m => map[m]);
}

// Navbar scroll effect
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling untuk navigation links
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
});

// Share Website Function - AMAN
function shareWebsite() {
    const url = window.location.href;
    const title = document.title;
    
    if (navigator.share) {
        // Native Share API (modern browsers)
        navigator.share({
            title: title,
            text: 'Cek portfolio Kelompok Sukses - @cyanfive.acaja',
            url: url
        }).catch(err => console.log('Share dibatalkan:', err));
    } else {
        // Fallback: Copy to clipboard
        copyToClipboard(url);
        showNotification('Link berhasil disalin ke clipboard!', 'success');
    }
}

// Copy to Clipboard dengan sanitasi
function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(err => {
            console.error('Gagal menyalin:', err);
            showNotification('Gagal menyalin link', 'error');
        });
    } else {
        // Fallback untuk browser lama
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Link disalin (fallback)');
        } catch (err) {
            console.error('Gagal menyalin (fallback):', err);
        }
        document.body.removeChild(textarea);
    }
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = sanitizeHTML(message);
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 99999;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Keyboard accessibility untuk share button
document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.querySelector('.share-fixed');
    if (shareBtn) {
        shareBtn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                shareWebsite();
            }
        });
    }
});

// Performance: Lazy loading untuk images (jika ada)
if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.removeAttribute('data-src');
                observer.unobserve(entry.target);
            }
        });
    });
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

console.log('🔒 Kelompok Sukses - Security Loaded');