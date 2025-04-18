// Cleaned help-center.js

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const icon = button.querySelector('.faq-toggle-icon');
        answer.classList.toggle('open');
        icon.textContent = answer.classList.contains('open') ? '−' : '+';
    });
});

const searchInput = document.getElementById('search-bar');
const faqItems = document.querySelectorAll('.faq-item');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        item.style.display = (question.includes(query) || answer.includes(query)) ? 'block' : 'none';
    });
});
