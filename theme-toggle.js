const toggleBtn = document.getElementById('darkModeToggle');

function setTheme(theme) {
  if(theme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    toggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}

// Lấy theme đã lưu ở localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

toggleBtn.addEventListener('click', () => {
  if(document.body.classList.contains('dark-mode')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});
