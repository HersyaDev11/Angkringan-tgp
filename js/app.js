// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 z-40 bg-background-light dark:bg-background-dark transform transition-transform duration-300 translate-x-full md:hidden flex flex-col items-center justify-center space-y-8';

    // Check current theme for initial icon
    const isDark = document.documentElement.classList.contains('dark');
    const themeIcon = isDark ? 'light_mode' : 'dark_mode';
    const themeText = isDark ? 'Mode Terang' : 'Mode Gelap';

    mobileMenu.innerHTML = `
        <button class="absolute top-6 right-6 text-gray-600 dark:text-gray-300 hover:text-primary">
            <span class="material-icons text-3xl">close</span>
        </button>
        <a href="#" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Beranda</a>
        <a href="#menu" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Menu</a>
        <a href="#locations" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Lokasi</a>
        <a href="#about" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Tentang Kami</a>
        <button class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary qris-mobile-btn">QRIS</button>
        <button onclick="toggleTheme()" class="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">
            <span class="material-icons theme-icon-mobile">${themeIcon}</span>
            <span class="theme-text-mobile">${themeText}</span>
        </button>
    `;
    document.body.appendChild(mobileMenu);

    const closeBtn = mobileMenu.querySelector('button');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden');
    }

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMenu);
    }
    closeBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Handle Mobile QRIS Button
    const qrisMobileBtn = mobileMenu.querySelector('.qris-mobile-btn');
    if (qrisMobileBtn) {
        qrisMobileBtn.addEventListener('click', () => {
            toggleMenu(); // Close the menu
            openQrisModal(); // Open the modal
        });
    }

    // Initialize Cart
    updateCartUI();

    // Initialize Theme Icons
    updateThemeIcons();
});

// Theme Toggle Function (Global Scope)
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
    updateThemeIcons();
}

function updateThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');

    // Update Desktop Icon
    const desktopIcon = document.querySelector('.theme-icon');
    if (desktopIcon) {
        desktopIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
    }

    // Update Mobile Icon & Text
    const mobileIcon = document.querySelector('.theme-icon-mobile');
    const mobileText = document.querySelector('.theme-text-mobile');

    if (mobileIcon) mobileIcon.innerText = isDark ? 'light_mode' : 'dark_mode';
    if (mobileText) mobileText.innerText = isDark ? 'Mode Terang' : 'Mode Gelap';
}

// QRIS Modal Functions (Global Scope)
function openQrisModal() {
    const modal = document.getElementById('qrisModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeQrisModal() {
    const modal = document.getElementById('qrisModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// Close modal on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeQrisModal();
        // Also close cart if open
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar && !cartSidebar.classList.contains('translate-x-full')) {
            toggleCart();
        }
    }
});


/* =========================================
   🛒 SHOPPING CART LOGIC
   ========================================= */

let cart = [];

function addToCart(name, price) {
    // Check if item already exists
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    // Show feedback (optional toast could be added here)
    updateCartUI();

    // Auto open cart if it's the first item
    if (cart.length === 1 && cart[0].quantity === 1) {
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar.classList.contains('translate-x-full')) {
            toggleCart();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        removeFromCart(index);
    }
    updateCartUI();
}

function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('cart-overlay');

    if (sidebar.classList.contains('translate-x-full')) {
        // Open
        sidebar.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    } else {
        // Close
        sidebar.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElement = document.getElementById('cart-count');
    const floatBtn = document.getElementById('cart-float-btn');

    // Update Count Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.innerText = totalItems;

    // Show/Hide Floating Button
    if (totalItems > 0) {
        floatBtn.classList.remove('hidden');
    } else {
        floatBtn.classList.add('hidden');
    }

    // Render Items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 mt-10">
                <span class="material-icons text-6xl mb-4 opacity-20">remove_shopping_cart</span>
                <p>Keranjang masih kosong</p>
                <button onclick="toggleCart()" class="text-primary font-bold mt-2 hover:underline">Mulai Pesan</button>
            </div>
        `;
        cartTotalElement.innerText = 'Rp 0';
        return;
    }

    let html = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        html += `
            <div class="flex items-center justify-between bg-gray-50 dark:bg-white/5 p-3 rounded-xl">
                <div class="flex-1">
                    <h4 class="font-bold text-gray-900 dark:text-white text-sm">${item.name}</h4>
                    <p class="text-xs text-primary font-bold">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
                <div class="flex items-center gap-3 bg-white dark:bg-black/20 rounded-lg p-1">
                    <button onclick="updateQuantity(${index}, -1)" class="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors">
                        <span class="material-icons text-sm">remove</span>
                    </button>
                    <span class="text-sm font-bold text-gray-900 dark:text-white w-4 text-center">${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)" class="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-green-500 transition-colors">
                        <span class="material-icons text-sm">add</span>
                    </button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;
    cartTotalElement.innerText = 'Rp ' + totalPrice.toLocaleString('id-ID');
}

function checkoutWhatsApp() {
    if (cart.length === 0) return;

    const phoneNumber = "6282295925757"; // Format: 628xxx
    let message = "Halo Angkringan TGP, saya mau pesan:\n\n";
    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        message += `- ${item.name} (${item.quantity}x) : Rp ${itemTotal.toLocaleString('id-ID')}\n`;
    });

    message += `\n*Total: Rp ${totalPrice.toLocaleString('id-ID')}*`;
    message += `\n\nMohon diproses ya, terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(waUrl, '_blank');
}
