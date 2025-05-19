document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('theme-toggle');
  
  // Initialize theme
  function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateButtonText(savedTheme);
    updateFavicon(savedTheme);
  }
  
  // Toggle theme
  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateButtonText(newTheme);
    updateFavicon(newTheme);
  });
  
  // Update button text
  function updateButtonText(theme) {
    const icon = theme === 'dark' ? '☀️' : '🌙';
    toggleButton.innerHTML = `${icon} ${theme === 'dark' ? 'Light' : 'Dark'} Mode`;
    
    // Add animation class
    toggleButton.classList.add('animate-toggle');
    setTimeout(() => {
      toggleButton.classList.remove('animate-toggle');
    }, 300);
  }
  
  // Update favicon (optional)
  function updateFavicon(theme) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = theme === 'dark' ? 'favicon-dark.ico' : 'favicon-light.ico';
    document.head.appendChild(link);
  }
  
  // Watch for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      updateButtonText(newTheme);
      updateFavicon(newTheme);
    }
  });
  
  // Initialize
  initializeTheme();
});