// Catastrophy Bulletproof Theme Switcher & System Theme Detection
(function () {
  function getPreferredTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateIcons();
  }

  function updateIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const darkIcon = document.getElementById('theme-toggle-dark-icon');
    const lightIcon = document.getElementById('theme-toggle-light-icon');

    if (darkIcon && lightIcon) {
      if (isDark) {
        darkIcon.classList.add('hidden');
        lightIcon.classList.remove('hidden');
      } else {
        lightIcon.classList.add('hidden');
        darkIcon.classList.remove('hidden');
      }
    }
  }

  function bindToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    
    // Bind click event
    btn.onclick = function (e) {
      if (e) e.preventDefault();
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    };

    updateIcons();
  }

  // Initial apply
  applyTheme(getPreferredTheme());

  // Listen for DOM ready to bind button
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindToggle);
  } else {
    bindToggle();
  }

  // Auto respond to device OS theme changes if user hasn't chosen a fixed preference
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Expose globally
  window.catastrophyToggleTheme = function () {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };
})();
