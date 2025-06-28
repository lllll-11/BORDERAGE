document.addEventListener('DOMContentLoaded', function() {
    // ------------------------------------------
    // 1. Navbar y Menú Móvil
    // ------------------------------------------
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    const navLinks = document.querySelectorAll('.mobile-nav-link, .nav-link'); // Select all nav links

    if (burgerMenu && mobileMenuOverlay && closeMobileMenu) {
        burgerMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        });

        closeMobileMenu.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('open');
            document.body.style.overflow = ''; // Restore scrolling
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenuOverlay.classList.contains('open')) {
                    mobileMenuOverlay.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // ------------------------------------------
    // 2. Hero Carousel (Simple)
    // ------------------------------------------
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    function showNextHeroImage() {
        if (heroImages.length === 0) return;

        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }

    if (heroImages.length > 1) { // Only start carousel if there's more than one image
        heroImages[0].classList.add('active'); // Set first image active on load
        setInterval(showNextHeroImage, 5000); // Change image every 5 seconds
    } else if (heroImages.length === 1) {
        heroImages[0].classList.add('active'); // If only one, just show it
    }


    // ------------------------------------------
    // 3. Funcionalidad del Carrito de Compras
    //    (Usando localStorage para persistencia básica)
    // ------------------------------------------

    const cartCountSpan = document.querySelector('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('borderageCart')) || [];

    function updateCartCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartCountSpan) {
            cartCountSpan.textContent = totalItems;
        }
    }

    function saveCart() {
        localStorage.setItem('borderageCart', JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(product) {
        const existingItem = cart.find(item => item.id === product.id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        saveCart();
        alert(`${product.name} ha sido añadido al carrito.`);
    }

    // Add event listeners to "Añadir al Carrito" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productCard = event.target.closest('.single-product-card');
            if (productCard) {
                const product = {
                    id: productCard.dataset.productId,
                    name: productCard.dataset.name,
                    price: parseFloat(productCard.dataset.price),
                    image: productCard.dataset.image
                };
                addToCart(product);
            }
        });
    });

    // Initialize cart count on page load
    updateCartCount();

    // ------------------------------------------
    // 4. Funcionalidad de la Página de Producto Detallada (product.html)
    //    Esto asume que tendrás un archivo product.html separado.
    //    Este JS solo maneja la lógica para esa página.
    // ------------------------------------------
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        // This is where you would fetch product data from a database/API
        // For now, we'll use a dummy data structure
        const allProducts = [
            { id: '1', name: 'Playera Oversize Blanca', price: 699.00, image: 'WhatsApp Image 2025-06-27 at 1.42.52 PM (1).jpeg', description: 'Nuestra playera Gymrat oversize está diseñada para el máximo rendimiento y estilo. Confeccionada con algodón transpirable, ofrece una libertad de movimiento inigualable. Perfecta para tus entrenamientos más intensos o para un look casual post-gym. Disponible en S, M,' },
            { id: '2', name: 'Playera Oversize negra', price: 699.00, image: 'WhatsApp Image 2025-06-27 at 1.42.53 PM (1).jpeg', description: 'Esta playera negra oversize es ideal para cualquier actividad deportiva. Su tejido ligero y suave proporciona una comodidad superior. Un diseño minimalista que combina con todo, ideal para el día a día o tus sesiones de ejercicio. Material 100% algodón preencogido. Disponible en S, M,' },
            { id: '3', name: 'Playera Oversize Negra (Ghosting)', price: 699.00, image: 'WhatsApp Image 2025-06-27 at 1.42.53 PM (3).jpeg', description: 'Destaca con nuestra playera oversize Ghosting negra. Su diseño audaz y contemporáneo te asegura ser el centro de atención. Hecha con una mezcla de algodón y poliéster para mayor durabilidad y comodidad. Estampados resistentes al lavado y al desgaste. Disponible en S, M,' },
            { id: '4', name: 'Playera Oversize Estampada', price: 699.00, image: 'WhatsApp Image 2025-06-27 at 1.42.53 PM.jpeg', description: 'Una playera oversize con un estampado único que refleja tu personalidad. Confeccionada para ofrecer un ajuste relajado y una sensación premium. Perfecta para combinar con jeans o joggers. El estampado es de alta definición y no se agrieta. Disponible en S, M,' },
            { id: '5', name: 'Playera Oversize Motivación Negra', price: 699.00, image: 'WhatsApp Image 2025-06-27 at 1.42.54 PM.jpeg', description: 'Inspírate con nuestra playera oversize de motivación. Un mensaje poderoso combinado con un estilo impecable. Ideal para quienes buscan un extra de energía en su día. Material resistente al encogimiento y a la decoloración. Disponible en S, M,' },
        ];

        const product = allProducts.find(p => p.id === productId);

        if (product) {
            document.getElementById('product-detail-title').textContent = product.name;
            document.getElementById('product-detail-price').textContent = `$${product.price.toFixed(2)}`;
            document.getElementById('product-detail-description').textContent = product.description;
            document.getElementById('main-product-image').src = product.image;
            document.getElementById('main-product-image').alt = product.name;

            // Update add to cart button data attributes
            const detailAddToCartBtn = document.getElementById('detail-add-to-cart-btn');
            detailAddToCartBtn.dataset.productId = product.id;
            detailAddToCartBtn.dataset.name = product.name;
            detailAddToCartBtn.dataset.price = product.price;
            detailAddToCartBtn.dataset.image = product.image;

            // Quantity selector
            const quantityInput = document.getElementById('quantity-input');
            const decreaseBtn = document.getElementById('decrease-quantity');
            const increaseBtn = document.getElementById('increase-quantity');

            decreaseBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityInput.value);
                if (currentQuantity > 1) {
                    quantityInput.value = currentQuantity - 1;
                }
            });

            increaseBtn.addEventListener('click', () => {
                let currentQuantity = parseInt(quantityInput.value);
                quantityInput.value = currentQuantity + 1;
            });

            // Add to cart from detail page
            detailAddToCartBtn.addEventListener('click', () => {
                const productToAdd = {
                    id: detailAddToCartBtn.dataset.productId,
                    name: detailAddToCartBtn.dataset.name,
                    price: parseFloat(detailAddToCartBtn.dataset.price),
                    image: detailAddToCartBtn.dataset.image,
                    quantity: parseInt(quantityInput.value)
                };
                addToCart(productToAdd);
            });

            // You can add logic for thumbnail images here if you have multiple images per product
            // For now, it just uses the main image as a placeholder.
        } else {
            // Handle product not found, e.g., redirect to 404 or show message
            alert('Producto no encontrado.');
            window.location.href = 'index.html'; // Redirect to home
        }
    }


    // ------------------------------------------
    // 5. Funcionalidad de la Página del Carrito (cart.html)
    //    Esto asume que tendrás un archivo cart.html separado.
    //    Este JS solo maneja la lógica para esa página.
    // ------------------------------------------
    if (window.location.pathname.includes('cart.html')) {
        const cartItemsContainer = document.getElementById('cart-items-container');
        const cartSubtotalSpan = document.getElementById('cart-subtotal');
        const cartTotalSpan = document.getElementById('cart-total'); // Assuming same as subtotal for simplicity
        const checkoutButton = document.getElementById('checkout-button');

        function renderCart() {
            cartItemsContainer.innerHTML = ''; // Clear previous items
            let subtotal = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
                if (checkoutButton) checkoutButton.disabled = true;
            } else {
                if (checkoutButton) checkoutButton.disabled = false;
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    subtotal += itemTotal;

                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.classList.add('cart-item');
                    cartItemDiv.innerHTML = `
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>Precio Unitario: $${item.price.toFixed(2)}</p>
                            <div class="cart-item-quantity">
                                Cantidad: <input type="number" value="${item.quantity}" min="1" data-item-id="${item.id}" class="cart-quantity-input">
                            </div>
                        </div>
                        <span class="cart-item-price">$${itemTotal.toFixed(2)}</span>
                        <button class="remove-from-cart-btn" data-item-id="${item.id}"><i class="fas fa-trash-alt"></i></button>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                });
            }

            if (cartSubtotalSpan) cartSubtotalSpan.textContent = subtotal.toFixed(2);
            if (cartTotalSpan) cartTotalSpan.textContent = subtotal.toFixed(2); // For now, total = subtotal

            addCartItemEventListeners();
        }

        function addCartItemEventListeners() {
            // Update quantity
            document.querySelectorAll('.cart-quantity-input').forEach(input => {
                input.addEventListener('change', (event) => {
                    const itemId = event.target.dataset.itemId;
                    let newQuantity = parseInt(event.target.value);
                    if (isNaN(newQuantity) || newQuantity < 1) {
                        newQuantity = 1; // Default to 1 if invalid
                        event.target.value = 1;
                    }
                    const itemIndex = cart.findIndex(item => item.id === itemId);
                    if (itemIndex > -1) {
                        cart[itemIndex].quantity = newQuantity;
                        saveCart();
                        renderCart(); // Re-render to update totals
                    }
                });
            });

            // Remove item
            document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const itemId = event.target.closest('.remove-from-cart-btn').dataset.itemId;
                    cart = cart.filter(item => item.id !== itemId);
                    saveCart();
                    renderCart(); // Re-render to update items
                });
            });
        }

        // Handle checkout button click (simple alert for demo)
        if (checkoutButton) {
            checkoutButton.addEventListener('click', () => {
                if (cart.length > 0) {
                    alert('Procediendo al pago. (Esta es una demostración, no se realizará un pago real)');
                    // In a real application, you would redirect to a checkout page/payment gateway
                    // window.location.href = 'checkout.html';
                } else {
                    alert('Tu carrito está vacío.');
                }
            });
        }

        renderCart(); // Initial render of the cart
    }
});