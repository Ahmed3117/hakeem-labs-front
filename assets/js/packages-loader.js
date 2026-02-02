/**
 * Al-Safwa Lab - Packages Loader
 * Premium Redesign: Dynamic styling, inheritance, and professional details page.
 */
(function() {
    const PACKAGES_DATA = {
        "packages": [
            {
                "code": "core",
                "name": { "ar": "الباقة الأساسية", "en": "Core Package" },
                "price": { "value": 119, "currency": "SAR" },
                "color": "#005bb5",
                "icon": "fa-shield-heart",
                "description": {
                    "ar": "الباقة المثالية للاطمئنان الدوري السريع على الوظائف الأساسية للجسم.",
                    "en": "The ideal package for regular quick checks on the body's basic functions."
                },
                "tests": [
                    "CBC", "Blood Sugar", "Cholesterol", "ALT", "AST", "Creatinine", "Urea", "Uric Acid", "Calcium", "Iron", "Total Protein", "Albumin", "Globulin", "A/G Ratio", "Bilirubin Total"
                ]
            },
            {
                "code": "standard",
                "name": { "ar": "باقة ستاندرد", "en": "Standard Package" },
                "price": { "value": 299, "currency": "SAR" },
                "color": "#00bfa5",
                "icon": "fa-flask-vial",
                "description": {
                    "ar": "فحص أكثر عمقاً يشمل الفيتامينات الأساسية ووظائف الغدة والدهون.",
                    "en": "A deeper screening covering essential vitamins, thyroid function, and lipids."
                },
                "extends": "core",
                "add_tests": [
                    "Triglycerides", "HDL", "LDL", "Vitamin D", "Vitamin B12", "TSH", "ALP", "GGT", "Sodium", "Potassium", "Chloride"
                ]
            },
            {
                "code": "gold_him",
                "name": { "ar": "الباقة الذهبية للرجال", "en": "Gold Package for Him" },
                "price": { "value": 499, "currency": "SAR" },
                "color": "#d4af37",
                "icon": "fa-mars",
                "gift": "50 SAR Voucher",
                "description": {
                    "ar": "باقة شاملة تركز على صحة الرجل، الهرمونات، ومؤشرات البروستاتا.",
                    "en": "A comprehensive package focusing on men's health, hormones, and prostate markers."
                },
                "extends": "standard",
                "add_tests": [
                    "Testosterone Total", "PSA Total", "PSA Free", "LH", "FSH", "Prolactin", "Magnesium", "Phosphorus", "CRP"
                ]
            },
            {
                "code": "gold_her",
                "name": { "ar": "الباقة الذهبية للسيدات", "en": "Gold Package for Her" },
                "price": { "value": 499, "currency": "SAR" },
                "color": "#e91e63",
                "icon": "fa-venus",
                "gift": "50 SAR Voucher",
                "description": {
                    "ar": "باقة متكاملة للعناية بصحة المرأة، توازن الهرمونات ومخزون الحديد.",
                    "en": "An integrated package for women's health, hormonal balance, and iron stores."
                },
                "extends": "standard",
                "add_tests": [
                    "Estrogen", "Progesterone", "FSH", "LH", "Prolactin", "TSH", "Ferritin", "CRP", "Magnesium"
                ]
            },
            {
                "code": "diamond_him",
                "name": { "ar": "الباقة الماسية للرجال", "en": "Diamond Package for Him" },
                "price": { "value": 599, "currency": "SAR" },
                "color": "#00bcd4",
                "icon": "fa-gem",
                "gift": "100 SAR Voucher",
                "description": {
                    "ar": "فحص ماسي دقيق يشمل هرمونات التوتر، السكر التراكمي والفيتامينات النادرة.",
                    "en": "Dimaond screening including stress hormones, HbA1c, and trace vitamins."
                },
                "extends": "gold_him",
                "add_tests": [
                    "HbA1c", "Urine Analysis", "Ferritin", "Vitamin A", "Vitamin E", "IgE", "Cortisol", "Insulin"
                ]
            },
            {
                "code": "diamond_her",
                "name": { "ar": "الباقة الماسية للسيدات", "en": "Diamond Package for Her" },
                "price": { "value": 599, "currency": "SAR" },
                "color": "#f06292",
                "icon": "fa-gem",
                "gift": "100 SAR Voucher",
                "description": {
                    "ar": "أقصى درجات العناية بتفاصيل صحة المرأة، من الهرمونات إلى صحة المناعة.",
                    "en": "The ultimate care for women's health details, from hormones to immune health."
                },
                "extends": "gold_her",
                "add_tests": [
                    "HbA1c", "Urine Analysis", "Ferritin", "Vitamin A", "Vitamin E", "IgE", "Cortisol", "Insulin"
                ]
            },
            {
                "code": "elite_him",
                "name": { "ar": "باقة النخبة للرجال", "en": "Elite Package for Him" },
                "price": { "value": 1699, "currency": "SAR" },
                "color": "#673ab7",
                "icon": "fa-crown",
                "gift": "150 SAR + Home Visit",
                "description": {
                    "ar": "خيار النخبة لفحص شامل جداً يشمل وظائف القلب المتقدمة والإنزيمات الهاضمة.",
                    "en": "Elite choice for a very comprehensive screen including advanced cardiac markers."
                },
                "extends": "diamond_him",
                "add_tests": [
                    "Troponin", "CK-MB", "LDH", "Homocysteine", "Amylase", "Lipase"
                ]
            },
            {
                "code": "elite_her",
                "name": { "ar": "باقة النخبة للسيدات", "en": "Elite Package for Her" },
                "price": { "value": 1699, "currency": "SAR" },
                "color": "#9c27b0",
                "icon": "fa-crown",
                "gift": "150 SAR + Home Visit",
                "description": {
                    "ar": "فحص ملكي للنخبة يغطي كافة جوانب الصحة الحيوية والوقائية للمرأة.",
                    "en": "Royal elite screening covering all aspects of vital and preventive health for women."
                },
                "extends": "diamond_her",
                "add_tests": [
                    "Troponin", "CK-MB", "LDH", "Homocysteine", "Amylase", "Lipase"
                ]
            },
            {
                "code": "royal_him",
                "name": { "ar": "الباقة الملكية للرجال", "en": "Royal Package for Him" },
                "price": { "value": 2828, "currency": "SAR" },
                "color": "#1a237e",
                "icon": "fa-diamond",
                "gift": "250 SAR + Home Visit",
                "description": {
                    "ar": "العمق الكامل للصحة: تشمل المسح الفيروسي الشامل وفحص الحساسية الغذائية.",
                    "en": "The full depth of health: including virus screening and food intolerance tests."
                },
                "extends": "elite_him",
                "add_tests": [
                    "Hepatitis B Surface Antigen", "Hepatitis C Antibody", "HIV", "Food Intolerance Test", "Celiac Panel", "Allergy Panel"
                ]
            },
            {
                "code": "royal_her",
                "name": { "ar": "الباقة الملكية للسيدات", "en": "Royal Package for Her" },
                "price": { "value": 2929, "currency": "SAR" },
                "color": "#121858",
                "icon": "fa-diamond",
                "gift": "250 SAR + Home Visit",
                "description": {
                    "ar": "القمة في الرعاية الوقائية: تغطية شاملة للفيروسات والمناعة وحساسية الطعام.",
                    "en": "The peak of preventive care: comprehensive coverage of viruses, immunity, and food allergy."
                },
                "extends": "elite_her",
                "add_tests": [
                    "Hepatitis B Surface Antigen", "Hepatitis C Antibody", "HIV", "Food Intolerance Test", "Celiac Panel", "Allergy Panel"
                ]
            }
        ]
    };

    // Helper functions
    const getTotalCount = (code) => {
        const pkg = PACKAGES_DATA.packages.find(p => p.code === code);
        if (!pkg) return 0;
        const currentCount = (pkg.tests || pkg.add_tests || []).length;
        if (pkg.extends) return currentCount + getTotalCount(pkg.extends);
        return currentCount;
    };

    const getParentName = (code, isEn) => {
        const pkg = PACKAGES_DATA.packages.find(p => p.code === code);
        if (!pkg || !pkg.extends) return null;
        const parent = PACKAGES_DATA.packages.find(p => p.code === pkg.extends);
        return parent ? (isEn ? parent.name.en : parent.name.ar) : null;
    };

    const resolveAllTests = (code) => {
        const pkg = PACKAGES_DATA.packages.find(p => p.code === code);
        if (!pkg) return [];
        let tests = [];
        if (pkg.extends) {
            tests = resolveAllTests(pkg.extends);
        }
        return [...tests, ...(pkg.tests || pkg.add_tests || [])];
    };

    const run = () => {
        const fullContainer = document.querySelector('.packages-grid-tiers');
        const homeContainer = document.querySelector('.packages-grid');
        const detailsContainer = document.getElementById('packageDetailsContainer');
        const isEn = document.documentElement.lang === 'en';

        // 1. Handle Details Page Redesign
        if (detailsContainer) {
            const params = new URLSearchParams(window.location.search);
            const code = params.get('code');
            const pkg = PACKAGES_DATA.packages.find(p => p.code === code);

            if (!pkg) {
                detailsContainer.innerHTML = `<div class="section-title"><h2>${isEn ? 'Package Not Found' : 'الباقة غير موجودة'}</h2></div>`;
                return;
            }

            const allTests = resolveAllTests(code);
            const name = isEn ? pkg.name.en : pkg.name.ar;
            const desc = isEn ? pkg.description.en : pkg.description.ar;
            document.documentElement.style.setProperty('--pkg-color', pkg.color);

            detailsContainer.innerHTML = `
                <!-- Immersive Hero Section -->
                <div class="package-hero-luxury" style="position: relative; overflow: hidden; background: ${pkg.color}; color: white; padding: 120px 5% 180px;">
                    <div class="hero-shapes" style="position: absolute; inset: 0; pointer-events: none;">
                        <div style="position: absolute; top: -10%; right: -5%; width: 500px; height: 500px; background: var(--pkg-color); opacity: 0.15; filter: blur(120px); border-radius: 50%;"></div>
                        <div style="position: absolute; bottom: -10%; left: -5%; width: 400px; height: 400px; background: var(--primary); opacity: 0.1; filter: blur(100px); border-radius: 50%;"></div>
                    </div>
                    
                    <div class="hero-content-wrapper reveal" style="max-width: 1200px; margin: 0 auto; position: relative; z-index: 2; display: flex; align-items: center; gap: 60px; flex-wrap: wrap;">
                        <div class="hero-text-side" style="flex: 1; min-width: 300px;">
                            <div class="category-pill" style="display: inline-flex; align-items: center; gap: 10px; background: rgba(255,255,255,0.08); padding: 8px 20px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 25px; color: var(--pkg-color); font-weight: 800; font-size: 0.9rem;">
                                <i class="fas ${pkg.icon}"></i> ${isEn ? 'Premium Diagnostic tier' : 'فئة تشخيصية مميزة'}
                            </div>
                            <h1 style="font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.1; margin-bottom: 20px; font-weight: 900;">${name}</h1>
                            <p style="font-size: 1.35rem; opacity: 0.8; max-width: 600px; line-height: 1.6; margin-bottom: 40px;">${desc}</p>
                            
                            <div class="hero-stats-row" style="display: flex; gap: 40px; margin-bottom: 40px;">
                                <div class="h-stat">
                                    <strong style="display: block; font-size: 2.5rem; color: var(--pkg-color);">${allTests.length}</strong>
                                    <span style="opacity: 0.6; font-size: 0.9rem; font-weight: 700;">${isEn ? 'TOTAL TESTS' : 'إجمالي الفحوصات'}</span>
                                </div>
                                <div class="h-stat">
                                    <strong style="display: block; font-size: 2.5rem; color: white;">~24h</strong>
                                    <span style="opacity: 0.6; font-size: 0.9rem; font-weight: 700;">${isEn ? 'AVG RESULTS' : 'متوسط النتائج'}</span>
                                </div>
                            </div>
                        </div>

                        <div class="hero-card-side" style="flex: 0 0 420px; min-width: 320px;">
                            <div class="price-action-glass" style="background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); padding: 50px; border-radius: 40px; box-shadow: 0 40px 100px rgba(0,0,0,0.5); text-align: center;">
                                <div style="font-size: 1rem; opacity: 0.6; margin-bottom: 10px; font-weight: 700;">${isEn ? 'PACKAGE PRICE' : 'سعر الباقة'}</div>
                                <div style="font-size: 4.5rem; font-weight: 900; margin-bottom: 10px;">${pkg.price.value}<span style="font-size: 1.2rem; opacity: 0.5; margin-inline-start: 10px;">${isEn ? pkg.price.currency : 'ريال'}</span></div>
                                ${pkg.gift ? `<div style="background: var(--pkg-color); color: white; padding: 10px 20px; border-radius: 12px; font-weight: 800; font-size: 0.9rem; margin-bottom: 30px; display: inline-block;"><i class="fas fa-gift"></i> ${pkg.gift}</div>` : ''}
                                <button class="btn btn-primary btn-lg full-width" style="background: var(--pkg-color); padding: 25px; font-size: 1.2rem; box-shadow: 0 20px 40px rgba(0,0,0,0.2);">${isEn ? 'Book Appointment' : 'احجز موعدك الآن'}</button>
                                <p style="margin-top: 20px; font-size: 0.85rem; opacity: 0.5;">${isEn ? '* Results with clinical correlation' : '* النتائج مع ربط إكلينيكي كامل'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content Area -->
                <div class="details-body-wrapper" style="max-width: 1200px; margin: -80px auto 100px; padding: 0 20px; position: relative; z-index: 10;">
                    <div style="display: grid; grid-template-columns: 1fr 380px; gap: 40px; align-items: start;">
                        
                        <!-- Left: Tests List -->
                        <div class="tests-list-section" style="background: white; border-radius: 32px; padding: 50px; box-shadow: var(--shadow-xl);">
                             <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
                                <h2 style="font-size: 2.2rem; color: var(--primary);">${isEn ? 'Full Test Directory' : 'دليل الفحوصات الكامل'}</h2>
                                <span style="background: var(--surface-alt); padding: 10px 20px; border-radius: 50px; font-weight: 800; color: var(--pkg-color);">${allTests.length} ${isEn ? 'Tests' : 'فحصاً'}</span>
                             </div>

                             <div class="tests-explorer-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
                                ${allTests.map((t, i) => `
                                    <div class="test-entry reveal" style="display: flex; align-items: center; gap: 15px; padding: 18px 25px; border-radius: 18px; border: 1px solid var(--border); transition: 0.3s; animation-delay: ${i * 0.05}s;">
                                        <div style="width: 10px; height: 10px; border-radius: 50%; background: var(--pkg-color); opacity: 0.6;"></div>
                                        <span style="font-weight: 600; font-size: 1.05rem; color: var(--text);">${t}</span>
                                    </div>
                                `).join('')}
                             </div>
                        </div>

                        <!-- Right: Info Panel -->
                        <div class="info-sidebar-panel" style="position: sticky; top: 120px;">
                            <div class="preparation-card" style="background: var(--primary-dark); color: white; padding: 40px; border-radius: 32px; margin-bottom: 30px; box-shadow: var(--shadow-lg);">
                                <i class="fas fa-info-circle fa-2x" style="color: var(--secondary); margin-bottom: 20px;"></i>
                                <h3 style="color: white; font-size: 1.5rem; margin-bottom: 15px;">${isEn ? 'Preparation' : 'تعليمات التحضير'}</h3>
                                <ul style="opacity: 0.85; font-size: 0.95rem;">
                                    <li style="margin-bottom: 12px;"><i class="fas fa-clock"></i> ${isEn ? '10-12 hours fasting required' : 'الصيام لمدة 10-12 ساعة'}</li>
                                    <li style="margin-bottom: 12px;"><i class="fas fa-water"></i> ${isEn ? 'Water is allowed' : 'شرب الماء مسموح'}</li>
                                    <li style="margin-bottom: 12px;"><i class="fas fa-capsules"></i> ${isEn ? 'Continue routine medications' : 'الاستمرار في الأدوية الروتينية'}</li>
                                </ul>
                            </div>

                            <div class="support-card-luxury" style="background: white; border: 1px solid var(--border); padding: 40px; border-radius: 32px; text-align: center;">
                                <div style="width: 70px; height: 70px; background: var(--secondary-light); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--secondary);">
                                    <i class="fas fa-headset fa-2x"></i>
                                </div>
                                <h3 style="margin-bottom: 10px;">${isEn ? 'Need help?' : 'تحتاج مساعدة؟'}</h3>
                                <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 25px;">${isEn ? 'Our specialists are ready to help you choose the right package.' : 'خبراؤنا جاهزون لمساعدتك في اختيار الباقة المناسبة.'}</p>
                                <a href="https://wa.me/966559160005" target="_blank" class="btn btn-outline full-width" style="border-color: var(--secondary); color: var(--secondary); font-weight: 800;">
                                    <i class="fab fa-whatsapp"></i> ${isEn ? 'Chat with us' : 'تحدث معنا الآن'}
                                </a>
                            </div>
                        </div>

                    </div>
                    
                    <!-- Bottom CTA -->
                    <div style="text-align: center; margin-top: 80px;">
                        <a href="${isEn ? 'packages-en.html' : 'packages.html'}" style="display: inline-flex; align-items: center; gap: 10px; font-weight: 800; color: var(--primary); text-decoration: none;">
                            <i class="fas fa-arrow-left"></i> ${isEn ? 'Explore All Other Packages' : 'استكشف كافة الباقات الأخرى'}
                        </a>
                    </div>
                </div>
            `;
            
            // Re-trigger reveal animations
            if (typeof window.triggerReveal === 'function') window.triggerReveal();
            return;
        }

        // 2. Handle Grid Views (Standard Packages List)
        if (fullContainer) {
            fullContainer.innerHTML = '';
            PACKAGES_DATA.packages.forEach((pkg, index) => {
                const card = document.createElement('div');
                card.className = 'package-card-tier reveal';
                
                const detailsPage = isEn ? 'package-details-en.html' : 'package-details.html';
                const detailsLink = `${detailsPage}?code=${pkg.code}`;
                card.style.setProperty('--pkg-color', pkg.color);

                const name = isEn ? pkg.name.en : pkg.name.ar;
                const price = pkg.price.value;
                const currency = isEn ? pkg.price.currency : 'ريال';
                const newTests = pkg.tests || pkg.add_tests || [];
                const parentName = getParentName(pkg.code, isEn);
                const totalTestsCount = getTotalCount(pkg.code);

                let featuresHtml = newTests.slice(0, 8).map(t => {
                    return `<li><i class="fas fa-check-circle" style="color: var(--pkg-color)"></i> ${t}</li>`;
                }).join('');

                if (newTests.length > 8) featuresHtml += `<li style="color: var(--pkg-color); font-weight: 800; font-size: 0.85rem;"><i class="fas fa-plus-circle"></i> ${isEn ? `+${newTests.length - 8} more unique tests` : `+${newTests.length - 8} فحصاً إضافياً`}</li>`;

                if (parentName) {
                    featuresHtml += `
                        <li style="border-top: 1px dashed var(--border); margin-top: 15px; padding-top: 15px; color: var(--text-muted); font-size: 0.85rem; font-style: italic;">
                            <i class="fas fa-layer-group" style="color: #cbd5e1;"></i>
                            ${isEn ? `Inherits all in ${parentName}` : `ترقية كاملة من ${parentName}`}
                        </li>
                    `;
                }

                card.innerHTML = `
                    <div class="tier-header" style="background: var(--surface-alt); border-top: 8px solid var(--pkg-color); border-bottom: none; padding: 45px 35px 30px;">
                        <div style="width: 60px; height: 60px; background: white; border-radius: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; box-shadow: var(--shadow-md); color: var(--pkg-color);">
                            <i class="fas ${pkg.icon} fa-2x"></i>
                        </div>
                        <h3 style="font-size: 1.6rem; margin-bottom: 20px;">${name}</h3>
                        <div class="price" style="font-size: 3.5rem; color: var(--pkg-color);">${price} <span style="font-size: 1rem; color: var(--text-muted); opacity: 0.6;">${currency}</span></div>
                        <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.03); padding: 5px 15px; border-radius: 50px; font-size: 0.8rem; font-weight: 800; margin-top: 15px;">
                             <span>${totalTestsCount} ${isEn ? 'TESTS' : 'فحصاً'}</span>
                        </div>
                    </div>
                    <div class="tier-body" style="padding: 10px 40px 30px;">
                        <ul class="tier-features" style="margin-bottom: 0;">${featuresHtml}</ul>
                    </div>
                    <div class="tier-footer" style="padding: 20px 40px 40px; display: flex; gap: 15px;">
                        <a href="${detailsLink}" class="btn btn-outline" style="flex: 1; min-width: 0; justify-content: center; font-size: 0.9rem; border-color: var(--pkg-color); color: var(--pkg-color);">${isEn ? 'Details' : 'التفاصيل'}</a>
                        <button class="btn btn-primary" style="flex: 1.5; min-width: 0; justify-content: center; font-size: 0.9rem; background: var(--pkg-color); border: none;">${isEn ? 'Book Now' : 'احجز الآن'}</button>
                    </div>
                `;
                fullContainer.appendChild(card);
            });
        }

        // 3. Home Page Selection Update
        if (homeContainer) {
            homeContainer.innerHTML = '';
            PACKAGES_DATA.packages.slice(0, 3).forEach((pkg) => {
                const card = document.createElement('div');
                card.className = 'package-card reveal';
                const detailsPage = isEn ? 'package-details-en.html' : 'package-details.html';
                const detailsLink = `${detailsPage}?code=${pkg.code}`;
                const totalTests = getTotalCount(pkg.code);
                const previewTests = (pkg.tests || pkg.add_tests || []).slice(0, 3);

                card.innerHTML = `
                    <div class="package-img" style="background: linear-gradient(135deg, ${pkg.color}, ${pkg.color}dd); height: 180px; display: flex; align-items: center; justify-content: center; color: white;">
                        <i class="fas ${pkg.icon} fa-5x" style="opacity: 0.8;"></i>
                    </div>
                    <div class="package-content" style="padding: 35px; min-height: 380px; display: flex; flex-direction: column;">
                        <h3 style="font-size: 1.5rem; margin-bottom: 15px;">${name}</h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6; flex-grow: 1;">${isEn ? pkg.description.en : pkg.description.ar}</p>
                        <ul class="package-features" style="margin: 25px 0;">
                            ${previewTests.map(t => `<li style="font-weight: 700; color: var(--text);"><i class="fas fa-check" style="color: ${pkg.color}"></i> ${t}</li>`).join('')}
                        </ul>
                        <div class="package-footer" style="border-top: 1px solid var(--border); padding-top: 25px;">
                            <div class="package-price" style="font-size: 2rem; font-weight: 900; color: ${pkg.color}">${pkg.price.value}<span style="font-size: 0.9rem; margin-inline-start: 10px;">${isEn ? 'SAR' : 'ريال'}</span></div>
                            <a href="${detailsLink}" class="btn btn-outline btn-sm" style="border-color: ${pkg.color}; color: ${pkg.color}">${isEn ? 'Details' : 'التفاصيل'}</a>
                        </div>
                    </div>
                `;
                homeContainer.appendChild(card);
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
