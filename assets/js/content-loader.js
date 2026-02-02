/**
 * Hakeem Labs - Content Loader
 * Fetches JSON data for static pages (About, Services, Contact) and populates the DOM.
 */

(function () {
    const LANG = document.documentElement.lang === 'ar' ? 'ar' : 'en';
    const JSON_PATH = '../../assets/json_data/';

    // --- Helpers ---
    async function fetchData(filename) {
        try {
            const response = await fetch(`${JSON_PATH}${filename}`);
            if (!response.ok) throw new Error(`Failed to load ${filename}`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    // --- Loaders ---

    // 1. About Page
    async function loadAbout() {
        const visionText = document.getElementById('vision-text');
        const missionText = document.getElementById('mission-text');
        const hakeemGrid = document.getElementById('hakeem-values-grid');

        if (!visionText && !missionText && !hakeemGrid) return;

        const data = await fetchData('about.json');
        if (!data) return;

        if (visionText) visionText.textContent = data.vision[LANG];
        if (missionText) missionText.textContent = data.mission[LANG];

        if (hakeemGrid) {
            hakeemGrid.innerHTML = data.hakeem_code.map(item => `
                <div class="feature-card">
                    <div class="feature-icon-wrapper" style="font-size: 2rem; font-weight: 900; color: var(--secondary);">${item.letter}</div>
                    <h3>${item.title[LANG]}</h3>
                    <p>${item.description[LANG]}</p>
                </div>
            `).join('');
        }
    }

    // 2. Services Page
    async function loadServices() {
        const specialtiesGrid = document.getElementById('specialties-grid');
        const profilesGrid = document.getElementById('profiles-grid');

        if (!specialtiesGrid && !profilesGrid) return;

        const data = await fetchData('services.json');
        if (!data) return;

        if (specialtiesGrid) {
            specialtiesGrid.innerHTML = data.laboratory_specialties.map(item => `
                <div class="feature-card">
                    <h3>${item.title[LANG]}</h3>
                    <p>${item.description[LANG]}</p>
                </div>
            `).join('');
        }

        if (profilesGrid) {
            // Check styling requirements from existing HTML
            // background: rgba(255,255,255,0.1); border: none; color: white;
            profilesGrid.innerHTML = data.medical_profiles.map(item => `
                <div class="feature-card" style="background: rgba(255,255,255,0.1); border: none; color: white;">
                    <h4>${item[LANG]}</h4>
                </div>
            `).join('');
        }
    }

    // 3. Contact Page
    async function loadContact() {
        // IDs: contact-phone, contact-email, contact-address, contact-hours
        const els = {
            phone: document.getElementById('contact-phone'),
            email: document.getElementById('contact-email'),
            address: document.getElementById('contact-address'),
            hours: document.getElementById('contact-hours')
        };

        if (!Object.values(els).some(el => el)) return;

        const data = await fetchData('contact.json');
        if (!data) return;

        if (els.phone) els.phone.textContent = data.phone; // Assuming no icons needed here, or handle icons in HTML
        if (els.email) els.email.textContent = data.email;
        if (els.address) els.address.textContent = data.address[LANG];
        // Hours in JSON contains HTML break or just text? In JSON it has "|" or breaks. 
        // Let's assume we replace the text content, or innerHTML if we want formatting.
        // The HTML currently has <br>. The JSON has "Sat–Thu... | Fri...".
        // Let's format it.
        if (els.hours) {
            els.hours.innerHTML = data.working_hours[LANG].replace(' | ', '<br>');
        }

        // Also update footer/contact sections if they have specific IDs, 
        // but typically footer is global. We might want a separate loadFooter() if it's dynamic everywhere.
    }

    // Run All
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            loadAbout();
            loadServices();
            loadContact();
        });
    } else {
        loadAbout();
        loadServices();
        loadContact();
    }

})();
