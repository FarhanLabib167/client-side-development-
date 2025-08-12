const productsData = [
    { id: 1, category: 'Skincare', name: 'Hydrating Face Serum', description: 'A lightweight serum for deep hydration and a dewy finish.', price: 24.99, image: 'image/img1.webp' },
    { id: 2, category: 'Skincare', name: 'Vitamin C Brightening Mask', description: 'A refreshing mask to brighten and even out skin tone.', price: 18.50, image: 'image/img2.webp' },
    { id: 3, category: 'Skincare', name: 'Daily Hydration Moisturizer', description: 'Lightweight, everyday moisturizer that provides lasting hydration.', price: 22.50, image: 'image/img3.webp' },
    { id: 4, category: 'Skincare', name: 'Gentle Foaming Cleanser', description: 'A soft, foaming cleanser that removes impurities without stripping moisture.', price: 16.99, image: 'image/img4.webp' },
    { id: 5, category: 'Skincare', name: 'Soothing Facial Toner', description: 'Balances skin pH and preps your skin for the next steps in your routine.', price: 19.00, image: 'image/img5.webp' },
    { id: 6, category: 'Makeup', name: 'Natural Glow Foundation', description: 'Lightweight foundation for a natural, luminous look.', price: 29.00, image: 'image/img6.webp' },
    { id: 7, category: 'Makeup', name: 'Lip & Cheek Tint', description: 'A multi-use tint for a subtle flush of color on lips and cheeks.', price: 15.99, image: 'image/img7.webp' },
    { id: 8, category: 'Makeup', name: 'Desert Sunset Eyeshadow Palette', description: 'A collection of warm, earthy tones inspired by a desert sunset.', price: 35.00, image: 'image/img8.jpeg' },
    { id: 9, category: 'Makeup', name: 'Volumizing Mascara', description: 'Lifts and separates lashes for a dramatic, voluminous effect.', price: 18.00, image: 'image/img9.webp' },
    { id: 10, category: 'Bodycare', name: 'Rose & Sandalwood Body Lotion', description: 'Deeply nourishing lotion with a delicate, calming fragrance.', price: 12.00, image: 'image/img10.webp' },
    { id: 11, category: 'Bodycare', name: 'Exfoliating Sugar Scrub', description: 'Gently polishes away dead skin cells to reveal a smooth, radiant glow.', price: 17.00, image: 'image/img11.webp' },
    { id: 12, category: 'Bodycare', name: 'Argan Oil Repair Hair Mask', description: 'A deep conditioning treatment to repair and restore dry, damaged hair.', price: 19.99, image: 'image/img12.webp' },
    { id: 13, category: 'Tools', name: 'Silicone Facial Cleansing Brush', description: 'Gently removes impurities and exfoliates for a deep clean.', price: 45.00, image: 'image/img13.jpeg' },
];
        
const offersData = [
    { name: 'Skincare Starter Kit', description: 'Includes our Hydrating Serum, Brightening Mask, and a free facial roller.', originalPrice: 50.00, offerPrice: 40.00, image: 'image/skincarekit.webp' },
    { name: 'Glow Up Bundle', description: 'Foundation, Lip Tint, and a compact mirror, all in a beautiful pouch.', originalPrice: 45.00, offerPrice: 35.00, image: 'image/glow up.webp' },
];
        
let cart = [];

function saveCart() {
    localStorage.setItem('glowAndGoCart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('glowAndGoCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    $('#cart-count').text(totalItems);
}

function renderCart() {
    const cartContainer = $('#cart-items-container');
    const subtotalElement = $('#cart-subtotal');
    cartContainer.empty();
    let subtotal = 0;

    if (cart.length === 0) {
        cartContainer.html('<p class="text-center text-gray-500">Your cart is empty.</p>');
    } else {
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            cartContainer.append(`
                <div class="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg shadow-sm">
                    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-grow">
                        <h4 class="font-semibold">${item.name}</h4>
                        <p class="text-sm text-gray-500">£${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <span class="font-bold">£${itemTotal.toFixed(2)}</span>
                </div>
            `);
        });
    }
    subtotalElement.text(`£${subtotal.toFixed(2)}`);
    updateCartCount();
}

function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        renderCart();
        $('#cart-modal').removeClass('hidden').addClass('flex');
        $('.cart-modal').removeClass('translate-x-full');
    }
}

