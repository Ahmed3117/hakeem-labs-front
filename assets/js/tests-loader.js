/**
 * Al-Safwa Lab - Individual Tests Loader
 * Handles fetching tests, search/filter, and cart functionality.
 * Enhanced with Modal Booking and UI fixes.
 */

(function () {
    // State
    let categories = [];
    let allTests = [];
    let cart = new Set();
    let currentCategory = 'all';
    let searchQuery = '';

    const isEn = document.documentElement.lang === 'en';
    const currency = isEn ? 'SAR' : 'ريال';

    // DOM Elements
    let testsGrid, categoryFilters, searchInput, cartBar, cartCountEl, cartTotalEl, checkoutBtn;
    let testModal, closeTestModal, testBookingForm, summaryContainer;

    async function init() {
        testsGrid = document.getElementById('testsGrid');
        categoryFilters = document.getElementById('categoryFilters');
        searchInput = document.getElementById('searchInput');
        cartBar = document.getElementById('cartBar');
        cartCountEl = document.getElementById('cartCount');
        cartTotalEl = document.getElementById('cartTotal');
        checkoutBtn = document.getElementById('checkoutBtn');

        testModal = document.getElementById('testBookingModal');
        closeTestModal = document.getElementById('closeTestModal');
        testBookingForm = document.getElementById('testBookingForm');
        summaryContainer = document.getElementById('selectedTestsSummary');

        if (!testsGrid) return;

        try {
            const response = await fetch('../../assets/json_data/tests.json');
            if (!response.ok) throw new Error('Failed to load tests.json');
            const data = await response.json();

            categories = data.categories;
            allTests = categories.flatMap(cat =>
                cat.tests.map(test => ({ ...test, categoryId: cat.id }))
            );

            renderCategories();
            renderTests();
            setupEventListeners();
        } catch (error) {
            console.error('Error loading tests:', error);
            testsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--danger);">
                <i class="fas fa-exclamation-circle" style="font-size: 3rem; margin-bottom: 20px;"></i>
                <p>${isEn ? 'Failed to load tests. Please try again later.' : 'فشل تحميل الفحوصات. يرجى المحاولة لاحقاً.'}</p>
            </div>`;
        }
    }

    function renderCategories() {
        if (!categoryFilters) return;
        while (categoryFilters.children.length > 1) {
            categoryFilters.removeChild(categoryFilters.lastChild);
        }

        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'cat-btn';
            btn.dataset.cat = cat.id;
            btn.textContent = isEn ? cat.name.en : cat.name.ar;
            btn.onclick = () => filterByCategory(cat.id);
            categoryFilters.appendChild(btn);
        });
    }

    function renderTests() {
        if (!testsGrid) return;
        testsGrid.innerHTML = '';

        const term = searchQuery.toLowerCase().trim();

        const filtered = allTests.filter(test => {
            const matchCat = currentCategory === 'all' || test.categoryId === currentCategory;
            const arName = (test.name.ar || '').toLowerCase();
            const enName = (test.name.en || '').toLowerCase();
            const code = (test.code || '').toLowerCase();
            return matchCat && (term === '' || code.includes(term) || arName.includes(term) || enName.includes(term));
        });

        if (filtered.length === 0) {
            testsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--text-muted);"><i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.2;"></i><p>${isEn ? 'No tests found.' : 'لا توجد فحوصات مطابقة.'}</p></div>`;
            return;
        }

        filtered.forEach(test => {
            const isAdded = cart.has(test.code);
            const card = document.createElement('div');
            card.className = 'test-card active'; // Use 'active' class immediately to bypass reveal delay

            const name = isEn ? test.name.en : test.name.ar;
            card.innerHTML = `
                <div>
                    <h3 class="test-name">${name}</h3>
                    <span class="test-code">${test.code}</span>
                </div>
                <div class="test-footer">
                    <div class="test-price">${test.price} <small>${currency}</small></div>
                    <button class="add-btn ${isAdded ? 'added' : ''}" onclick="window.toggleCart('${test.code}', this)">
                        <i class="fas ${isAdded ? 'fa-check' : 'fa-plus'}"></i>
                    </button>
                </div>
            `;
            testsGrid.appendChild(card);
        });
    }

    function filterByCategory(catId) {
        currentCategory = catId;
        categoryFilters.querySelectorAll('.cat-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.cat === catId));
        renderTests();
    }

    window.toggleCart = function (code, btn) {
        if (cart.has(code)) {
            cart.delete(code);
            btn.classList.remove('added');
            btn.innerHTML = '<i class="fas fa-plus"></i>';
        } else {
            cart.add(code);
            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i>';
        }
        updateCartUI();
    };

    function updateCartUI() {
        if (!cartBar) return;
        const count = cart.size;
        if (count > 0) {
            cartBar.classList.add('visible');
            let total = 0;
            cart.forEach(code => {
                const t = allTests.find(x => x.code === code);
                if (t) total += t.price;
            });
            cartCountEl.textContent = count;
            cartTotalEl.textContent = `${total} ${currency}`;
            checkoutBtn.textContent = isEn ? `Continue with ${count} tests` : `متابعة الحجز (${count} فحوصات)`;
        } else {
            cartBar.classList.remove('visible');
        }
    }

    function setupEventListeners() {
        if (searchInput) {
            searchInput.oninput = (e) => { searchQuery = e.target.value; renderTests(); };
            searchInput.onfocus = () => searchInput.parentElement.style.borderColor = 'var(--primary)';
            searchInput.onblur = () => searchInput.parentElement.style.borderColor = 'var(--border)';
        }

        if (checkoutBtn) {
            checkoutBtn.onclick = () => {
                if (cart.size === 0) return;

                // Populate Summary
                summaryContainer.innerHTML = '';
                let total = 0;
                cart.forEach(code => {
                    const t = allTests.find(x => x.code === code);
                    if (t) {
                        const item = document.createElement('div');
                        item.style = "display: flex; justify-content: space-between; margin-bottom: 8px; font-weight: 500;";
                        item.innerHTML = `<span>${isEn ? t.name.en : t.name.ar}</span><span>${t.price} ${currency}</span>`;
                        summaryContainer.appendChild(item);
                        total += t.price;
                    }
                });

                const totalLine = document.createElement('div');
                totalLine.style = "margin-top: 15px; padding-top: 15px; border-top: 2px solid var(--border); display: flex; justify-content: space-between; font-weight: 900; color: var(--primary); font-size: 1.2rem;";
                totalLine.innerHTML = `<span>${isEn ? 'Total' : 'الإجمالي'}</span><span>${total} ${currency}</span>`;
                summaryContainer.appendChild(totalLine);

                // Show Modal
                testModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
        }

        if (closeTestModal) {
            closeTestModal.onclick = () => {
                testModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            };
        }

        if (testBookingForm) {
            testBookingForm.onsubmit = (e) => {
                e.preventDefault();
                const btn = testBookingForm.querySelector('button[type="submit"]');
                const originalText = btn.textContent;

                btn.disabled = true;
                btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${isEn ? 'Saving...' : 'جاري الحفظ...'}`;

                // Simulation of saving to database
                setTimeout(() => {
                    btn.style.background = 'var(--secondary-gradient)';
                    btn.innerHTML = `<i class="fas fa-check"></i> ${isEn ? 'Saved Successfully' : 'تم الحفظ بنجاح'}`;

                    setTimeout(() => {
                        testModal.classList.remove('active');
                        document.body.style.overflow = 'auto';
                        cart.clear();
                        updateCartUI();
                        renderTests();
                        testBookingForm.reset();
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 2000);
                }, 1500);
            };
        }

        const allBtn = categoryFilters.querySelector('[data-cat="all"]');
        if (allBtn) allBtn.onclick = () => filterByCategory('all');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
