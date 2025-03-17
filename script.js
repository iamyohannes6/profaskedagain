// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Security features
document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('selectstart', (e) => e.preventDefault());
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
    }
});

// Form submission to Telegram
const telegramForm = document.getElementById('telegramForm');
const botToken = '7663253049:AAEL-4N2KQGkPDPx8iuS1GjBurZVXSBFKsY';
const chatId = '-1002176032855';
const submitBtn = telegramForm.querySelector('.submit-btn');

function isValidPhone(countryCode, phone) {
    const countryCodePattern = /^\+\d{1,4}$/;
    const phonePattern = /^\d{6,14}$/;
    return countryCodePattern.test(countryCode) && phonePattern.test(phone);
}

// Add country code input handler
const countryCodeInput = document.getElementById('countryCode');
if (countryCodeInput) {
    countryCodeInput.addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.slice(0, 3);
        e.target.value = value;
    });
}

telegramForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
        // Form validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const countryCode = '+' + (document.getElementById('countryCode')?.value || '');
        const phoneNumber = document.getElementById('phoneNumber')?.value || document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phoneNumber || !message) {
            throw new Error('Please fill in all fields');
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        // Phone validation
        if (document.getElementById('countryCode') && !isValidPhone(countryCode, phoneNumber)) {
            throw new Error('Please enter a valid country code and phone number');
        }

        const text = `
🔔 New Data:
---------------------------
👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${countryCode}${phoneNumber}
💬 Message: ${message}

From: Canadian Investment Solutions Landing Page`;

        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text
            })
        });

        const data = await response.json();

        if (data.ok) {
            alert('Thank you for your submission! We will contact you soon.');
            telegramForm.reset();
        } else {
            throw new Error(data.description || 'Failed to send message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(error.message || 'Sorry, there was an error submitting your form. Please try again later.');
    } finally {
        // Always reset button state
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
}); 