$(document).ready(function() {
    loadCart();
    updateCartCount();
    
    // Hamburger menu toggle
    $('#hamburger-button').on('click', function() {
        $(this).toggleClass('active');
        $('#mobile-menu').toggleClass('hidden');
    });
    $('#mobile-menu a').on('click', function() {
        $('#mobile-menu').addClass('hidden');
        $('#hamburger-button').removeClass('active');
    });

    // Populate products grid
    const productGridHtml = productsData.map(product => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-bold mb-2">${product.name}</h3>
                <p class="text-gray-600 text-sm mb-4">${product.description}</p>
                <div class="flex justify-between items-center">
                    <span class="text-2xl font-bold text-accent">£${product.price.toFixed(2)}</span>
                    <button data-product-id="${product.id}" class="add-to-cart-btn bg-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-violet-700 transition duration-300 text-sm">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
    $('#product-grid').html(productGridHtml);

    // Populate offers grid
    const offersGridHtml = offersData.map(offer => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col lg:flex-row items-center transform transition duration-300 hover:scale-105">
            <img src="${offer.image}" alt="${offer.name}" class="w-full lg:w-1/2 h-64 lg:h-auto object-cover">
            <div class="p-6 lg:w-1/2">
                <h3 class="text-2xl font-bold mb-2">${offer.name}</h3>
                <p class="text-gray-600 mb-4">${offer.description}</p>
                <div class="flex items-center space-x-4 mb-4">
                    <span class="text-3xl font-bold text-accent">£${offer.offerPrice.toFixed(2)}</span>
                    <span class="text-gray-500 line-through">£${offer.originalPrice.toFixed(2)}</span>
                </div>
                <a href="#" class="bg-accent text-white font-semibold py-2 px-6 rounded-lg hover:bg-violet-700 transition duration-300">Grab The Deal</a>
            </div>
        </div>
    `).join('');
    $('#offers-grid').html(offersGridHtml);
    
    // Add to cart button click handler
    $('#product-grid').on('click', '.add-to-cart-btn', function() {
        const productId = parseInt($(this).data('product-id'));
        addToCart(productId);
    });

    // Cart modal handlers
    $('#cart-button').on('click', function() {
        renderCart();
        $('#cart-modal').removeClass('hidden').addClass('flex');
        $('.cart-modal').removeClass('translate-x-full');
    });

    $('#close-cart-modal, #cart-modal').on('click', function(e) {
        if ($(e.target).is('#close-cart-modal') || $(e.target).is('#cart-modal')) {
            $('.cart-modal').addClass('translate-x-full');
            setTimeout(() => {
                $('#cart-modal').addClass('hidden').removeClass('flex');
            }, 300);
        }
    });

    // Contact form validation
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        let errors = [];
        const form = $(this);
        
        form.find('input, textarea').removeClass('border-red-500');
        form.find('span.text-red-500').text('');

        const nameInput = $('#name');
        if (nameInput.val().trim() === '') {
            nameInput.addClass('border-red-500');
            $('#name-error').text('Name is required.');
            errors.push('Name is required.');
        }

        const emailInput = $('#email');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.val())) {
            emailInput.addClass('border-red-500');
            $('#email-error').text('Please enter a valid email address.');
            errors.push('Please enter a valid email address.');
        }

        const messageInput = $('#message');
        if (messageInput.val().trim() === '') {
            messageInput.addClass('border-red-500');
            $('#message-error').text('Message is required.');
            errors.push('Message is required.');
        }

        if (errors.length === 0) {
            alert('Thank you for your message!');
            form[0].reset();
        } else {
            alert('Please fill in the following details:\n' + errors.join('\n'));
        }
    });

    // Intersection Observer for active navigation links and fade-in animation
    const sections = $('main section');
    const navLinks = $('.nav-link');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                navLinks.removeClass('active');
                $(`a[href="#${targetId}"]`).addClass('active');
                $(entry.target).find('.animate-fadeIn').css('opacity', 1).css('transform', 'translateY(0)');
            }
        });
    }, observerOptions);

    sections.each(function() {
        observer.observe(this);
        $(this).find('.animate-fadeIn').css('opacity', 0);
    });
    
    // Mobile menu link click
    $('#mobile-menu a').on('click', function() {
        $('#mobile-menu').addClass('hidden');
        $('#hamburger-button').removeClass('active');
    });
});