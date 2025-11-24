// ============================================
// JavaScript Knowledge & Application - IA#2
// ============================================

// 2c. JavaScript: Basic Interactivity / Logic
// Product data for cart functionality - IA#2 Variable declarations and data structures
const products = [
    { id: 1, name: "Premium Hoodie", price: 150, image: "../Assets/images/SW1.jpg", description: "Ultra-soft fleece hoodie with adjustable drawstrings and kangaroo pocket. Perfect for layering." },
    { id: 2, name: "Classic Crewneck", price: 140, image: "../Assets/images/SW2.jpg", description: "Timeless crewneck design in premium cotton blend. Ribbed cuffs and hem for perfect fit." },
    { id: 3, name: "Oversized Fit", price: 135, image: "../Assets/images/SW3.jpg", description: "Relaxed, oversized silhouette for maximum comfort. Drop shoulders and wide sleeves." },
    { id: 4, name: "Zip-Up Hoodie", price: 145, image: "../Assets/images/SW4.jpg", description: "Full-zip hoodie with dual front pockets. Brushed interior for extra warmth." },
    { id: 5, name: "Cropped Sweatshirt", price: 95, image: "../Assets/images/SW5.jpg", description: "Trendy cropped length with raw edge hem. Pairs perfectly with high-waist bottoms." },
    { id: 6, name: "Athleisure Pullover", price: 125, image: "../Assets/images/SW6.jpg", description: "Moisture-wicking fabric with athletic cut. Thumbholes at cuffs for added functionality." },
    { id: 7, name: "Vintage Wash Hoodie", price: 130, image: "../Assets/images/SW7.jpg", description: "Distressed vintage look with acid wash treatment. Each piece is uniquely patterned." },
    { id: 8, name: "Sherpa Lined Sweatshirt", price: 150, image: "../Assets/images/SW8.jpg", description: "Plush sherpa lining throughout for ultimate warmth. Heavyweight construction." },
    { id: 9, name: "Tie-Dye Crewneck", price: 110, image: "../Assets/images/SW9.jpg", description: "Hand-dyed spiral pattern on soft cotton. Each pattern is one-of-a-kind." },
    { id: 10, name: "Graphic Print Hoodie", price: 120, image: "../Assets/images/SW10.jpg", description: "Bold screen-printed graphic on back. Premium inks for long-lasting design." },
    { id: 11, name: "Thermal Knit Sweater", price: 115, image: "../Assets/images/SW11.jpg", description: "Waffle-knit thermal fabric for superior insulation. Lightweight yet incredibly warm." },
    { id: 12, name: "Quarter-Zip Pullover", price: 135, image: "../Assets/images/SW12.jpg", description: "Classic quarter-zip collar with stand-up neck. Perfect for smart-casual occasions." },
    { id: 13, name: "Sleeveless Hoodie", price: 100, image: "../Assets/images/SW13.jpg", description: "Gym-ready sleeveless design with hood. Side vents for unrestricted movement." },
    { id: 14, name: "Henley Sweatshirt", price: 105, image: "../Assets/images/SW14.jpg", description: "Three-button Henley placket with ribbed collar. Casual yet refined aesthetic." },
    { id: 15, name: "Hooded Cardigan", price: 140, image: "../Assets/images/SW15.jpg", description: "Open-front cardigan with attached hood. Draped silhouette for elegant layering." },
    { id: 16, name: "Pocket Front Sweatshirt", price: 125, image: "../Assets/images/SW16.jpg", description: "Oversized kangaroo pocket spans entire front. Perfect for lounging." },
    { id: 17, name: "Colorblock Hoodie", price: 130, image: "../Assets/images/SW17.jpg", description: "Bold two-tone colorblock design. Ribbed contrast panels for visual interest." }
];

// 2c. CART FUNCTIONALITY - IA#2 Array and object handling
let cart = JSON.parse(localStorage.getItem('chicaCart')) || [];

