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
