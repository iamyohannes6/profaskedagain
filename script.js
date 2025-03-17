// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Form submission to Telegram
const telegramForm = document.getElementById('telegramForm');
const botToken = '7663253049:AAEL-4N2KQGkPDPx8iuS1GjBurZVXSBFKsY';
const chatId = '-4696086738';

telegramForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !phone || !message) {
        alert('Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }

    const text = `
Retriver Data:
---------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
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
        alert('Sorry, there was an error submitting your form. Please try again later.');
    }
});

// Add loading state to submit button
const submitBtn = telegramForm.querySelector('.submit-btn');
telegramForm.addEventListener('submit', () => {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
});

// Reset button state after submission
function resetSubmitButton() {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
} 