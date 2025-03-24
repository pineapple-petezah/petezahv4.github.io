document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const elements = {
        tabs: document.querySelectorAll('.tab'),
        sections: document.querySelectorAll('.section'),
        legalTabs: document.querySelectorAll('.legal-tab'),
        legalSections: document.querySelectorAll('.legal-section'),
        beforeUnloadToggle: document.getElementById('beforeUnloadToggle'),
        autocloakToggle: document.getElementById('autocloakToggle'),
        blockHeadersToggle: document.getElementById('blockHeadersToggle'),
        disableRightClickToggle: document.getElementById('disableRightClickToggle'),
        sitePreset: document.getElementById('sitePreset'),
        siteTitle: document.getElementById('siteTitle'),
        siteLogo: document.getElementById('siteLogo'),
        backgroundColor: document.getElementById('backgroundColor'),
        panicKey: document.getElementById('panicKey'),
        panicUrl: document.getElementById('panicUrl'),
        saveSettings: document.getElementById('saveSettings'),
        saveAppearance: document.getElementById('saveAppearance'),
        savePanicSettings: document.getElementById('savePanicSettings'),
        resetSettings: document.getElementById('resetSettings'),
        openAboutBlank: document.getElementById('openAboutBlank'),
    };

    // Presets with matching favicons
    const presets = {
        classroom: {
            title: 'Google Classroom',
            favicon: 'https://ssl.gstatic.com/classroom/favicon.ico'
        },
        schoology: {
            title: 'Schoology',
            favicon: 'https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico'
        },
        google: {
            title: 'Google',
            favicon: 'https://www.google.com/favicon.ico'
        },
        petezah: {
            title: 'PeteZah',
            favicon: '/storage/images/logo-png-removebg-preview.png'
        }
    };

    // Utility Functions
    const applyGlobalSettings = () => {
        const savedTitle = localStorage.getItem('siteTitle');
        if (savedTitle) document.title = savedTitle;

        const savedLogo = localStorage.getItem('siteLogo');
        if (savedLogo) updateFavicon(savedLogo);

        const savedBackground = localStorage.getItem('backgroundColor');
        if (savedBackground) document.body.style.backgroundColor = savedBackground;

        // Apply anti-right click globally
        applyRightClickProtection();
        
        // Apply anti-close
        if (localStorage.getItem('beforeUnload') === 'true') {
            window.addEventListener('beforeunload', beforeUnloadHandler);
        } else {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
        }
    };

    const applyRightClickProtection = () => {
        // Always remove the handler first to avoid duplicate listeners
        document.removeEventListener('contextmenu', rightClickHandler);
        // Apply it if the setting is enabled
        if (localStorage.getItem('disableRightClick') === 'true') {
            document.addEventListener('contextmenu', rightClickHandler);
        }
    };

    const broadcastSettingsChange = () => {
        // Notify all tabs/windows to reload
        localStorage.setItem('settingsUpdated', Date.now().toString());
    };

    const loadSettings = () => {
        if (elements.beforeUnloadToggle) elements.beforeUnloadToggle.checked = localStorage.getItem('beforeUnload') === 'true';
        if (elements.autocloakToggle) elements.autocloakToggle.checked = localStorage.getItem('autocloak') === 'true';
        if (elements.blockHeadersToggle) elements.blockHeadersToggle.checked = localStorage.getItem('blockHeaders') === 'true';
        if (elements.disableRightClickToggle) elements.disableRightClickToggle.checked = localStorage.getItem('disableRightClick') === 'true';
        if (elements.siteTitle) elements.siteTitle.value = localStorage.getItem('siteTitle') || '';
        if (elements.panicKey) elements.panicKey.value = localStorage.getItem('panicKey') || '';
        if (elements.panicUrl) elements.panicUrl.value = localStorage.getItem('panicUrl') || 'https://classroom.google.com';
        if (elements.backgroundColor) {
            elements.backgroundColor.value = localStorage.getItem('backgroundColor') || '#0A1D37';
            document.body.style.backgroundColor = elements.backgroundColor.value;
        }
        applyGlobalSettings();
    };

    const updateFavicon = (url) => {
        let favicon = document.querySelector('link[rel="icon"]');
        if (!favicon) {
            favicon = document.createElement('link');
            favicon.rel = 'icon';
            document.head.appendChild(favicon);
        }
        favicon.href = url;
    };

    const handleTabSwitch = (tabs, sections, dataAttr) => {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute(dataAttr);
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(target).classList.add('active');
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            });
        });
    };

    const openAboutBlank = () => {
        const popup = window.open('about:blank', '_blank');
        if (!popup || popup.closed) {
            alert('Please allow popups for about:blank to work.');
            return;
        }

        popup.document.title = localStorage.getItem('siteTitle') || 'Home';
        const favicon = popup.document.createElement('link');
        favicon.rel = 'icon';
        favicon.href = localStorage.getItem('siteLogo') || '/storage/images/logo-png-removebg-preview.png';
        popup.document.head.appendChild(favicon);

        const iframe = popup.document.createElement('iframe');
        iframe.src = '/index.html';
        iframe.style.cssText = 'width: 100vw; height: 100vh; border: none;';
        popup.document.body.style.margin = '0';
        popup.document.body.appendChild(iframe);
    };

    const autocloak = () => {
        openAboutBlank();
        window.location.href = localStorage.getItem('panicUrl') || 'https://classroom.google.com';
    };

    // Event Handlers
    const beforeUnloadHandler = (e) => {
        e.preventDefault();
        e.returnValue = '';
    };

    const rightClickHandler = (e) => e.preventDefault();

    // Settings save handlers with broadcast
    if (elements.beforeUnloadToggle) {
        elements.beforeUnloadToggle.addEventListener('change', () => {
            localStorage.setItem('beforeUnload', elements.beforeUnloadToggle.checked);
            applyGlobalSettings();
            broadcastSettingsChange();
        });
    }

    if (elements.autocloakToggle) {
        elements.autocloakToggle.addEventListener('change', () => {
            localStorage.setItem('autocloak', elements.autocloakToggle.checked);
            if (elements.autocloakToggle.checked) autocloak();
            broadcastSettingsChange();
        });
    }

    if (elements.blockHeadersToggle) {
        elements.blockHeadersToggle.addEventListener('change', () => {
            localStorage.setItem('blockHeaders', elements.blockHeadersToggle.checked);
            broadcastSettingsChange();
        });
    }

    if (elements.disableRightClickToggle) {
        elements.disableRightClickToggle.addEventListener('change', () => {
            localStorage.setItem('disableRightClick', elements.disableRightClickToggle.checked);
            applyGlobalSettings();
            broadcastSettingsChange();
        });
    }

    if (elements.sitePreset) {
        elements.sitePreset.addEventListener('change', () => {
            const preset = elements.sitePreset.value;
            if (preset !== 'custom') {
                elements.siteTitle.value = presets[preset].title;
                localStorage.setItem('siteTitle', presets[preset].title);
                localStorage.setItem('siteLogo', presets[preset].favicon);
                applyGlobalSettings();
                broadcastSettingsChange();
            }
        });
    }

    if (elements.saveSettings) {
        elements.saveSettings.addEventListener('click', () => {
            if (elements.siteTitle.value) {
                localStorage.setItem('siteTitle', elements.siteTitle.value);
            }
            if (elements.siteLogo.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    localStorage.setItem('siteLogo', e.target.result);
                    applyGlobalSettings();
                    broadcastSettingsChange();
                };
                reader.readAsDataURL(elements.siteLogo.files[0]);
            } else {
                applyGlobalSettings();
                broadcastSettingsChange();
            }
        });
    }

    if (elements.saveAppearance) {
        elements.saveAppearance.addEventListener('click', () => {
            localStorage.setItem('backgroundColor', elements.backgroundColor.value);
            applyGlobalSettings();
            broadcastSettingsChange();
        });
    }

    if (elements.backgroundColor) {
        elements.backgroundColor.addEventListener('input', () => {
            document.body.style.backgroundColor = elements.backgroundColor.value;
        });
    }

    if (elements.savePanicSettings) {
        elements.savePanicSettings.addEventListener('click', () => {
            localStorage.setItem('panicKey', elements.panicKey.value);
            localStorage.setItem('panicUrl', elements.panicUrl.value);
            broadcastSettingsChange();
        });
    }

    if (elements.resetSettings) {
        elements.resetSettings.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings to default?')) {
                localStorage.clear();
                loadSettings();
                applyGlobalSettings();
                broadcastSettingsChange();
            }
        });
    }

    if (elements.openAboutBlank) {
        elements.openAboutBlank.addEventListener('click', openAboutBlank);
    }

    // Panic key handler (works globally)
    window.addEventListener('keydown', (e) => {
        const panicKey = localStorage.getItem('panicKey');
        const panicUrl = localStorage.getItem('panicUrl');
        if (panicKey && panicUrl && e.key === panicKey) {
            window.location.href = panicUrl;
        }
    });

    // Listen for settings changes from other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'settingsUpdated') {
            applyRightClickProtection(); // Ensure right-click protection updates dynamically
            location.reload();
        }
    });

    // Initialization
    loadSettings();
    handleTabSwitch(elements.tabs, elements.sections, 'data-tab');
    handleTabSwitch(elements.legalTabs, elements.legalSections, 'data-legal');

    const inIframe = window !== window.top;
    if (!inIframe && elements.autocloakToggle && elements.autocloakToggle.checked && !navigator.userAgent.includes('Firefox')) {
        autocloak();
    }

    // Ensure anti-right click is applied on page load for all pages
    applyRightClickProtection();
});
