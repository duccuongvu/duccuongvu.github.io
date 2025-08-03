document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById('darkModeToggle');

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      if (toggleBtn) toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      if (toggleBtn) toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark-mode');
      setTheme(isDark ? 'light' : 'dark');
    });
  }
});
