const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check if user has a preference stored
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-theme');
  themeToggle.textContent = '🌙';  // Set to moon emoji for light theme
}

themeToggle.addEventListener('click', function () {
  body.classList.toggle('light-theme');
  
  if (body.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌙';  // Change to moon emoji for light theme
  } else {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '🌞';  // Change to sun emoji for dark theme
  }
});

document.querySelectorAll('.header-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    const headerOffset = document.querySelector('header').offsetHeight;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollBy({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update the URL hash manually
    window.history.pushState(null, null, `#${targetId}`);
  });
});

// Function to update the active link based on the current section in view
const sections = document.querySelectorAll('section');
const options = {
  root: null,
  rootMargin: `-${document.querySelector('header').offsetHeight}px 0px 0px 0px`,
  threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      window.history.pushState(null, null, `#${id}`);
      document.querySelectorAll('.header-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === id) {
          link.classList.add('active');
        }
      });
    }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

// Toggle the visibility of header links when the menu icon is clicked
const menuIcon = document.querySelector('.menu-icon');
const headerLinks = document.querySelector('.header-links');

menuIcon.addEventListener('click', () => {
  headerLinks.style.display = headerLinks.style.display === 'block' ? 'none' : 'block';
});