// Open/Close Sign-In Modal
const signinModal = document.querySelector('.signin-modal');
const signinBtn = document.querySelector('.nav-signin');
const closeModalBtn = document.querySelector('.close-modal');

if (signinBtn && closeModalBtn) {
    signinBtn.addEventListener('click', () => {
        signinModal.style.display = 'flex';
    });

    closeModalBtn.addEventListener('click', () => {
        signinModal.style.display = 'none';
    });

    signinModal.addEventListener('click', (event) => {
        if (event.target === signinModal) {
            signinModal.style.display = 'none';
        }
    });
}

// Sign-In Form Submission
const signinForm = document.querySelector('.signin-container');
if (signinForm) {
    signinForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.querySelector('#username').value;
        const password = document.querySelector('#password').value;

        if (username === 'admin' && password === '12345') {
            alert('Login Successful!');
            signinModal.style.display = 'none';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });
}

// Fetch and Display Products
async function loadProducts() {
    const shopSection = document.querySelector('.shop-section');

    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();

        shopSection.innerHTML = '';

        data.products.forEach((product) => {
            const productBox = document.createElement('div');
            productBox.classList.add('box');

            productBox.innerHTML = `
                <div class="box-content">
                    <h2>${product.title}</h2>
                    <div class="box-img" style="background-image: url('${product.images[0]}');"></div>
                    <p class="product-price">Price: $${product.price}</p>
                    <button class="view-details-btn" data-id="${product.id}">View Details</button>
                    <button class="add-to-cart" 
                        data-product-id="${product.id}" 
                        data-product-name="${product.title}" 
                        data-product-price="${product.price}">
                        Add to Cart
                    </button>
                </div>
            `;
            shopSection.appendChild(productBox);
        });

        attachEventListeners();
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

// Attach Event Listeners
function attachEventListeners() {
    // View Details Button
    document.querySelectorAll('.view-details-btn').forEach((button) => {
        button.addEventListener('click', async (event) => {
            const productId = event.target.getAttribute('data-id');
            await fetchProductDetails(productId);
        });
    });

    // Add to Cart Button
    document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product-id');
            const productName = button.getAttribute('data-product-name');
            const productPrice = button.getAttribute('data-product-price');

            addToCart(productId, productName, productPrice);
        });
    });
}

// Fetch Product Details
async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        const product = await response.json();

        const productDetailsModal = document.createElement('div');
        productDetailsModal.classList.add('product-details-modal');
        productDetailsModal.innerHTML = `
            <div class="product-details-content">
                <h2>${product.title}</h2>
                <img src="${product.images[0]}" alt="${product.title}">
                <p><strong>Price:</strong> $${product.price}</p>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <button class="close-modal-btn">Close</button>
            </div>
        `;

        document.body.appendChild(productDetailsModal);

        productDetailsModal.querySelector('.close-modal-btn').addEventListener('click', () => {
            productDetailsModal.remove();
        });
    } catch (error) {
        console.error('Failed to fetch product details:', error);
    }
}

// Add to Cart Functionality
function addToCart(productId, productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
    displayCart();
}














// 
// 
// 
// 

// Display Cart
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartSection = document.querySelector('.cart-section');
    cartSection.innerHTML = cart.map(
        (item) => `<p>${item.name} - $${item.price} x ${item.quantity}</p>`
    ).join('') || 'Cart is empty!';
}

// Run on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();

    const fadeTitle = document.getElementsByClassName('fadeTitle');
    Array.from(fadeTitle).forEach((el) => {
        el.style.animationPlayState = 'running';
    });
});

// Function to open/close the cart modal
function toggleCartModal(show) {
    const cartModal = document.getElementById('cart-modal');
    cartModal.style.display = show ? 'flex' : 'none';
}

// Event listener for "View Cart" button
document.getElementById('cart-btn').addEventListener('click', () => {
    displayCart(); // Refresh cart items before opening
    toggleCartModal(true);
});

// Event listener for "Close Cart" button
document.getElementById('close-cart-btn').addEventListener('click', () => {
    toggleCartModal(false);
});

// Update displayCart function to show cart items in the modal
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');

    if (cart.length > 0) {
        cartItemsContainer.innerHTML = cart
            .map(
                (item) => `
                <div class="cart-item">
                    <p>${item.name} - $${item.price} x ${item.quantity}</p>
                </div>
            `
            )
            .join('');
    } else {
        cartItemsContainer.innerHTML = '<p>Cart is empty!</p>';
    }
}

// Example: Add "Add to Cart" functionality
function addToCart(productId, productName, productPrice) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, name: productName, price: parseFloat(productPrice), quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
    displayCart(); // Update the cart modal content
}

// Attach this function to "Add to Cart" buttons dynamically loaded in `loadProducts`
// This part of the existing code remains unchanged
