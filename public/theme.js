const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function setTheme(dark) {
  if (dark) {
    document.body.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

if (savedTheme) {
  setTheme(savedTheme === 'dark');
} else {
  setTheme(prefersDark);
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTheme(!document.body.classList.contains('dark'));
  });
} 