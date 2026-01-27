/* =========================================
   Dark Mode Toggle
   ========================================= */
   const themeToggleBtn = document.getElementById('theme-toggle');
   const themeIcon = themeToggleBtn.querySelector('i');
   
   // Check for saved user preference
   const savedTheme = localStorage.getItem('theme');
   if (savedTheme) {
       document.documentElement.setAttribute('data-theme', savedTheme);
       updateIcon(savedTheme);
   }
   
   themeToggleBtn.addEventListener('click', () => {
       const currentTheme = document.documentElement.getAttribute('data-theme');
       const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
       
       document.documentElement.setAttribute('data-theme', newTheme);
       localStorage.setItem('theme', newTheme);
       updateIcon(newTheme);
   });
   
   function updateIcon(theme) {
       if (theme === 'dark') {
           themeIcon.classList.remove('fa-moon');
           themeIcon.classList.add('fa-sun');
       } else {
           themeIcon.classList.remove('fa-sun');
           themeIcon.classList.add('fa-moon');
       }
   }
   
   /* =========================================
      Mobile Menu
      ========================================= */
   const mobileMenuBtn = document.getElementById('mobile-menu');
   const navList = document.querySelector('.nav-list');
   const navLinks = document.querySelectorAll('.nav-link');
   
   mobileMenuBtn.addEventListener('click', () => {
       navList.classList.toggle('open');
       mobileMenuBtn.classList.toggle('active');
   });
   
   // Close menu when clicking a link
   navLinks.forEach(link => {
       link.addEventListener('click', () => {
           navList.classList.remove('open');
           mobileMenuBtn.classList.remove('active');
       });
   });
   
   /* =========================================
      Scroll Reveal Animation
      ========================================= */
   const revealElements = document.querySelectorAll('.reveal');
   
   const revealObserver = new IntersectionObserver((entries, observer) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('active');
               // Optional: Stop observing once revealed
               // observer.unobserve(entry.target);
           }
       });
   }, {
       root: null,
       threshold: 0.15, // Trigger when 15% visible
   });
   
   revealElements.forEach(el => revealObserver.observe(el));
   
   /* =========================================
      Active Navigation Link (Scroll Spy)
      ========================================= */
   const sections = document.querySelectorAll('section');
   
   window.addEventListener('scroll', () => {
       let current = '';
       const scrollY = window.scrollY;
       const headerHeight = document.getElementById('header').offsetHeight;
   
       sections.forEach(section => {
           const sectionTop = section.offsetTop - headerHeight - 100; // Offset for better timing
           const sectionHeight = section.offsetHeight;
           
           if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
               current = section.getAttribute('id');
           }
       });
   
       navLinks.forEach(link => {
           link.classList.remove('active');
           if (link.getAttribute('href').includes(current)) {
               link.classList.add('active');
           }
       });
   
       // Show/Hide Scroll to Top Button
       const scrollTopBtn = document.getElementById('scroll-top');
       if (scrollY > 500) {
           scrollTopBtn.style.display = 'flex';
       } else {
           scrollTopBtn.style.display = 'none';
       }
   });
   
   /* =========================================
      Scroll to Top
      ========================================= */
   document.getElementById('scroll-top').addEventListener('click', () => {
       window.scrollTo({
           top: 0,
           behavior: 'smooth'
       });
   });
   
   /* =========================================
      Form Validation
      ========================================= */
   const contactForm = document.getElementById('contact-form');
   
   contactForm.addEventListener('submit', (e) => {
       e.preventDefault();
       
       const name = document.getElementById('name').value.trim();
       const email = document.getElementById('email').value.trim();
       const message = document.getElementById('message').value.trim();
       
       if (name && email && message) {
           // Simulate form submission
           const btn = contactForm.querySelector('button');
           const originalText = btn.innerHTML;
           
           btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
           btn.disabled = true;
           
           setTimeout(() => {
               btn.innerHTML = 'Message Sent! <i class="fas fa-check"></i>';
               btn.style.backgroundColor = 'var(--secondary-color)';
               btn.style.borderColor = 'var(--secondary-color)';
               contactForm.reset();
               
               setTimeout(() => {
                   btn.innerHTML = originalText;
                   btn.disabled = false;
                   btn.style.backgroundColor = ''; // Reset to default
                   btn.style.borderColor = '';
               }, 3000);
           }, 1500);
       }
   });
