document.addEventListener("DOMContentLoaded", function() {
    // Highlight the current page in the navigation menu
    const navMenu = document.getElementById('nav-menu');
    const links = navMenu.getElementsByTagName('a');
    const currentPage = window.location.pathname.split('/').pop();
    for (let link of links) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    }

    // Form validation and price calculation for the order form
    const menuPrices = {
        'samosa': 50,
        'pakora': 60,
        'butter-chicken': 250,
        'palak-paneer': 200,
        'chole': 180,
        'biryani': 220,
        'gulab-jamun': 80,
        'rasgulla': 90,
        'kulfi': 100,
        'jalebi': 70
    };

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        const menuSelect = document.getElementById('menu');
        const quantityInput = document.getElementById('quantity');
        const totalPriceInput = document.getElementById('total');

        function updateTotalPrice() {
            const selectedItem = menuSelect.value;
            const quantity = parseInt(quantityInput.value) || 1;
            const totalPrice = menuPrices[selectedItem] * quantity;
            totalPriceInput.value = `₹${totalPrice}`;
        }

        menuSelect.addEventListener('change', updateTotalPrice);
        quantityInput.addEventListener('input', updateTotalPrice);
        updateTotalPrice(); // Initialize total price

        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(orderForm);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            // Convert total price to number
            jsonData['total'] = parseFloat(totalPriceInput.value.replace('₹', ''));

            console.log('Submitting order:', jsonData); // Log data before submission

            fetch('http://localhost:3002/api/order', {  // Ensure this matches your server's port
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data); // Log response data
                if (data.success) {
                    alert('Order placed successfully!');
                    orderForm.reset();
                    updateTotalPrice();
                } else {
                    alert('Error placing order');
                    console.error('Order error:', data.error);
                }
            })
            .catch(error => {
                alert('Error placing order');
                console.error('Error:', error);
            });
        });
    }

    // FAQ section interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isVisible = answer.style.display === 'block';
            faqItems.forEach(i => i.querySelector('.faq-answer').style.display = 'none');
            answer.style.display = isVisible ? 'none' : 'block';
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            fetch('http://localhost:3002/api/contact', {  // Ensure this matches your server's port
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                alert('Message sent successfully!');
                contactForm.reset();
            })
            .catch(error => {
                alert('Error sending message');
                console.error('Error:', error);
            });
        });
    }
});
