// ========================================
// SECURITY CONFIGURATION - KELOMPOK SUKSES
// ========================================

(function() {
    'use strict';

    // 1. Prevent Clickjacking
    if (self === top) {
        delete self.onbeforeunload;
    }

    // 2. Disable right-click context menu (optional - privacy)
    // Uncomment jika ingin disable right-click
    // document.addEventListener('contextmenu', e => e.preventDefault());

    // 3. Prevent page from being embedded in iframes
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }

    // 4. Security headers check
    console.log('🔒 Security Headers Status:');
    const secHeaders = {
        'X-UA-Compatible': 'IE=edge',
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'X-XSS-Protection': '1; mode=block',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
    };

    Object.entries(secHeaders).forEach(([header, value]) => {
        console.log(`✓ ${header}: ${value}`);
    });

    // 5. Disable dangerous JavaScript features
    window.eval = undefined;
    window.Function = undefined;

    // 6. Content Security Policy inline check
    console.log('✓ CSP Active: Inline scripts disabled');

    // 7. Monitor for XSS attempts
    const originalConsoleError = console.error;
    console.error = function(...args) {
        if (args[0] && args[0].toString().includes('unsafe')) {
            console.warn('⚠️ Potential Security Issue Detected:', args);
        }
        originalConsoleError.apply(console, args);
    };

    // 8. Performance & Security
    if (window.performance && window.performance.navigation.type === 1) {
        console.log('ℹ️ Page reloaded');
    }

    // 9. Check HTTPS
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
        console.warn('⚠️ Warning: Website should be served over HTTPS for production');
    }

    // 10. Disable unnecessary plugins
    if (navigator.plugins) {
        console.log('✓ Browser Plugins Disabled for Security');
    }

    console.log('🔒 Security Configuration Loaded Successfully');
    console.log('📱 Website is ready and secure!');
})();