// 2a. DOM MANIPULATION - Load only home page preview
document.addEventListener('DOMContentLoaded', function() {
    // Update cart count from localStorage
    updateCartCount();
    
    // Load cart items if on cart page
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
    
    // Load checkout summary if on checkout page
    if (window.location.pathname.includes('checkout.html')) {
        displayCheckoutSummary();
    }
});

// 2b. EVENT HANDLING - Add to cart function
function addToCart(productId) {
    // 2c. ARITHMETIC CALCULATIONS
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    // 2a. DOM MANIPULATION - Update cart count
    localStorage.setItem('chicaCart', JSON.stringify(cart));
    updateCartCount();
    
    // 2b. EVENT HANDLING - Alert user
    alert(`${product.name} added to cart!`);
}

// 2a. DOM MANIPULATION - Update cart count display
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// 2a. DISPLAY CART ITEMS - DOM Manipulation with dynamic HTML
function displayCartItems() {
    const cartItems = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartSummary = document.getElementById('cart-summary');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItems.innerHTML = '';
    let subtotal = 0;
    
    // 2c. LOOP & CALCULATIONS
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>${item.description.substring(0, 50)}...</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
            <div>
                <p>$${itemTotal.toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // 2c. ARITHMETIC CALCULATIONS - Tax and Total
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// 2b. EVENT HANDLING - Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('chicaCart', JSON.stringify(cart));
            displayCartItems();
            updateCartCount();
        }
    }
}

// 2b. EVENT HANDLING - Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('chicaCart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

// 2b. EVENT HANDLING - Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        cart = [];
        localStorage.setItem('chicaCart', JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }
}

// 2c. FORM VALIDATION - Login form
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const emailError = document.getElementById('login-email-error');
    const passwordError = document.getElementById('login-password-error');
    
    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    
    let isValid = true;
    
    // 2c. FORM VALIDATION - Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // 2c. FORM VALIDATION - Password length
    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    
    if (isValid) {
        alert('Login successful! (This is a demo)');
        window.location.href = 'index.html';
    }
    
    return false;
}

// 2c. FORM VALIDATION - Registration form
function handleRegister(event) {
    event.preventDefault();
    
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const emailError = document.getElementById('reg-email-error');
    const passwordError = document.getElementById('reg-password-error');
    
    // Reset errors
    emailError.textContent = '';
    passwordError.textContent = '';
    
    let isValid = true;
    
    // 2c. EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    // 2c. PASSWORD VALIDATION
    if (password.length < 8) {
        passwordError.textContent = 'Password must be at least 8 characters';
        isValid = false;
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
        passwordError.textContent = 'Password must contain uppercase, lowercase, and number';
        isValid = false;
    }
    
    if (isValid) {
        alert('Registration successful! Please login.');
        toggleAuth();
    }
    
    return false;
    if (username.trim() === "") {
    usernameError.textContent = "Username is required";
    isValid = false;
}

}

// 2b. EVENT HANDLING - Toggle between login/register
function toggleAuth() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    }
}

// 2c. CHECKOUT FUNCTIONALITY
function displayCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    if (!checkoutItems) return;
    
    if (cart.length === 0) {
        checkoutItems.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }
    
    let subtotal = 0;
    checkoutItems.innerHTML = '';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        itemDiv.innerHTML = `
            <p>${item.name} x ${item.quantity}</p>
            <p>$${itemTotal.toFixed(2)}</p>
        `;
        checkoutItems.appendChild(itemDiv);
    });
    
    const tax = subtotal * 0.1;
    const total = subtotal + tax;
    
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

// 2b. EVENT HANDLING - Checkout form
function handleCheckout(event) {
    event.preventDefault(); 
    
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return false;
    }
    
    alert('Order placed successfully! Thank you for shopping with Chica Wear Sweatshirts.');
    cart = [];
    localStorage.setItem('chicaCart', JSON.stringify(cart));
    window.location.href = 'index.html';
    
    return false;
}

// 2b. EVENT HANDLING - Cancel checkout
function cancelCheckout() {
    if (confirm('Are you sure you want to cancel checkout?')) {
        window.location.href = 'cart.html';
    }
}