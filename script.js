 // Initialize Lucide icons
        lucide.createIcons();

        // Navigation
        function showSection(sectionId) {
            // Hide all sections
            document.querySelectorAll('section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(sectionId).classList.add('active');
            
            // Update nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            const navText = {
                'projects': 'Projects',
                'about': 'About',
                'contact': 'Contact'
            };
            
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.textContent === navText[sectionId]) {
                    link.classList.add('active');
                }
            });

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Mobile menu
        function toggleMobileMenu() {
            const mobileNav = document.getElementById('mobileNavLinks');
            mobileNav.style.display = mobileNav.style.display === 'flex' ? 'none' : 'flex';
        }

        function closeMobileMenu() {
            document.getElementById('mobileNavLinks').style.display = 'none';
        }

        // Scroll to projects
        function scrollToProjects() {
            document.getElementById('projectsGrid').scrollIntoView({ behavior: 'smooth' });
        }

        // Form submission
        function handleSubmit(event) {
            event.preventDefault();
            showToast('Message sent! I\'ll get back to you soon.', 'success');
            document.getElementById('contactForm').reset();
        }

        // Toast notification
        function showToast(message, type = 'success') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }

        // Close mobile menu on resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                document.getElementById('mobileNavLinks').style.display = 'none';
            }
        });
