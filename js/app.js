// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.md\\:hidden button');

    // Create mobile menu dynamically if it doesn't exist (or just use this logic)
    // The previous code created it dynamically, let's keep that pattern or ensure it works with existing HTML
    // Based on previous file content, it creates it.

    // However, to avoid duplicating logic if the file is re-written, let's stick to the previous content style
    // BUT, the previous content in Step 150 showing it creating the menu. 
    // I will rewrite the file to include both the Mobile Menu logic AND the QRIS logic cleanly.

    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'fixed inset-0 z-40 bg-background-light dark:bg-background-dark transform transition-transform duration-300 translate-x-full md:hidden flex flex-col items-center justify-center space-y-8';
    mobileMenu.innerHTML = `
        <button class="absolute top-6 right-6 text-gray-600 dark:text-gray-300 hover:text-primary">
            <span class="material-icons text-3xl">close</span>
        </button>
        <a href="#" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Beranda</a>
        <a href="#menu" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Menu</a>
        <a href="#locations" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Lokasi</a>
        <a href="#about" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary">Tentang Kami</a>
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
});

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
    }
});
