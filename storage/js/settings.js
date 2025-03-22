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
                    favicon: 'https://www.schoology.com/sites/all/themes/schoology_theme/favicon.ico'
                },
                google: {
                    title: 'Google',
                    favicon: 'https://www.google.com/favicon.ico'
                }
            };

            // Utility Functions
            const loadSettings = () => {
                elements.beforeUnloadToggle.checked = localStorage.getItem('beforeUnload') === 'true';
                elements.autocloakToggle.checked = localStorage.getItem('autocloak') === 'true';
                elements.blockHeadersToggle.checked = localStorage.getItem('blockHeaders') === 'true';
                elements.disableRightClickToggle.checked = localStorage.getItem('disableRightClick') === 'true';
                elements.siteTitle.value = localStorage.getItem('siteTitle') || '';
                elements.panicKey.value = localStorage.getItem('panicKey') || '';
                elements.panicUrl.value = localStorage.getItem('panicUrl') || 'https://classroom.google.com';
                elements.backgroundColor.value = localStorage.getItem('backgroundColor') || '#0A1D37';
                document.body.style.backgroundColor = elements.backgroundColor.value;
                document.title = localStorage.getItem('siteTitle') || 'PeteZah | Settings';

                const savedLogo = localStorage.getItem('siteLogo');
                if (savedLogo) updateFavicon(savedLogo);
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
                window.location.href = elements.panicUrl.value;
            };

            // Event Handlers
            const beforeUnloadHandler = (e) => {
                e.preventDefault();
                e.returnValue = '';
            };

            const rightClickHandler = (e) => e.preventDefault();

            elements.beforeUnloadToggle.addEventListener('change', () => {
                localStorage.setItem('beforeUnload', elements.beforeUnloadToggle.checked);
                if (elements.beforeUnloadToggle.checked) {
                    window.addEventListener('beforeunload', beforeUnloadHandler);
                } else {
                    window.removeEventListener('beforeunload', beforeUnloadHandler);
                }
            });

            elements.autocloakToggle.addEventListener('change', () => {
                localStorage.setItem('autocloak', elements.autocloakToggle.checked);
                if (elements.autocloakToggle.checked) autocloak();
            });

            elements.blockHeadersToggle.addEventListener('change', () => {
                localStorage.setItem('blockHeaders', elements.blockHeadersToggle.checked);
            });

            elements.disableRightClickToggle.addEventListener('change', () => {
                localStorage.setItem('disableRightClick', elements.disableRightClickToggle.checked);
                if (elements.disableRightClickToggle.checked) {
                    document.addEventListener('contextmenu', rightClickHandler);
                } else {
                    document.removeEventListener('contextmenu', rightClickHandler);
                }
            });

            elements.sitePreset.addEventListener('change', () => {
                const preset = elements.sitePreset.value;
                if (preset !== 'custom') {
                    elements.siteTitle.value = presets[preset].title;
                    localStorage.setItem('siteTitle', presets[preset].title);
                    localStorage.setItem('siteLogo', presets[preset].favicon);
                    document.title = presets[preset].title;
                    updateFavicon(presets[preset].favicon);
                }
            });

            elements.saveSettings.addEventListener('click', () => {
                if (elements.siteTitle.value) {
                    localStorage.setItem('siteTitle', elements.siteTitle.value);
                    document.title = elements.siteTitle.value;
                }
                if (elements.siteLogo.files[0]) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        localStorage.setItem('siteLogo', e.target.result);
                        updateFavicon(e.target.result);
                    };
                    reader.readAsDataURL(elements.siteLogo.files[0]);
                }
            });

            elements.saveAppearance.addEventListener('click', () => {
                localStorage.setItem('backgroundColor', elements.backgroundColor.value);
                document.body.style.backgroundColor = elements.backgroundColor.value;
            });

            elements.backgroundColor.addEventListener('input', () => {
                document.body.style.backgroundColor = elements.backgroundColor.value;
            });

            elements.savePanicSettings.addEventListener('click', () => {
                localStorage.setItem('panicKey', elements.panicKey.value);
                localStorage.setItem('panicUrl', elements.panicUrl.value);
            });

            elements.resetSettings.addEventListener('click', () => {
                if (confirm('Are you sure you want to reset all settings to default?')) {
                    localStorage.clear();
                    elements.beforeUnloadToggle.checked = false;
                    elements.autocloakToggle.checked = false;
                    elements.blockHeadersToggle.checked = false;
                    elements.disableRightClickToggle.checked = false;
                    elements.sitePreset.value = 'custom';
                    elements.siteTitle.value = '';
                    elements.panicKey.value = '';
                    elements.panicUrl.value = 'https://classroom.google.com';
                    elements.backgroundColor.value = '#0A1D37';
                    document.body.style.backgroundColor = '#0A1D37';
                    updateFavicon('/storage/images/logo-png-removebg-preview.png');
                    document.title = 'PeteZah | Settings';
                    window.removeEventListener('beforeunload', beforeUnloadHandler);
                    document.removeEventListener('contextmenu', rightClickHandler);
                }
            });

            elements.openAboutBlank.addEventListener('click', openAboutBlank);

            window.addEventListener('keydown', (e) => {
                const panicKey = localStorage.getItem('panicKey');
                const panicUrl = localStorage.getItem('panicUrl');
                if (panicKey && panicUrl && e.key === panicKey) {
                    window.location.href = panicUrl;
                }
            });

            // Initialization
            loadSettings();
            handleTabSwitch(elements.tabs, elements.sections, 'data-tab');
            handleTabSwitch(elements.legalTabs, elements.legalSections, 'data-legal');

            if (elements.beforeUnloadToggle.checked) window.addEventListener('beforeunload', beforeUnloadHandler);
            if (elements.disableRightClickToggle.checked) document.addEventListener('contextmenu', rightClickHandler);

            const inIframe = window !== window.top;
            if (!inIframe && elements.autocloakToggle.checked && !navigator.userAgent.includes('Firefox')) {
                autocloak();
            }
        });
