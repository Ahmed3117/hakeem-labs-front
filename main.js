/** 
 * Al-Hakeem Medical Labs - Luxury Interactivity
 * High-performance scripts for premium medical experience
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Luxury State Management
    const header = document.getElementById('header');
    const updateHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateHeader);
    updateHeader(); // Initial check

    // 2. Scroll Reveal Animations (Intersection Observer)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing to save performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Targets for reveal
    // Targets for reveal (skip those with no-reveal class)
    const revealTargets = document.querySelectorAll('section:not(.no-reveal), .stat-item, .package-card, .feature-card, .floating-card, .reveal');
    revealTargets.forEach(target => {
        if (!target.classList.contains('reveal')) {
            target.classList.add('reveal');
        }
        revealObserver.observe(target);
    });

    // 3. Booking Modal Interface
    const ensureModalExists = () => {
        let modal = document.getElementById('bookingModal');
        if (!modal) {
            const isEn = document.documentElement.lang === 'en';
            modal = document.createElement('div');
            modal.id = 'bookingModal';
            modal.className = 'modal-overlay';
            modal.innerHTML = `
                <div class="modal-card">
                    <span class="close-modal" style="position: absolute; top: 40px; inset-inline-end: 40px; cursor: pointer; font-size: 2rem; color: var(--text-light);">
                        <i class="fas fa-times"></i>
                    </span>
                    <div class="section-title" style="text-align: start; margin-bottom: 40px;">
                        <span>${isEn ? 'Service Request' : 'طلب خدمة'}</span>
                        <h2 style="font-size: 2.5rem;">${isEn ? 'Book a Home Visit' : 'حجز زيارة منزلية'}</h2>
                        <p>${isEn ? 'Please fill in the details and our team will contact you immediately.' : 'يرجى تعبئة البيانات التالية وسيقوم فريقنا بالتواصل معكم فوراً.'}</p>
                    </div>
                    <form id="bookingForm" class="booking-form">
                        <div class="form-group full-width">
                            <label style="display: block; margin-bottom: 12px; font-weight: 800;">${isEn ? 'Full Name' : 'الاسم الكامل'}</label>
                            <input type="text" style="width: 100%; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--surface-alt); font-size: 1rem;" placeholder="${isEn ? 'Enter your name' : 'أدخل اسمك الكريم'}" required>
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 12px; font-weight: 800;">${isEn ? 'Phone Number' : 'رقم الجوال'}</label>
                            <input type="tel" style="width: 100%; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--surface-alt); font-size: 1rem;" placeholder="05xxxxxxxx" required>
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 12px; font-weight: 800;">${isEn ? 'City' : 'المدينة'}</label>
                            <select style="width: 100%; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--surface-alt); font-size: 1rem; appearance: none;">
                                <option>${isEn ? 'Madinah' : 'المدينة المنورة'}</option>
                                <option>${isEn ? 'Riyadh' : 'الرياض'}</option>
                                <option>${isEn ? 'Jeddah' : 'جدة'}</option>
                                <option>${isEn ? 'Dammam' : 'الدمام'}</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg full-width" style="padding: 25px;">${isEn ? 'Confirm Booking' : 'تأكيد طلب الزيارة'}</button>
                    </form>
                </div>
            `;
            document.body.appendChild(modal);
        }
        return modal;
    };

    const modal = ensureModalExists();
    const ensureCorporateModalExists = () => {
        let corpModal = document.getElementById('corporateModal');
        if (!corpModal) {
            const isEn = document.documentElement.lang === 'en';
            corpModal = document.createElement('div');
            corpModal.id = 'corporateModal';
            corpModal.className = 'modal-overlay';
            corpModal.innerHTML = `
                <div class="modal-card">
                    <span class="close-modal" style="position: absolute; top: 40px; inset-inline-end: 40px; cursor: pointer; font-size: 2rem; color: var(--text-light);">
                        <i class="fas fa-times"></i>
                    </span>
                    <div class="section-title" style="text-align: start; margin-bottom: 40px;">
                        <span>${isEn ? 'Corporate & Business' : 'قطاع الأعمال'}</span>
                        <h2 style="font-size: 2.5rem;">${isEn ? 'Partnership Request' : 'طلب شراكة أعمال'}</h2>
                        <p>${isEn ? 'Partner with Al-Hakeem for elite diagnostic services for your organization.' : 'كن شريكاً للحكيم واحصل على أفضل الخدمات التشخيصية لمنشأتك.'}</p>
                    </div>
                    <form id="corporateForm" class="booking-form">
                        <div class="form-group full-width">
                            <label style="display: block; margin-bottom: 12px; font-weight: 800;">${isEn ? 'Organization Name' : 'اسم المنشأة'}</label>
                            <input type="text" style="width: 100%; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--surface-alt); font-size: 1rem;" placeholder="${isEn ? 'Enter entity name' : 'اسم الشركة أو المؤسسة'}" required>
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 12px; font-weight: 800;">${isEn ? 'Contact Person' : 'اسم مسؤول التواصل'}</label>
                            <input type="text" style="width: 100%; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--surface-alt); font-size: 1rem;" required>
                        </div>
                        <div class="form-group">
                            <label style="display: block; margin-bottom: 12px; font-weight: 800;">${isEn ? 'Phone/Email' : 'الجوال أو البريد'}</label>
                            <input type="text" style="width: 100%; padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border); background: var(--surface-alt); font-size: 1rem;" required>
                        </div>
                        <button type="submit" class="btn btn-secondary btn-lg full-width" style="padding: 25px;">${isEn ? 'Submit Request' : 'إرسال الطلب'}</button>
                    </form>
                </div>
            `;
            document.body.appendChild(corpModal);
        }
        return corpModal;
    };

    const corpModal = ensureCorporateModalExists();

    // Auto-bind any button with specific keywords
    document.addEventListener('click', (e) => {
        // Close logic for ALL modals (Checked first)
        if (e.target.closest('.close-modal') || e.target.classList.contains('modal-overlay')) {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
            document.body.style.overflow = 'auto';
            return;
        }

        const btn = e.target.closest('.btn');
        const searchItem = e.target.closest('.search-item');

        // Skip if it's the specific tests checkout button or inside cart bar
        if (btn && (btn.id === 'checkoutBtn' || btn.closest('#cartBar'))) return;

        if (!btn && !searchItem) return;

        const text = btn ? btn.textContent : '';
        const isEn = document.documentElement.lang === 'en';

        // 1. Corporate / Partnership check
        if (text.includes('شراكة') || text.includes('Partnership')) {
            e.preventDefault();
            corpModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            return;
        }

        // 2. Contact check (Redirection)
        if (text.includes('تواصل') || text.includes('Contact')) {
            if (!e.target.closest('form')) {
                const targetPage = isEn ? 'contact-en.html' : 'contact.html';
                window.location.href = targetPage;
                return;
            }
        }

        // 3. Standard Booking check
        const keywords = ['حجز', 'زيارة', 'طلب', 'Book', 'Visit', 'Request'];
        const matchesKeyword = keywords.some(k => text.includes(k));

        if (matchesKeyword || searchItem) {
            if (!e.target.closest('form') || searchItem) {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    });

    // Dedicated Form submission handle for Corporate
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'corporateForm') {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const isEn = document.documentElement.lang === 'en';

            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${isEn ? 'Sending...' : 'جاري الإرسال...'}`;

            setTimeout(() => {
                btn.innerHTML = `<i class="fas fa-check"></i> ${isEn ? 'Request Received' : 'تم استلام الطلب'}`;
                btn.style.background = 'var(--secondary-gradient)';
                setTimeout(() => {
                    corpModal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    e.target.reset();
                    btn.innerHTML = isEn ? 'Submit Request' : 'إرسال الطلب';
                    btn.style.background = '';
                }, 2000);
            }, 1500);
        }
    });

    // Form submission handle
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const isEn = document.documentElement.lang === 'en';

            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${isEn ? 'Sending...' : 'جاري الإرسال...'}`;

            setTimeout(() => {
                btn.innerHTML = `<i class="fas fa-check"></i> ${isEn ? 'Submitted Successfully' : 'تم التقديم بنجاح'}`;
                btn.style.background = 'var(--secondary-gradient)';
                setTimeout(() => {
                    modal.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    bookingForm.reset();
                    btn.innerHTML = isEn ? 'Confirm Booking' : 'تأكيد طلب الزيارة';
                    btn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // Contact Form Handle
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const isEn = document.documentElement.lang === 'en';

            btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${isEn ? 'Sending...' : 'جاري الإرسال...'}`;

            setTimeout(() => {
                btn.innerHTML = `<i class="fas fa-check"></i> ${isEn ? 'Message Sent' : 'تم إرسال الرسالة'}`;
                btn.style.background = 'var(--secondary-gradient)';
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = isEn ? 'Send Message' : 'إرسال الرسالة';
                    btn.style.background = '';
                }, 2000);
            }, 1500);
        });
    }

    // 4. Branch Switcher Interactive logic
    const branches = document.querySelectorAll('.branch-item');
    branches.forEach(branch => {
        branch.addEventListener('click', () => {
            branches.forEach(b => b.classList.remove('active'));
            branch.classList.add('active');

            // Concepts: Smoothly update the map frame if coordinates were provided
            // For now, we just simulate the UI feedback
            const container = branch.closest('.branches-wrapper');
            if (container) {
                const map = container.querySelector('.map-container');
                if (map) {
                    map.classList.add('loading');
                    setTimeout(() => map.classList.remove('loading'), 600);
                }
            }
        });
    });

    // 5. Smart Search Micro-interactions
    const searchInput = document.getElementById('testSearch');
    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            searchInput.closest('.search-container').classList.add('focused');
        });
        searchInput.addEventListener('blur', () => {
            searchInput.closest('.search-container').classList.remove('focused');
        });

        // Mock search logic for demonstration
        searchInput.addEventListener('input', (e) => {
            const results = document.getElementById('searchResults');
            const isEn = document.documentElement.lang === 'en';

            if (results) {
                if (e.target.value.length > 2) {
                    results.classList.add('has-results');
                    if (isEn) {
                        results.innerHTML = `
                            <div class="search-item"><i class="fas fa-flask"></i> Vitamin D Test - <span>199 SAR</span></div>
                            <div class="search-item"><i class="fas fa-heart"></i> Cardiac Profile - <span>250 SAR</span></div>
                            <div class="search-item"><i class="fas fa-dna"></i> HbA1c Test - <span>80 SAR</span></div>
                        `;
                    } else {
                        results.innerHTML = `
                            <div class="search-item"><i class="fas fa-flask"></i> تحليل فيتامين د - <span>199 ريال</span></div>
                            <div class="search-item"><i class="fas fa-heart"></i> فحص وظائف القلب - <span>250 ريال</span></div>
                            <div class="search-item"><i class="fas fa-dna"></i> فحص السكر التراكمي - <span>80 ريال</span></div>
                        `;
                    }
                } else {
                    results.classList.remove('has-results');
                    results.innerHTML = '';
                }
            }
        });
    }

    // 6. Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 7. Mobile Menu Interaction
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.querySelector('.close-mobile-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }

        // Close menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 8. Scroll to Top/Bottom Logic (Safeguarded)
    const scrollTopBtn = document.getElementById('scrollToTop');
    const scrollBottomBtn = document.getElementById('scrollToBottom');

    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Hide "Bottom" button when reaching the footer
        if (scrollBottomBtn) {
            const scrollHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollPosition = window.scrollY + windowHeight;

            if (scrollPosition > scrollHeight - 100) {
                scrollBottomBtn.style.opacity = '0';
                scrollBottomBtn.style.pointerEvents = 'none';
            } else {
                scrollBottomBtn.style.opacity = '0.8';
                scrollBottomBtn.style.pointerEvents = 'auto';
            }
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    if (scrollBottomBtn) {
        scrollBottomBtn.addEventListener('click', () => {
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth'
            });
        });
    }

    // 9. Animated Counters for Stats
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounting = (counter) => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
            if (count < target) {
                count += inc;
                counter.innerText = (target % 1 === 0 ? Math.ceil(count) : count.toFixed(1)) +
                    (counter.getAttribute('data-target').includes('.') ? '%' : (target >= 1000 ? 'k' : ''));
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = (target >= 1000 ? (target / 1000).toFixed(1) + 'k' : target) +
                    (counter.getAttribute('data-target').includes('.') ? '%' : '');
            }
        };
        updateCount();
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // 10. Dynamic Package Loader (Embedded Data to support file:// protocol locally)
});
