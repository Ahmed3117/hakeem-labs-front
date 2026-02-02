/**
 * Al-Safwa Lab - Individual Tests Loader
 * Handles fetching tests, search/filter, and cart functionality.
 * Enhanced with Modal Booking and UI fixes.
 */

(function () {
    // Embedded Data
    const TEST_DATA = {
        "categories": [
            {
                "id": "vitamins",
                "name": { "ar": "الفيتامينات والمعادن", "en": "Vitamins & Minerals" },
                "tests": [
                    { "code": "VITD", "name": { "ar": "فيتامين د", "en": "Vitamin D" }, "price": 99 },
                    { "code": "B12", "name": { "ar": "فيتامين ب12", "en": "Vitamin B12" }, "price": 80 },
                    { "code": "FERRITIN", "name": { "ar": "مخزون الحديد", "en": "Ferritin" }, "price": 60 },
                    { "code": "IRON", "name": { "ar": "الحديد", "en": "Iron" }, "price": 40 },
                    { "code": "CALCIUM", "name": { "ar": "الكالسيوم", "en": "Calcium" }, "price": 30 },
                    { "code": "MAGNESIUM", "name": { "ar": "المغنيسيوم", "en": "Magnesium" }, "price": 40 },
                    { "code": "ZINC", "name": { "ar": "الزنك", "en": "Zinc" }, "price": 70 },
                    { "code": "FOLIC", "name": { "ar": "حمض الفوليك", "en": "Folic Acid" }, "price": 80 }
                ]
            },
            {
                "id": "hematology",
                "name": { "ar": "أمراض الدم", "en": "Hematology" },
                "tests": [
                    { "code": "CBC", "name": { "ar": "صورة الدم الكاملة", "en": "CBC" }, "price": 50 },
                    { "code": "ESR", "name": { "ar": "سرعة الترسيب", "en": "ESR" }, "price": 30 },
                    { "code": "PT", "name": { "ar": "سيولة الدم PT", "en": "PT/INR" }, "price": 40 },
                    { "code": "PTT", "name": { "ar": "سيولة الدم PTT", "en": "PTT" }, "price": 40 },
                    { "code": "RETIC", "name": { "ar": "الخلايا الشبكية", "en": "Reticulocytes" }, "price": 40 },
                    { "code": "BLOODGROUP", "name": { "ar": "فصيلة الدم", "en": "Blood Group" }, "price": 30 }
                ]
            },
            {
                "id": "hormones",
                "name": { "ar": "الهرمونات والغدد", "en": "Hormones & Endocrinology" },
                "tests": [
                    { "code": "TSH", "name": { "ar": "هرمون الغدة الدرقية TSH", "en": "TSH" }, "price": 60 },
                    { "code": "FT3", "name": { "ar": "هرمون FT3", "en": "Free T3" }, "price": 60 },
                    { "code": "FT4", "name": { "ar": "هرمون FT4", "en": "Free T4" }, "price": 60 },
                    { "code": "INSULIN", "name": { "ar": "الأنسولين", "en": "Insulin" }, "price": 80 },
                    { "code": "CORTISOL", "name": { "ar": "الكورتيزول", "en": "Cortisol" }, "price": 70 },
                    { "code": "TESTO", "name": { "ar": "تستوستيرون", "en": "Testosterone" }, "price": 80 },
                    { "code": "PROLAC", "name": { "ar": "هرمون الحليب", "en": "Prolactin" }, "price": 70 },
                    { "code": "FSH", "name": { "ar": "هرمون FSH", "en": "FSH" }, "price": 70 },
                    { "code": "LH", "name": { "ar": "هرمون LH", "en": "LH" }, "price": 70 },
                    { "code": "AMH", "name": { "ar": "مخزون المبيض", "en": "AMH" }, "price": 250 },
                    { "code": "BHCG", "name": { "ar": "هرمون الحمل الرقمي", "en": "B-HCG (Digital)" }, "price": 90 }
                ]
            },
            {
                "id": "biochemistry",
                "name": { "ar": "الكيمياء الحيوية", "en": "Clinical Biochemistry" },
                "tests": [
                    { "code": "FBS", "name": { "ar": "سكر صائم", "en": "FBS (Fasting Sugar)" }, "price": 25 },
                    { "code": "HBA1C", "name": { "ar": "السكر التراكمي", "en": "HbA1c" }, "price": 60 },
                    { "code": "LIPID", "name": { "ar": "دهون الدم الكاملة", "en": "Lipid Profile" }, "price": 90 },
                    { "code": "CHOLESTEROL", "name": { "ar": "كوليسترول كلي", "en": "Cholesterol" }, "price": 30 },
                    { "code": "TRIG", "name": { "ar": "دهون ثلاثية", "en": "Triglycerides" }, "price": 30 },
                    { "code": "KIDNEY", "name": { "ar": "وظائف كلى كاملة", "en": "Kidney Function Profile" }, "price": 80 },
                    { "code": "CREAT", "name": { "ar": "كرياتينين", "en": "Creatinine" }, "price": 30 },
                    { "code": "UREA", "name": { "ar": "يوريا", "en": "Urea" }, "price": 30 },
                    { "code": "LIVER", "name": { "ar": "وظائف كبد كاملة", "en": "Liver Function Profile" }, "price": 90 },
                    { "code": "ALT", "name": { "ar": "إنزيم كبد ALT", "en": "ALT" }, "price": 30 },
                    { "code": "AST", "name": { "ar": "إنزيم كبد AST", "en": "AST" }, "price": 30 },
                    { "code": "URIC", "name": { "ar": "حمض اليوريك (النقرس)", "en": "Uric Acid" }, "price": 30 }
                ]
            },
            {
                "id": "tumor",
                "name": { "ar": "دلالات الأورام", "en": "Tumor Markers" },
                "tests": [
                    { "code": "PSA", "name": { "ar": "دلالات أورام البروستاتا", "en": "PSA Total" }, "price": 80 },
                    { "code": "CEA", "name": { "ar": "دلالات أورام القولون", "en": "CEA" }, "price": 90 },
                    { "code": "CA125", "name": { "ar": "دلالات أورام المبيض", "en": "CA 125" }, "price": 100 },
                    { "code": "CA153", "name": { "ar": "دلالات أورام الثدي", "en": "CA 15-3" }, "price": 100 },
                    { "code": "CA199", "name": { "ar": "دلالات أورام البنكرياس", "en": "CA 19-9" }, "price": 100 },
                    { "code": "AFP", "name": { "ar": "ألفا فيتو بروتين", "en": "AFP" }, "price": 90 }
                ]
            },
            {
                "id": "infection",
                "name": { "ar": "الأمراض المعدية", "en": "Infectious Diseases" },
                "tests": [
                    { "code": "HBSAG", "name": { "ar": "التهاب الكبد ب", "en": "HBsAg" }, "price": 60 },
                    { "code": "HCV", "name": { "ar": "التهاب الكبد سي", "en": "HCV Ab" }, "price": 70 },
                    { "code": "HIV", "name": { "ar": "ناقص المناعة HIV", "en": "HIV Combo" }, "price": 80 },
                    { "code": "HPYLORI_STOOL", "name": { "ar": "جرثومة المعدة (براز)", "en": "H. Pylori Ag (Stool)" }, "price": 70 },
                    { "code": "HPYLORI_BREATH", "name": { "ar": "جرثومة المعدة (نفس)", "en": "Urea Breath Test" }, "price": 250 }
                ]
            }
        ]
    };

    // State
    const categories = TEST_DATA.categories;
    const allTests = categories.flatMap(cat =>
        cat.tests.map(test => ({ ...test, categoryId: cat.id }))
    );
    let cart = new Set();
    let currentCategory = 'all';
    let searchQuery = '';

    const isEn = document.documentElement.lang === 'en';
    const currency = isEn ? 'SAR' : 'ريال';

    // DOM Elements
    let testsGrid, categoryFilters, searchInput, cartBar, cartCountEl, cartTotalEl, checkoutBtn;
    let testModal, closeTestModal, testBookingForm, summaryContainer;

    function init() {
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

        renderCategories();
        renderTests();
        setupEventListeners();
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
